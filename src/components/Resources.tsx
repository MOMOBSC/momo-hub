import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const resources = [
  {
    emoji: "🎓",
    title: "Giggle Academy",
    desc: "Free crypto education for everyone, gamified and accessible worldwide.",
    url: "https://giggleacademy.com",
    color: "from-sky/20 to-sky/5",
  },
  {
    emoji: "💰",
    title: "Binance Learn",
    desc: "Trading guides, SAFU practices, and deep dives into the Binance ecosystem.",
    url: "https://academy.binance.com",
    color: "from-sunshine/20 to-sunshine/5",
  },
  {
    emoji: "🔗",
    title: "BNB Chain Docs",
    desc: "Build dApps on BNB Chain — tutorials, APIs, and developer resources.",
    url: "https://docs.bnbchain.org",
    color: "from-leaf/20 to-leaf/5",
  },
];

const Resources = () => (
  <section id="resources" className="py-20 bg-gradient-sky">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
          🌟 Recommended Resources
        </h2>
        <p className="mt-2 text-muted-foreground text-base md:text-lg">
          Curated links to start your learning journey
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {resources.map((r, i) => (
          <motion.a
            key={r.title}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`group bg-gradient-to-b ${r.color} bg-card rounded-2xl border border-border p-8 text-center shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1`}
          >
            <div className="text-4xl mb-4">{r.emoji}</div>
            <h3 className="font-display font-semibold text-lg text-navy mb-2">{r.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">{r.desc}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-sky group-hover:text-verified transition-colors">
              Explore <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default Resources;
