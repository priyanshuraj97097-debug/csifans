import { useEffect, useRef } from "react";
import { LANGUAGE_NAMES, useLanguage, type Lang } from "@/lib/i18n";

/**
 * Whole-site translation layer.
 *
 * Walks the rendered DOM, sends unseen English strings to the server-side
 * translation endpoint and swaps the text in place. Purely presentational:
 * no markup, layout, styling or component logic is changed.
 */

const SKIP_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "CODE",
  "PRE",
  "TEXTAREA",
  "SVG",
  "PATH",
]);

const originals = new WeakMap<Text, string>();
const memory: Partial<Record<Lang, Record<string, string>>> = {};

function cacheKey(lang: Lang) {
  return `csi-translations-${lang}`;
}

function loadCache(lang: Lang): Record<string, string> {
  if (memory[lang]) return memory[lang]!;
  let stored: Record<string, string> = {};
  try {
    const raw = window.localStorage.getItem(cacheKey(lang));
    if (raw) stored = JSON.parse(raw) as Record<string, string>;
  } catch {
    stored = {};
  }
  memory[lang] = stored;
  return stored;
}

function saveCache(lang: Lang) {
  try {
    window.localStorage.setItem(cacheKey(lang), JSON.stringify(memory[lang] ?? {}));
  } catch {
    // storage full / unavailable — in-memory cache still works
  }
}

function translatable(value: string) {
  const trimmed = value.trim();
  if (trimmed.length < 2) return false;
  return /\p{L}{2,}/u.test(trimmed);
}

function collectTextNodes(root: Node): Text[] {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = (node as Text).parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (parent.closest("[data-no-translate]")) return NodeFilter.FILTER_REJECT;
      const original = originals.get(node as Text) ?? node.nodeValue ?? "";
      return translatable(original) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  let current = walker.nextNode();
  while (current) {
    nodes.push(current as Text);
    current = walker.nextNode();
  }
  return nodes;
}

function collectAttributes(root: ParentNode): { el: Element; attr: string }[] {
  const found: { el: Element; attr: string }[] = [];
  for (const attr of ["placeholder", "title", "aria-label", "alt"]) {
    root.querySelectorAll(`[${attr}]`).forEach((el) => {
      if (el.closest("[data-no-translate]")) return;
      const value = el.getAttribute(attr) ?? "";
      if (translatable(value)) found.push({ el, attr });
    });
  }
  return found;
}

async function fetchTranslations(texts: string[], targetLanguage: string) {
  const response = await fetch("/api/translate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ texts, targetLanguage }),
  });
  if (!response.ok) throw new Error("translation request failed");
  const data = (await response.json()) as { translations?: string[] };
  return data.translations ?? [];
}

export function AutoTranslate() {
  const { lang } = useLanguage();
  const langRef = useRef<Lang>(lang);
  const runningRef = useRef(false);
  const pendingRef = useRef(false);
  const attrOriginals = useRef(new WeakMap<Element, Record<string, string>>());

  langRef.current = lang;

  useEffect(() => {
    let cancelled = false;

    const restoreEnglish = () => {
      collectTextNodes(document.body).forEach((node) => {
        const original = originals.get(node);
        if (original !== undefined && node.nodeValue !== original) node.nodeValue = original;
      });
      document.querySelectorAll("*").forEach((el) => {
        const saved = attrOriginals.current.get(el);
        if (!saved) return;
        for (const [attr, value] of Object.entries(saved)) el.setAttribute(attr, value);
      });
    };

    const run = async () => {
      const target = langRef.current;
      if (target === "en") {
        restoreEnglish();
        return;
      }
      if (runningRef.current) {
        pendingRef.current = true;
        return;
      }
      runningRef.current = true;

      try {
        const cache = loadCache(target);
        const nodes = collectTextNodes(document.body);
        const attrs = collectAttributes(document);

        const jobs: { apply: (value: string) => void; source: string }[] = [];

        nodes.forEach((node) => {
          if (!originals.has(node)) originals.set(node, node.nodeValue ?? "");
          const source = originals.get(node)!;
          jobs.push({ source, apply: (value) => (node.nodeValue = value) });
        });

        attrs.forEach(({ el, attr }) => {
          const saved = attrOriginals.current.get(el) ?? {};
          if (saved[attr] === undefined) {
            saved[attr] = el.getAttribute(attr) ?? "";
            attrOriginals.current.set(el, saved);
          }
          const source = saved[attr]!;
          jobs.push({ source, apply: (value) => el.setAttribute(attr, value) });
        });

        // Apply everything already cached first (instant on repeat visits).
        const missing = new Set<string>();
        jobs.forEach(({ source, apply }) => {
          const key = source.trim();
          const cached = cache[key];
          if (cached) apply(source.replace(key, cached));
          else missing.add(key);
        });

        const queue = [...missing];
        for (let i = 0; i < queue.length; i += 40) {
          if (cancelled || langRef.current !== target) return;
          const batch = queue.slice(i, i + 40);
          try {
            const translations = await fetchTranslations(batch, LANGUAGE_NAMES[target]);
            batch.forEach((source, index) => {
              const value = translations[index];
              if (value) cache[source] = value;
            });
            saveCache(target);
          } catch {
            return;
          }
          if (cancelled || langRef.current !== target) return;
          jobs.forEach(({ source, apply }) => {
            const key = source.trim();
            const value = cache[key];
            if (value) apply(source.replace(key, value));
          });
        }
      } finally {
        runningRef.current = false;
        if (pendingRef.current && !cancelled) {
          pendingRef.current = false;
          void run();
        }
      }
    };

    void run();

    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new MutationObserver(() => {
      if (langRef.current === "en") return;
      clearTimeout(timer);
      timer = setTimeout(() => void run(), 400);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    return () => {
      cancelled = true;
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [lang]);

  return null;
}
