import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ChevronDown, Sparkles, BookOpen, TrendingUp, Leaf } from "lucide-react";
import momoAvatar from "@/assets/momo-avatar.jpg";

interface Message {
  role: "assistant" | "user";
  content: string;
  time: Date;
}

const suggestions = [
  { text: "What is Giggle Academy?", icon: BookOpen },
  { text: "BNB Chain for beginners", icon: Sparkles },
  { text: "Latest Binance updates", icon: TrendingUp },
  { text: "Sustainable crypto", icon: Leaf },
];

const momoResponses: Record<string, string> = {
  "What is Giggle Academy?":
    "🎓 Giggle Academy is a free education platform founded by CZ (Changpeng Zhao). It uses gamification to teach subjects from basic math to blockchain technology, aiming to make quality education accessible to everyone worldwide. Think of it as learning that feels like playing! 🎮\n\nKeep learning! 📚✨ - MOMO",
  "BNB Chain for beginners":
    "🔗 BNB Chain is a blockchain ecosystem built for speed and low costs. Here's your starter guide:\n\n1. It's the blockchain behind Binance\n2. Gas fees are super low (fractions of a cent)\n3. Supports smart contracts & dApps\n4. Has a huge developer community\n5. Perfect for learning blockchain dev!\n\nStart at docs.bnbchain.org 🚀\n\nKeep learning! 📚✨ - MOMO",
  "Latest Binance updates":
    "💰 Here are some key Binance updates:\n\n• SAFU fund continues protecting users\n• New educational initiatives launching globally\n• Binance Academy expanding free courses\n• CZ focusing on education post-Binance\n\nAlways DYOR and stay SAFU! 🔒\n\nKeep learning! 📚✨ - MOMO",
  "Sustainable crypto":
    "🌱 Sustainable crypto is about building responsibly:\n\n• BNB Chain uses Proof-of-Staked-Authority (low energy)\n• Green blockchain initiatives are growing\n• Education + sustainability = long-term impact\n• It's not just about profit, it's about purpose\n\nBuild for the future, not just today! 🌍\n\nKeep learning! 📚✨ - MOMO",
};

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
        "Hi! I'm MOMO 👋\n\nAsk me about:\n• Binance SAFU & trading\n• Giggle Academy learning\n• Building on BNB Chain\n• Sustainable development\n\nKeep learning! 📚✨",
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

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const trimmed = text.trim();
    const userMsg: Message = { role: "user", content: trimmed, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setUsedSuggestions((prev) => new Set(prev).add(trimmed));

    setTimeout(() => {
      const response =
        momoResponses[trimmed] ||
        `Great question! 🤔 While I'm a demo version, the full MOMO AI will have deep knowledge about Binance, BNB Chain, Giggle Academy, and sustainable development.\n\nIn the meantime, check out @momobsc_ on X for daily insights! 🌟\n\nKeep learning! 📚✨ - MOMO`;
      setMessages((prev) => [...prev, { role: "assistant", content: response, time: new Date() }]);
      setTyping(false);
    }, 1200);
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
              <p className="font-semibold text-primary-foreground text-sm">MOMO AI Assistant</p>
              <p className="text-primary-foreground/70 text-xs">Always learning · Always here to help</p>
            </div>
            <span className="ml-auto w-2.5 h-2.5 bg-leaf rounded-full ring-2 ring-background/30 animate-pulse" />
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
                    {msg.content}
                  </div>
                  <span className={`text-[10px] text-muted-foreground/60 px-1`}>
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

            {/* Scroll to bottom */}
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
                        className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors whitespace-nowrap shrink-0"
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
              className="flex-1 bg-muted rounded-full px-5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!hasInput}
              className={`p-2.5 rounded-full transition-all ${
                hasInput
                  ? "bg-gradient-cta hover:opacity-90 shadow-card"
                  : "bg-muted cursor-not-allowed"
              }`}
            >
              <Send className={`w-4 h-4 ${hasInput ? "text-navy" : "text-muted-foreground/40"}`} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AiChat;
