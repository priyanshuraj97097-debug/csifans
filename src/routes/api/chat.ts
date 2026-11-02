import { createFileRoute } from "@tanstack/react-router";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import {
  createLovableAiGatewayProvider,
  getLovableAiGatewayResponseHeaders,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "@/lib/ai-gateway.server";
import { SUPPORT_SYSTEM_PROMPT } from "@/lib/support/knowledge";

type ChatRequestBody = { messages?: unknown; language?: string; languageName?: string };

/** Google's OpenAI-compatible endpoint for the Gemini API. */
const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai";
const DEFAULT_GEMINI_MODEL = "gemini-3.6-flash";

function safeChatError(error: unknown, provider: string) {
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

  console.error("Support assistant request failed", { provider, status, message });
  return `${provider}${status ? ` returned HTTP ${status}` : " request failed"}: ${message || "No provider message was returned."}`;
}

function buildSystemPrompt(languageName?: string) {
  return languageName && languageName !== "English"
    ? `${SUPPORT_SYSTEM_PROMPT}\n\nLANGUAGE: The customer has selected ${languageName}. Reply entirely in ${languageName}, regardless of the language of the question. Keep product names, model numbers, units and URLs unchanged.`
    : `${SUPPORT_SYSTEM_PROMPT}\n\nLANGUAGE: The customer has selected English. Reply in English unless they explicitly ask for another language.`;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages, languageName } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const languageName = typeof (await Promise.resolve(undefined)) === "string" ? undefined : undefined;

        // Server-only secrets. Never referenced from client code.
        const geminiKey =
          process.env["GEMINI_API_KEY"] || process.env["GOOGLE_GENERATIVE_AI_API_KEY"];
        const lovableKey = process.env["LOVABLE_API_KEY"];

        const system = buildSystemPrompt(languageName);
        // Preferred production path: direct Google Gemini API key.
        if (geminiKey) {
          try {
            const google = createOpenAICompatible({
              name: "google-gemini",
              baseURL: GEMINI_BASE_URL,
              apiKey: geminiKey,
            });
            const result = streamText({
              model: google(process.env["GEMINI_MODEL"] || DEFAULT_GEMINI_MODEL),
              system,
              messages: await convertToModelMessages(messages as UIMessage[]),
            });

            return result.toUIMessageStreamResponse({
              originalMessages: messages as UIMessage[],
              onError: (error) => safeChatError(error, "Gemini"),
            });
          } catch (error) {
            return new Response(safeChatError(error, "Gemini"), {
              status: 502,
              headers: { "Cache-Control": "no-store", "Content-Type": "text/plain; charset=utf-8" },
            });
          }
        }

        // Fallback: Lovable AI Gateway (used inside the Lovable preview).
        if (!lovableKey) {
          return new Response(
            "AI support is not configured. Set the GEMINI_API_KEY environment variable.",
            { status: 500 },
          );
        }

        const initialRunId = getLovableAiGatewayRunId(request);
        const gateway = createLovableAiGatewayProvider(lovableKey, initialRunId);

        const result = streamText({
          model: gateway("google/gemini-3.6-flash"),
          system,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        const response = result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
          onError: (error) => safeChatError(error, "AI provider"),
          headers: getLovableAiGatewayResponseHeaders(undefined, {
            ...(initialRunId ? { "X-Lovable-AIG-Run-ID": initialRunId } : {}),
          }),
        });

        return withLovableAiGatewayRunIdHeader(response, gateway);
      },
    },
  },
});
