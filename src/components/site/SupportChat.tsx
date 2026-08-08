import { useCallback, useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { MessageCircle, X, RotateCcw } from "lucide-react";
import logo from "@/assets/csi-logo.png";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";

const STORAGE_KEY = "csi-support-chat";

const SUGGESTIONS = [
  "Which ceiling fans do you offer?",
  "What is the warranty on Super Toophan fans?",
  "Where is CSI Super Toophan located?",
];

function loadMessages(): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as UIMessage[]) : [];
  } catch {
    return [];
  }
}

export function SupportChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [initialMessages] = useState<UIMessage[]>(() => loadMessages());
  const [transport] = useState(() => new DefaultChatTransport({ api: "/api/chat" }));
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { messages, sendMessage, status, setMessages, error } = useChat({
    id: "csi-support",
    messages: initialMessages,
    transport,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // storage unavailable — chat still works for this session
    }
  }, [messages]);

  const focusInput = useCallback(() => {
    window.setTimeout(() => textareaRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    if (open) focusInput();
  }, [open, focusInput]);

  useEffect(() => {
    if (status === "ready") focusInput();
  }, [status, focusInput]);

  const submit = (text: string) => {
    const value = text.trim();
    if (!value || status === "submitted" || status === "streaming") return;
    setInput("");
    void sendMessage({ text: value });
  };

  const busy = status === "submitted" || status === "streaming";

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open CSI support chat"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-gradient-to-br from-[#0d4361] to-[#0d6b78] px-5 py-3.5 text-white shadow-2xl shadow-[#0d4361]/30 hover:scale-105 transition-transform"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-[Poppins] text-sm font-semibold hidden sm:inline">Need help?</span>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[600px] sm:max-h-[calc(100vh-2.5rem)] sm:w-[400px] flex flex-col overflow-hidden bg-white sm:rounded-3xl sm:ring-1 sm:ring-white/60 sm:shadow-2xl">
          <div className="flex items-center gap-3 bg-gradient-to-br from-[#0a2f44] via-[#0d4361] to-[#0d6b78] px-4 py-3.5 text-white">
            <img
              src={logo}
              alt="CSI Super Toophan"
              className="h-9 w-9 rounded-full ring-2 ring-white/30"
            />
            <div className="min-w-0 flex-1">
              <div className="font-[Poppins] text-sm font-bold">CSI Support</div>
              <div className="font-[Inter] text-[11px] text-white/70">
                Product & service assistant
              </div>
            </div>
            <button
              type="button"
              aria-label="Start a new conversation"
              onClick={() => {
                setMessages([]);
                focusInput();
              }}
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Close support chat"
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <Conversation className="flex-1 bg-[#f7fbfd]">
            <ConversationContent className="gap-3">
              {messages.length === 0 && (
                <div className="px-1 py-6">
                  <p className="font-[Poppins] text-base font-semibold text-[#0a2f44]">
                    Hello! How can we help?
                  </p>
                  <p className="mt-1 font-[Inter] text-sm text-slate-600">
                    Ask about CSI Super Toophan fans, specifications, categories or support.
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => submit(s)}
                        className="rounded-2xl bg-white px-4 py-2.5 text-left font-[Inter] text-sm text-[#0d4361] ring-1 ring-[#0d6b78]/15 shadow-sm hover:shadow-md transition-shadow"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <Message from={message.role} key={message.id}>
                  <MessageContent
                    className={
                      message.role === "user"
                        ? "bg-[#0d4361] text-white"
                        : "bg-transparent text-slate-800"
                    }
                  >
                    {message.parts.map((part, i) =>
                      part.type === "text" ? (
                        <MessageResponse key={`${message.id}-${i}`}>{part.text}</MessageResponse>
                      ) : null,
                    )}
                  </MessageContent>
                </Message>
              ))}

              {status === "submitted" && (
                <Shimmer className="px-1 font-[Inter] text-sm">Thinking...</Shimmer>
              )}

              {error && (
                <p className="px-1 font-[Inter] text-sm text-red-600">
                  Sorry, the assistant is unavailable right now. Please try again, or reach us on
                  the Contact page.
                </p>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="border-t border-slate-200 bg-white p-3">
            <PromptInput
              onSubmit={(_message, event) => {
                event.preventDefault();
                submit(input);
              }}
            >
              <PromptInputTextarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our fans, specs or support..."
              />
              <PromptInputFooter className="justify-end">
                <PromptInputSubmit status={status} disabled={!input.trim() && !busy} />
              </PromptInputFooter>
            </PromptInput>
            <p className="mt-2 text-center font-[Inter] text-[10px] text-slate-400">
              Answers are based on published CSI Fans information.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
