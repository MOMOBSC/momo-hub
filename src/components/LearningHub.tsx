import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Tweet } from "react-tweet";
import { ExternalLink, FileText } from "lucide-react";

const categories = [
  { label: "All Posts", emoji: "📋" },
  { label: "Education", emoji: "🎓" },
  { label: "Crypto", emoji: "💰" },
  { label: "AI Building", emoji: "🤖" },
  { label: "Sustainability", emoji: "🌱" },
];

type Post = {
  id: string;
  category: string;
  type: "tweet" | "article";
  title?: string;
  description?: string;
};

const posts: Post[] = [
  {
    id: "2021262642657263695",
    category: "Crypto",
    type: "article",
    title: "Crypto Insights by MOMO",
    description: "Deep dive into the latest crypto trends and blockchain education.",
  },
  { id: "2019274022643589629", category: "Education", type: "tweet" },
  { id: "2018925716985749648", category: "AI Building", type: "tweet" },
  { id: "2017742613315285069", category: "Sustainability", type: "tweet" },
  { id: "2016994399222325389", category: "Education", type: "tweet" },
  { id: "2016414469476421702", category: "Crypto", type: "tweet" },
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
              className="[&_.react-tweet-theme]:!m-0 [&_.react-tweet-theme]:!w-full"
            >
              {post.type === "article" ? (
                <div className="rounded-2xl overflow-hidden border border-border shadow-card bg-card">
                  <iframe
                    src={`https://platform.twitter.com/embed/Tweet.html?id=${post.id}&theme=light`}
                    className="w-full border-0"
                    style={{ minHeight: 400 }}
                    allowFullScreen
                    loading="lazy"
                    title={post.title || "X Article"}
                  />
                </div>
              ) : (
                <Suspense fallback={<div className="bg-card rounded-2xl border border-border p-6 h-40 animate-pulse" />}>
                  <Tweet id={post.id} />
                </Suspense>
              )}
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
