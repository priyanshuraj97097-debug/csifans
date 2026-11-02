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
const DEFAULT_GEMINI_MODEL = "gemini-3.6-flash";

function safeChatError(error: unknown) {
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

  const raw = providerMessage ?? (error instanceof Error ? error.message : String(error));
  const message = raw
    .replace(/\bAIza[0-9A-Za-z_-]{20,}\b/g, "[redacted key]")
    .replace(/(Bearer\s+)[A-Za-z0-9._~+/-]+/gi, "$1[redacted]")
    .replace(/((?:api[-_ ]?key|authorization)\s*[:=]\s*)[^\s,;]+/gi, "$1[redacted]")
    .replace(/\s+/g, " ")
    .slice(0, 400);

  console.error("Gemini assistant request failed", { status, message });
  return `${status ? `Gemini returned HTTP ${status}: ` : "Gemini request failed: "}${message || "No provider message was returned."}`;
}

function buildSystemPrompt(languageName?: string) {
  return languageName && languageName !== "English"
    ? `${SUPPORT_SYSTEM_PROMPT}\n\nLANGUAGE: The customer has selected ${languageName}. Reply entirely in ${languageName}, regardless of the language of the question. Keep product names, model numbers, units and URLs unchanged.`
    : `${SUPPORT_SYSTEM_PROMPT}\n\nLANGUAGE: The customer has selected English. Reply in English unless they explicitly ask for another language.`;
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

  try {
    const google = createOpenAICompatible({
      name: "google-gemini",
      baseURL: GEMINI_BASE_URL,
      apiKey,
    });
    const result = streamText({
      model: google(context.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL),
      system: buildSystemPrompt(languageName),
      messages: await convertToModelMessages(messages as UIMessage[]),
    });

    return result.toUIMessageStreamResponse({
      originalMessages: messages as UIMessage[],
      onError: safeChatError,
    });
  } catch (error) {
    return new Response(safeChatError(error), {
      status: 502,
      headers: { "Cache-Control": "no-store", "Content-Type": "text/plain; charset=utf-8" },
    });
  }
};
