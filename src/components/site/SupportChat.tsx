import { useCallback, useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { X, RotateCcw, Mic, MicOff } from "lucide-react";
import { useLanguage, LANGUAGE_NAMES } from "@/lib/i18n";
import logo from "@/assets/csi-logo.png";
import robotIcon from "@/assets/robot-chat/csi-robot-icon-animated.svg";
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

const SUGGESTION_KEYS = ["chat.s1", "chat.s2", "chat.s3"] as const;

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: any) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

function getSpeechRecognition(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as any;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

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
  const { t, lang, speechLocale } = useLanguage();
  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

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
    void sendMessage({ text: value }, { body: { language: lang, languageName: LANGUAGE_NAMES[lang] } });
  };

  const busy = status === "submitted" || status === "streaming";

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setListening(false);
  }, []);

  useEffect(() => () => recognitionRef.current?.stop(), []);

  const toggleMic = () => {
    if (listening) {
      stopListening();
      return;
    }
    const Ctor = getSpeechRecognition();
    if (!Ctor) {
      setVoiceError(t("chat.micUnsupported"));
      return;
    }
    setVoiceError(null);
    const recognition = new Ctor();
    recognition.lang = speechLocale;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
    };
    recognition.onerror = () => {
      setVoiceError(t("chat.micUnsupported"));
      setListening(false);
      recognitionRef.current = null;
    };
    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
      focusInput();
    };
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t("chat.open")}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-gradient-to-br from-[#0d4361] to-[#0d6b78] px-5 py-3.5 text-white shadow-2xl shadow-[#0d4361]/30 hover:scale-105 transition-transform"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-[Poppins] text-sm font-semibold hidden sm:inline">{t("chat.needHelp")}</span>
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
              <div className="font-[Poppins] text-sm font-bold">{t("chat.title")}</div>
              <div className="font-[Inter] text-[11px] text-white/70">
                {t("chat.subtitle")}
              </div>
            </div>
            <button
              type="button"
              aria-label={t("chat.new")}
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
              aria-label={t("chat.close")}
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
                    {t("chat.greeting")}
                  </p>
                  <p className="mt-1 font-[Inter] text-sm text-slate-600">
                    {t("chat.greetingSub")}
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    {SUGGESTION_KEYS.map((k) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => submit(t(k))}
                        className="rounded-2xl bg-white px-4 py-2.5 text-left font-[Inter] text-sm text-[#0d4361] ring-1 ring-[#0d6b78]/15 shadow-sm hover:shadow-md transition-shadow"
                      >
                        {t(k)}
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
                <Shimmer className="px-1 font-[Inter] text-sm">{t("chat.thinking")}</Shimmer>
              )}

              {error && (
                <p className="px-1 font-[Inter] text-sm text-red-600">
                  {t("chat.error")}
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
                placeholder={t("chat.placeholder")}
              />
              <PromptInputFooter className="justify-between">
                <button
                  type="button"
                  onClick={toggleMic}
                  aria-label={listening ? t("chat.micStop") : t("chat.mic")}
                  className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${
                    listening
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-[#0d6b78]/10 text-[#0d4361] hover:bg-[#0d6b78]/20"
                  }`}
                >
                  {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
                <PromptInputSubmit status={status} disabled={!input.trim() && !busy} />
              </PromptInputFooter>
            </PromptInput>
            {(listening || voiceError) && (
              <p className="mt-1.5 text-center font-[Inter] text-[11px] text-slate-500">
                {listening ? t("chat.listening") : voiceError}
              </p>
            )}
            <p className="mt-2 text-center font-[Inter] text-[10px] text-slate-400">
              {t("chat.disclaimer")}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
