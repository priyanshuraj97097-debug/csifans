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
const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

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

        // Server-only secrets. Never referenced from client code.
        const geminiKey =
          process.env["GEMINI_API_KEY"] || process.env["GOOGLE_GENERATIVE_AI_API_KEY"];
        const lovableKey = process.env["LOVABLE_API_KEY"];

        const system = buildSystemPrompt(languageName);
        const modelMessages = await convertToModelMessages(messages as UIMessage[]);

        // Preferred production path: direct Google Gemini API key.
        if (geminiKey) {
          const google = createOpenAICompatible({
            name: "google-gemini",
            baseURL: GEMINI_BASE_URL,
            apiKey: geminiKey,
          });

          try {
            const result = streamText({
              model: google(process.env["GEMINI_MODEL"] || DEFAULT_GEMINI_MODEL),
              system,
              messages: modelMessages,
            });

            return result.toUIMessageStreamResponse({
              originalMessages: messages as UIMessage[],
            });
          } catch (error) {
            console.error("Gemini chat request failed", error);
            return new Response(
              "The support assistant is temporarily unavailable. Please try again.",
              { status: 502 },
            );
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
          messages: modelMessages,
        });

        const response = result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
          headers: getLovableAiGatewayResponseHeaders(undefined, {
            ...(initialRunId ? { "X-Lovable-AIG-Run-ID": initialRunId } : {}),
          }),
        });

        return withLovableAiGatewayRunIdHeader(response, gateway);
      },
    },
  },
});
