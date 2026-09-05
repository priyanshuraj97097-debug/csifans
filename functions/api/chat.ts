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
const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

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

  const google = createOpenAICompatible({
    name: "google-gemini",
    baseURL: GEMINI_BASE_URL,
    apiKey,
  });

  try {
    const result = streamText({
      model: google(context.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL),
      system: buildSystemPrompt(languageName),
      messages: await convertToModelMessages(messages as UIMessage[]),
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
};
