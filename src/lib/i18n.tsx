import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "hi" | "bn";

export const LANGUAGES: { code: Lang; label: string; native: string; speech: string }[] = [
  { code: "en", label: "English", native: "English", speech: "en-IN" },
  { code: "hi", label: "Hindi", native: "हिन्दी", speech: "hi-IN" },
  { code: "bn", label: "Bengali", native: "বাংলা", speech: "bn-IN" },
];

export const LANGUAGE_NAMES: Record<Lang, string> = {
  en: "English",
  hi: "Hindi",
  bn: "Bengali",
};

type Dict = Record<string, string>;

const en: Dict = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.products": "Products",
  "nav.services": "Services",
  "nav.newLaunches": "New Launches",
  "nav.gallery": "Gallery",
  "nav.blog": "Blog",
  "nav.downloads": "Downloads",
  "nav.contact": "Contact",
  "nav.allProducts": "All Products",
  "nav.view": "View",
  "nav.product": "product",
  "nav.products_plural": "products",
  "nav.toggleMenu": "Toggle menu",
  "lang.label": "Language",
  "chat.needHelp": "Need help?",
  "chat.open": "Open CSI support chat",
  "chat.close": "Close support chat",
  "chat.new": "Start a new conversation",
  "chat.title": "CSI Support",
  "chat.subtitle": "Product & service assistant",
  "chat.greeting": "Hello! How can we help?",
  "chat.greetingSub":
    "Ask about CSI Super Toophan fans, specifications, categories or support.",
  "chat.placeholder": "Ask about our fans, specs or support...",
  "chat.disclaimer": "Answers are based on published CSI Fans information.",
  "chat.thinking": "Thinking...",
  "chat.error":
    "Sorry, the assistant is unavailable right now. Please try again, or reach us on the Contact page.",
  "chat.mic": "Speak your question",
  "chat.micStop": "Stop recording",
  "chat.micUnsupported": "Voice input is not supported in this browser.",
  "chat.listening": "Listening...",
  "chat.s1": "Which ceiling fans do you offer?",
  "chat.s2": "What is the warranty on Super Toophan fans?",
  "chat.s3": "Where is CSI Super Toophan located?",
};

const hi: Dict = {
  "nav.home": "होम",
  "nav.about": "हमारे बारे में",
  "nav.products": "उत्पाद",
  "nav.services": "सेवाएँ",
  "nav.newLaunches": "नए उत्पाद",
  "nav.gallery": "गैलरी",
  "nav.blog": "ब्लॉग",
  "nav.downloads": "डाउनलोड",
  "nav.contact": "संपर्क",
  "nav.allProducts": "सभी उत्पाद",
  "nav.view": "देखें",
  "nav.product": "उत्पाद",
  "nav.products_plural": "उत्पाद",
  "nav.toggleMenu": "मेन्यू खोलें/बंद करें",
  "lang.label": "भाषा",
  "chat.needHelp": "मदद चाहिए?",
  "chat.open": "CSI सपोर्ट चैट खोलें",
  "chat.close": "सपोर्ट चैट बंद करें",
  "chat.new": "नई बातचीत शुरू करें",
  "chat.title": "CSI सपोर्ट",
  "chat.subtitle": "उत्पाद और सेवा सहायक",
  "chat.greeting": "नमस्ते! हम आपकी कैसे मदद करें?",
  "chat.greetingSub":
    "CSI सुपर तूफान पंखे, विशेषताएँ, श्रेणियाँ या सहायता के बारे में पूछें।",
  "chat.placeholder": "पंखों, स्पेसिफिकेशन या सहायता के बारे में पूछें...",
  "chat.disclaimer": "उत्तर CSI Fans की प्रकाशित जानकारी पर आधारित हैं।",
  "chat.thinking": "सोच रहे हैं...",
  "chat.error":
    "क्षमा करें, सहायक अभी उपलब्ध नहीं है। कृपया पुनः प्रयास करें या संपर्क पेज पर हमसे संपर्क करें।",
  "chat.mic": "अपना प्रश्न बोलें",
  "chat.micStop": "रिकॉर्डिंग बंद करें",
  "chat.micUnsupported": "इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है।",
  "chat.listening": "सुन रहे हैं...",
  "chat.s1": "आप कौन-कौन से सीलिंग फैन बनाते हैं?",
  "chat.s2": "सुपर तूफान पंखों पर वारंटी क्या है?",
  "chat.s3": "CSI सुपर तूफान कहाँ स्थित है?",
};

const bn: Dict = {
  "nav.home": "হোম",
  "nav.about": "আমাদের সম্পর্কে",
  "nav.products": "পণ্য",
  "nav.services": "পরিষেবা",
  "nav.newLaunches": "নতুন পণ্য",
  "nav.gallery": "গ্যালারি",
  "nav.blog": "ব্লগ",
  "nav.downloads": "ডাউনলোড",
  "nav.contact": "যোগাযোগ",
  "nav.allProducts": "সব পণ্য",
  "nav.view": "দেখুন",
  "nav.product": "পণ্য",
  "nav.products_plural": "পণ্য",
  "nav.toggleMenu": "মেনু খুলুন/বন্ধ করুন",
  "lang.label": "ভাষা",
  "chat.needHelp": "সাহায্য দরকার?",
  "chat.open": "CSI সাপোর্ট চ্যাট খুলুন",
  "chat.close": "সাপোর্ট চ্যাট বন্ধ করুন",
  "chat.new": "নতুন কথোপকথন শুরু করুন",
  "chat.title": "CSI সাপোর্ট",
  "chat.subtitle": "পণ্য ও পরিষেবা সহায়ক",
  "chat.greeting": "নমস্কার! আমরা কীভাবে সাহায্য করতে পারি?",
  "chat.greetingSub":
    "CSI সুপার তুফান ফ্যান, স্পেসিফিকেশন, বিভাগ বা সহায়তা সম্পর্কে জিজ্ঞাসা করুন。",
  "chat.placeholder": "ফ্যান, স্পেসিফিকেশন বা সহায়তা সম্পর্কে জিজ্ঞাসা করুন...",
  "chat.disclaimer": "উত্তরগুলি CSI Fans-এর প্রকাশিত তথ্যের ভিত্তিতে দেওয়া。",
  "chat.thinking": "ভাবছি...",
  "chat.error":
    "দুঃখিত, সহায়ক এখন উপলব্ধ নয়। আবার চেষ্টা করুন বা যোগাযোগ পৃষ্ঠায় আমাদের সাথে যোগাযোগ করুন।",
  "chat.mic": "আপনার প্রশ্ন বলুন",
  "chat.micStop": "রেকর্ডিং বন্ধ করুন",
  "chat.micUnsupported": "এই ব্রাউজারে ভয়েস ইনপুট সমর্থিত নয়।",
  "chat.listening": "শুনছি...",
  "chat.s1": "আপনারা কোন সিলিং ফ্যান তৈরি করেন?",
  "chat.s2": "সুপার তুফান ফ্যানের ওয়ারেন্টি কত?",
  "chat.s3": "CSI সুপার তুফান কোথায় অবস্থিত?",
};

const dicts: Record<Lang, Dict> = { en, hi, bn };

const STORAGE_KEY = "csi-language";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof en | string) => string;
  speechLocale: string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved && saved in dicts) setLangState(saved);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (key: string) => dicts[lang][key] ?? en[key] ?? key,
      speechLocale: LANGUAGES.find((l) => l.code === lang)?.speech ?? "en-IN",
    }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      lang: "en",
      setLang: () => undefined,
      t: (key: string) => en[key] ?? key,
      speechLocale: "en-IN",
    };
  }
  return ctx;
}
