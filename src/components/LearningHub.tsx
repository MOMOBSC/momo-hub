import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Heart, MessageCircle, Repeat2 } from "lucide-react";

const categories = [
  { label: "All Posts", emoji: "📋" },
  { label: "Education", emoji: "🎓" },
  { label: "Crypto", emoji: "💰" },
  { label: "AI Building", emoji: "🤖" },
  { label: "Sustainability", emoji: "🌱" },
];

const posts = [
  {
    id: 1,
    category: "Education",
    text: "Facts speak louder than words. Education is the most powerful weapon which you can use to change the world. 🌍📚",
    likes: 234,
    comments: 45,
    retweets: 12,
    date: "Feb 8, 2026",
  },
  {
    id: 2,
    category: "Crypto",
    text: "Understanding SAFU is not optional — it's essential. Protect your assets, protect your future. Binance SAFU fund has already recovered $1B+ for users. 💰🔒",
    likes: 189,
    comments: 32,
    retweets: 28,
    date: "Feb 6, 2026",
  },
  {
    id: 3,
    category: "AI Building",
    text: "AI will not replace educators — but educators who use AI will replace those who don't. Embrace the tools, keep the human touch. 🤖✨",
    likes: 312,
    comments: 67,
    retweets: 45,
    date: "Feb 4, 2026",
  },
  {
    id: 4,
    category: "Sustainability",
    text: "Sustainable development isn't a trend, it's a responsibility. Every line of code we write should consider its long-term impact on communities. 🌱💻",
    likes: 156,
    comments: 23,
    retweets: 19,
    date: "Feb 2, 2026",
  },
  {
    id: 5,
    category: "Education",
    text: "Giggle Academy is making crypto education fun and accessible for everyone. Learning should feel like play, not work! 🎮📖",
    likes: 278,
    comments: 51,
    retweets: 34,
    date: "Jan 30, 2026",
  },
  {
    id: 6,
    category: "Crypto",
    text: "BNB Chain is building the infrastructure for the next billion users. Low fees, fast transactions, and a growing ecosystem. 🔗⚡",
    likes: 201,
    comments: 38,
    retweets: 22,
    date: "Jan 28, 2026",
  },
];

const LearningHub = () => {
  const [active, setActive] = useState("All Posts");
  const filtered = active === "All Posts" ? posts : posts.filter((p) => p.category === active);

  return (
    <section id="learning-hub" className="py-20 bg-gradient-sky">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            📚 Learning Hub
          </h2>
          <p className="mt-2 text-muted-foreground text-base md:text-lg">
            Latest insights on education, crypto, and sustainable building
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActive(cat.label)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat.label
                  ? "bg-gradient-hero text-primary-foreground shadow-glow"
                  : "bg-background text-muted-foreground hover:bg-muted border border-border"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-verified bg-sky-light px-2.5 py-1 rounded-full">
                  {categories.find((c) => c.label === post.category)?.emoji} {post.category}
                </span>
                <span className="text-xs text-muted-foreground ml-auto">{post.date}</span>
              </div>

              <p className="text-foreground leading-relaxed text-[15px]">{post.text}</p>

              <div className="flex items-center gap-5 mt-5 pt-4 border-t border-border">
                <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <Heart className="w-4 h-4" /> {post.likes}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <MessageCircle className="w-4 h-4" /> {post.comments}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <Repeat2 className="w-4 h-4" /> {post.retweets}
                </span>
                <a
                  href="https://x.com/momobsc_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-1 text-sm font-medium text-sky hover:text-verified transition-colors"
                >
                  Read on X <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-2xl mx-auto bg-card rounded-2xl p-8 shadow-card border border-border"
        >
          <p className="text-muted-foreground text-sm font-semibold mb-3">💭 MOMO's Wisdom</p>
          <blockquote className="text-xl md:text-2xl font-display font-semibold text-navy italic leading-relaxed">
            "Education is not preparation for life; education is life itself."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningHub;
