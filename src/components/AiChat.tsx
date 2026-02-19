import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ChevronDown, Sparkles, BookOpen, TrendingUp, Leaf } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import momoAvatar from "@/assets/momo-avatar.jpg";

interface Message {
  role: "assistant" | "user";
  content: string;
  time: Date;
}

const suggestions = [
  { text: "Who is CZ & what is his vision?", icon: Sparkles },
  { text: "What is Giggle Academy?", icon: BookOpen },
  { text: "How does Binance Junior work?", icon: TrendingUp },
  { text: "BNB Chain for beginners", icon: Leaf },
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/momo-chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: { role: string; content: string }[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (msg: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok) {
    if (resp.status === 429) { onError("Rate limit exceeded. Please wait a moment."); return; }
    if (resp.status === 402) { onError("AI credits depleted."); return; }
    onError("Failed to connect to MOMO AI."); return;
  }
  if (!resp.body) { onError("No response body."); return; }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let done = false;

  while (!done) {
    const { done: rd, value } = await reader.read();
    if (rd) break;
    buf += decoder.decode(value, { stream: true });

    let nl: number;
    while ((nl = buf.indexOf("\n")) !== -1) {
      let line = buf.slice(0, nl);
      buf = buf.slice(nl + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { done = true; break; }
      try {
        const parsed = JSON.parse(json);
        const c = parsed.choices?.[0]?.delta?.content;
        if (c) onDelta(c);
      } catch {
        buf = line + "\n" + buf;
        break;
      }
    }
  }

  // flush remaining
  if (buf.trim()) {
    for (let raw of buf.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (!raw.startsWith("data: ")) continue;
      const json = raw.slice(6).trim();
      if (json === "[DONE]") continue;
      try {
        const p = JSON.parse(json);
        const c = p.choices?.[0]?.delta?.content;
        if (c) onDelta(c);
      } catch { /* ignore */ }
    }
  }
  onDone();
}

const relativeTime = (date: Date) => {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 10) return "just now";
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
};

const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey there! I'm **MOMO** 🐵✨\n\nI'm your AI guide for everything in the BNB ecosystem. I have deep knowledge about:\n\n🧑‍💼 **CZ** — His journey from immigrant kid to Binance founder\n🎮 **Giggle Academy** — Free education for 90K+ kids in 156 countries\n👶 **Binance Junior** — Parent-controlled crypto savings for ages 6-17\n⛓️ **BNB Chain** — Building dApps & smart contracts\n\nWhat would you like to explore? 👇",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [usedSuggestions, setUsedSuggestions] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, scrollToBottom]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowScroll(scrollHeight - scrollTop - clientHeight > 80);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || typing) return;
    const trimmed = text.trim();
    const userMsg: Message = { role: "user", content: trimmed, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setUsedSuggestions((prev) => new Set(prev).add(trimmed));

    // Build history for AI (skip time field)
    const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.time.getTime() > userMsg.time.getTime()) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant" as const, content: assistantSoFar, time: new Date() }];
      });
    };

    try {
      await streamChat({
        messages: history,
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: () => setTyping(false),
        onError: (msg) => {
          toast.error(msg);
          setTyping(false);
        },
      });
    } catch {
      toast.error("Connection error. Please try again.");
      setTyping(false);
    }
  };

  const visibleSuggestions = suggestions.filter((s) => !usedSuggestions.has(s.text));
  const hasInput = input.trim().length > 0;

  return (
    <section id="ai-chat" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            🤖 Chat with MOMO AI
          </h2>
          <p className="mt-2 text-muted-foreground text-base md:text-lg">
            Ask anything about Binance, Giggle Academy, or BNB Chain development
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-card rounded-2xl border border-border shadow-card overflow-hidden"
        >
          {/* Chat header */}
          <div className="bg-gradient-hero px-6 py-4 flex items-center gap-3">
            <img src={momoAvatar} alt="MOMO" className="w-10 h-10 rounded-full ring-2 ring-background/40" />
            <div>
              <p className="font-semibold text-primary-foreground text-sm flex items-center gap-2">
                MOMO AI Assistant
                <a
                  href="https://bscscan.com/token/0xd7Deb29ddBB13607375Ce50405A574AC2f7d978d?a=2581"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-background/20 backdrop-blur-sm text-[10px] font-bold px-2 py-0.5 rounded-full text-sunshine hover:bg-background/30 transition-colors"
                  title="Verified NFA Agent #2581 on BNB Smart Chain"
                >
                  <span className="w-1.5 h-1.5 bg-leaf rounded-full" />
                  NFA #2581
                </a>
              </p>
              <p className="text-primary-foreground/70 text-xs">Always learning · Always here to help</p>
            </div>
            <span className="ml-auto w-2.5 h-2.5 bg-leaf rounded-full ring-2 ring-background/30 animate-pulse" />
          </div>

          {/* NFA Verification Banner */}
          <div className="bg-muted/50 border-b border-border px-5 py-2 flex items-center justify-between gap-2 text-[11px]">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-semibold text-foreground">🛡️ NFA Verified Agent</span>
              <span>·</span>
              <a
                href="https://bscscan.com/tx/0x6f4f08e2caee8e6e934831fc614f01485da4e63b7b63700a5736f850c6cb346d"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                View Mint TX
              </a>
            </div>
            <a
              href="https://nfa.chatandbuild.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/70 hover:text-foreground transition-colors"
            >
              Powered by NFA
            </a>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-[340px] md:h-[400px] overflow-y-auto p-5 space-y-4 bg-muted/30 relative"
          >
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "assistant" && (
                  <img src={momoAvatar} alt="MOMO" className="w-7 h-7 rounded-full flex-shrink-0 mt-1 ring-1 ring-border" />
                )}
                <div className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : ""} min-w-0 flex-1`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-gradient-hero text-primary-foreground rounded-tr-md max-w-[85%]"
                        : "bg-card border border-border text-foreground rounded-tl-md max-w-full"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm prose-invert max-w-none [&>p]:my-1 [&>ul]:my-1 [&>ol]:my-1 [&>h1]:text-base [&>h2]:text-sm [&>h3]:text-sm [&_a]:text-primary [&_a]:underline">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground/60 px-1">
                    {relativeTime(msg.time)}
                  </span>
                </div>
              </motion.div>
            ))}

            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2.5"
              >
                <img src={momoAvatar} alt="MOMO" className="w-7 h-7 rounded-full flex-shrink-0 mt-1 ring-1 ring-border" />
                <div className="bg-card border border-border rounded-2xl rounded-tl-md px-4 py-3">
                  <div className="flex gap-1.5 items-center h-5">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="w-2 h-2 bg-muted-foreground/40 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={endRef} />

            <AnimatePresence>
              {showScroll && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToBottom}
                  className="sticky bottom-2 left-1/2 -translate-x-1/2 bg-card border border-border rounded-full p-2 shadow-card hover:shadow-card-hover transition-shadow z-10"
                >
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Suggestions */}
          <AnimatePresence>
            {visibleSuggestions.length > 0 && !hasInput && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-border bg-background"
              >
                <div className="px-5 py-3 flex flex-wrap gap-2">
                  {visibleSuggestions.map((s) => {
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.text}
                        onClick={() => sendMessage(s.text)}
                        disabled={typing}
                        className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {s.text}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
          <div className="px-5 py-4 border-t border-border flex gap-3 bg-background">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Ask MOMO anything..."
              disabled={typing}
              className="flex-1 bg-muted rounded-full px-5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!hasInput || typing}
              className={`p-2.5 rounded-full transition-all ${
                hasInput && !typing
                  ? "bg-gradient-cta hover:opacity-90 shadow-card"
                  : "bg-muted cursor-not-allowed"
              }`}
            >
              <Send className={`w-4 h-4 ${hasInput && !typing ? "text-navy" : "text-muted-foreground/40"}`} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AiChat;
