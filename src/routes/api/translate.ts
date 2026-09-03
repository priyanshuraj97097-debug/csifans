import { createFileRoute } from "@tanstack/react-router";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateText } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

type Body = { texts?: unknown; targetLanguage?: unknown };

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai";
const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

function systemPrompt(target: string) {
  return [
    `You are a professional website localisation engine. Translate UI strings from English to ${target}.`,
    "You receive a JSON array of strings. Return ONLY a JSON array of the same length, in the same order, with each string translated.",
    "Rules: keep brand names (CSI, CSI Super Toophan, Toophan, BLDC, ISO 9001:2015), model numbers, product codes, units (mm, W, RPM, CFM, V), emails, URLs and numbers unchanged.",
    "Preserve leading/trailing spaces and punctuation. Never add explanations, markdown or code fences.",
  ].join("\n");
}

function parseArray(raw: string, expected: number): string[] | null {
  const cleaned = raw.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  try {
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed) && parsed.length === expected) {
      return parsed.map((v) => String(v));
    }
  } catch {
    // ignore
  }
  return null;
}

export const Route = createFileRoute("/api/translate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { texts, targetLanguage } = (await request.json()) as Body;

        if (!Array.isArray(texts) || texts.length === 0 || typeof targetLanguage !== "string") {
          return new Response(JSON.stringify({ error: "Invalid request" }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        const items = texts.slice(0, 120).map((t) => String(t));

        const geminiKey =
          process.env["GEMINI_API_KEY"] || process.env["GOOGLE_GENERATIVE_AI_API_KEY"];
        const lovableKey = process.env["LOVABLE_API_KEY"];

        let model;
        if (geminiKey) {
          const google = createOpenAICompatible({
            name: "google-gemini",
            baseURL: GEMINI_BASE_URL,
            apiKey: geminiKey,
          });
          model = google(process.env["GEMINI_MODEL"] || DEFAULT_GEMINI_MODEL);
        } else if (lovableKey) {
          model = createLovableAiGatewayProvider(lovableKey)("google/gemini-3.6-flash");
        } else {
          return new Response(JSON.stringify({ error: "Translation is not configured" }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }

        try {
          const { text } = await generateText({
            model,
            system: systemPrompt(targetLanguage),
            prompt: JSON.stringify(items),
          });

          const translations = parseArray(text, items.length);
          if (!translations) {
            return new Response(JSON.stringify({ error: "Unexpected translation output" }), {
              status: 502,
              headers: { "content-type": "application/json" },
            });
          }

          return new Response(JSON.stringify({ translations }), {
            headers: { "content-type": "application/json" },
          });
        } catch (error) {
          console.error("Translation request failed", error);
          return new Response(JSON.stringify({ error: "Translation failed" }), {
            status: 502,
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});
