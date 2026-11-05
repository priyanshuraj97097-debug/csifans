// Cloudflare Pages Function: /api/chat
// Mirrors src/routes/api/chat.ts so the live static site (csifans.pages.dev)
// gets the same Gemini-powered support assistant. The API key is read only
// from the Pages environment variable GEMINI_API_KEY (server-side secret).
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { SUPPORT_SYSTEM_PROMPT } from "./knowledge.generated";

type ChatRequestBody = { messages?: unknown; languageName?: string };

type Env = {
  GEMINI_API_KEY?: string;
  GOOGLE_GENERATIVE_AI_API_KEY?: string;
  GEMINI_MODEL?: string;
};

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai";
// Primary model plus sibling Flash fallbacks. Google intermittently returns
// HTTP 503 "high demand" for one model while its siblings still answer, so a
// failing model is retried on the next candidate instead of surfacing an error.
const DEFAULT_GEMINI_MODEL = "gemini-3.6-flash";
const FALLBACK_GEMINI_MODELS = ["gemini-3.5-flash", "gemini-3.5-flash-lite"];
// Bounded retry: at most 4 attempts (primary -> fallback 1 -> fallback 2 ->
// primary again) with exponential backoff + jitter, honouring Retry-After
// when the provider sends it. Auth (401/403) and bad-request (400) failures
// are never retried; an unknown model (404) moves to the next candidate at once.
const MAX_ATTEMPTS = 4;
const MAX_BACKOFF_MS = 5_000;
const MAX_RETRY_AFTER_MS = 10_000;

type ErrorInfo = {
  status?: number;
  retryAfterMs?: number;
  message: string;
};

function extractError(error: unknown): ErrorInfo {
  const details = error && typeof error === "object" ? (error as Record<string, unknown>) : {};
  const statusValue = details.statusCode ?? details.status;
  const status = typeof statusValue === "number" ? statusValue : undefined;

  let providerMessage: string | undefined;
  const body = details.responseBody;
  if (typeof body === "string") {
    try {
      const parsed = JSON.parse(body) as { error?: { message?: unknown }; message?: unknown };
      const nested = parsed.error?.message;
      if (typeof nested === "string") providerMessage = nested;
      else if (typeof parsed.message === "string") providerMessage = parsed.message;
    } catch {
      // Keep the SDK message below when the response body is not structured.
    }
  }

  const headers = details.responseHeaders;
  let retryAfterMs: number | undefined;
  if (headers && typeof headers === "object") {
    const headerBag = headers as Record<string, unknown>;
    const raw = headerBag["retry-after"] ?? headerBag["Retry-After"];
    if (typeof raw === "string" && raw.trim()) {
      const seconds = Number(raw.trim());
      if (Number.isFinite(seconds) && seconds >= 0) {
        retryAfterMs = seconds * 1000;
      } else {
        const at = Date.parse(raw);
        if (Number.isFinite(at)) retryAfterMs = Math.max(0, at - Date.now());
      }
    }
  }

  const raw = providerMessage ?? (error instanceof Error ? error.message : String(error));
  return { status, retryAfterMs, message: raw };
}

function safeChatError(error: unknown) {
  const info = extractError(error);
  const message = info.message
    .replace(/\bAIza[0-9A-Za-z_-]{20,}\b/g, "[redacted key]")
    .replace(/(Bearer\s+)[A-Za-z0-9._~+/-]+/gi, "$1[redacted]")
    .replace(/([?&\s](?:key|api_key|api-key)=)[^&\s]+/gi, "$1[redacted]")
    .replace(/((?:api[-_ ]?key|authorization)\s*[:=]\s*)[^\s,;]+/gi, "$1[redacted]")
    .replace(/\s+/g, " ")
    .slice(0, 400);

  console.error("Gemini assistant request failed", { status: info.status, message });
  return `${info.status ? `Gemini returned HTTP ${info.status}: ` : "Gemini request failed: "}${message || "No provider message was returned."}`;
}

function buildSystemPrompt(languageName?: string) {
  return languageName && languageName !== "English"
    ? `${SUPPORT_SYSTEM_PROMPT}\n\nLANGUAGE: The customer has selected ${languageName}. Reply entirely in ${languageName}, regardless of the language of the question. Keep product names, model numbers, units and URLs unchanged.`
    : `${SUPPORT_SYSTEM_PROMPT}\n\nLANGUAGE: The customer has selected English. Reply in English unless they explicitly ask for another language.`;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type StreamAttempt =
  | {
      ok: true;
      reader: ReadableStreamDefaultReader<Uint8Array>;
      buffered: Uint8Array[];
      headers: Headers;
    }
  | {
      ok: false;
      reader?: ReadableStreamDefaultReader<Uint8Array>;
      error: unknown;
    };

// Starts the Gemini stream for one model and watches the first protocol
// chunks. streamText reports provider failures as an "error" part inside the
// stream (not a thrown exception), so we inspect the opening chunks: an
// "error" part before any content means the attempt failed cleanly and can
// be retried on another model; any content part means the stream is healthy.
async function startStream(
  google: ReturnType<typeof createOpenAICompatible>,
  model: string,
  system: string,
  messages: Awaited<ReturnType<typeof convertToModelMessages>>,
): Promise<StreamAttempt> {
  let capturedError: unknown;
  const result = streamText({
    model: google(model),
    system,
    messages,
    maxRetries: 0,
  });

  const response = result.toUIMessageStreamResponse({
    originalMessages: [] as UIMessage[],
    onError: (error) => {
      capturedError = error;
      return safeChatError(error);
    },
  });

  const reader = response.body!.getReader();
  const buffered: Uint8Array[] = [];
  const decoder = new TextDecoder();
  let pending = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffered.push(value);
      pending += decoder.decode(value, { stream: true });
      const lines = pending.split("\n");
      pending = lines.pop() ?? "";

      let committed = false;
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const payload = line.slice(6).trim();
        if (payload === "[DONE]") {
          committed = true;
          continue;
        }
        let event: { type?: string };
        try {
          event = JSON.parse(payload) as { type?: string };
        } catch {
          continue;
        }
        if (event.type === "error") {
          return {
            ok: false,
            reader,
            error: capturedError ?? new Error("The assistant stream reported an error."),
          };
        }
        if (
          event.type === "text-start" ||
          event.type === "text-delta" ||
          event.type === "reasoning-start" ||
          event.type === "finish-step"
        ) {
          committed = true;
          break;
        }
      }
      if (committed) break;
    }
  } catch (error) {
    return { ok: false, reader, error };
  }

  return { ok: true, reader, buffered, headers: response.headers };
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const { messages, languageName } = (await context.request.json()) as ChatRequestBody;
  if (!Array.isArray(messages)) {
    return new Response("Messages are required", { status: 400 });
  }

  const apiKey = context.env.GEMINI_API_KEY || context.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    return new Response(
      "AI support is not configured. Set the GEMINI_API_KEY environment variable.",
      { status: 500 },
    );
  }

  const google = createOpenAICompatible({
    name: "google-gemini",
    baseURL: GEMINI_BASE_URL,
    apiKey,
  });
  const models = Array.from(
    new Set([context.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL, ...FALLBACK_GEMINI_MODELS]),
  );
  const system = buildSystemPrompt(languageName);
  const modelMessages = await convertToModelMessages(messages as UIMessage[]);

  let lastError: unknown;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const model = models[attempt % models.length];
    const started = await startStream(google, model, system, modelMessages);

    if (started.ok) {
      const stream = new ReadableStream<Uint8Array>({
        start(controller) {
          for (const chunk of started.buffered) controller.enqueue(chunk);
          void (async () => {
            try {
              while (true) {
                const { done, value } = await started.reader.read();
                if (done) break;
                controller.enqueue(value);
              }
              controller.close();
            } catch (error) {
              controller.error(error);
            }
          })();
        },
        cancel() {
          void started.reader.cancel().catch(() => undefined);
        },
      });
      return new Response(stream, {
        status: 200,
        headers: new Headers(started.headers),
      });
    }

    lastError = started.error;
    if (started.reader) void started.reader.cancel().catch(() => undefined);

    const info = extractError(started.error);
    console.error("Gemini attempt failed", {
      attempt: attempt + 1,
      model,
      status: info.status,
      message: info.message.slice(0, 200),
    });

    // Authentication/permission and malformed-request failures will not
    // improve by retrying or switching models — surface them immediately.
    if (info.status === 401 || info.status === 403 || info.status === 400) break;

    if (attempt < MAX_ATTEMPTS - 1) {
      const jitter = Math.floor(Math.random() * 350);
      const backoff = Math.min(MAX_BACKOFF_MS, 600 * 2 ** attempt) + jitter;
      const waitMs =
        info.status === 404
          ? 0 // unknown model: switch to the next candidate immediately
          : info.retryAfterMs !== undefined
            ? Math.min(info.retryAfterMs, MAX_RETRY_AFTER_MS)
            : backoff;
      if (waitMs > 0) await sleep(waitMs);
    }
  }

  return new Response(safeChatError(lastError), {
    status: 502,
    headers: { "Cache-Control": "no-store", "Content-Type": "text/plain; charset=utf-8" },
  });
};
