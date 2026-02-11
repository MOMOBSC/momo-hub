import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import momoAvatar from "@/assets/momo-avatar.jpg";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const suggestions = [
  "What is Giggle Academy?",
  "BNB Chain for beginners",
  "Latest Binance updates",
  "Sustainable crypto",
];

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hi! I'm MOMO 👋\n\nAsk me about:\n• Binance SAFU & trading\n• Giggle Academy learning\n• Building on BNB Chain\n• Sustainable development\n\nKeep learning! 📚✨",
  },
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

const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response =
        momoResponses[text.trim()] ||
        `Great question! 🤔 While I'm a demo version, the full MOMO AI will have deep knowledge about Binance, BNB Chain, Giggle Academy, and sustainable development.\n\nIn the meantime, check out @momobsc_ on X for daily insights! 🌟\n\nKeep learning! 📚✨ - MOMO`;
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setTyping(false);
    }, 1200);
  };

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
          className="max-w-2xl mx-auto bg-card rounded-2xl border border-border shadow-card overflow-hidden"
        >
          {/* Chat header */}
          <div className="bg-gradient-hero px-6 py-4 flex items-center gap-3">
            <img src={momoAvatar} alt="MOMO" className="w-10 h-10 rounded-full ring-2 ring-background/40" />
            <div>
              <p className="font-semibold text-primary-foreground text-sm">MOMO AI Assistant</p>
              <p className="text-primary-foreground/70 text-xs">Always learning · Always here to help</p>
            </div>
            <span className="ml-auto w-2.5 h-2.5 bg-leaf rounded-full ring-2 ring-background/30" />
          </div>

          {/* Messages */}
          <div className="h-[380px] overflow-y-auto p-5 space-y-4 bg-muted/30">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                {msg.role === "assistant" && (
                  <img src={momoAvatar} alt="MOMO" className="w-8 h-8 rounded-full flex-shrink-0 mt-1" />
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-gradient-hero text-primary-foreground rounded-br-md"
                      : "bg-card border border-border text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-3">
                <img src={momoAvatar} alt="MOMO" className="w-8 h-8 rounded-full flex-shrink-0 mt-1" />
                <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          <div className="px-5 py-3 flex flex-wrap gap-2 border-t border-border bg-background">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-5 py-4 border-t border-border flex gap-3 bg-background">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Ask MOMO anything..."
              className="flex-1 bg-muted rounded-full px-5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              onClick={() => sendMessage(input)}
              className="bg-gradient-cta p-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4 text-navy" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AiChat;
