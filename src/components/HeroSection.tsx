import { motion } from "framer-motion";
import momoAvatar from "@/assets/momo-avatar.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-14 pb-8 md:pt-20 md:pb-12">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            src={momoAvatar}
            alt="MOMO"
            className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border-4 border-background shadow-card-hover"
          />

          <div className="flex-1 pt-2 md:pt-8">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="font-display text-3xl md:text-5xl font-bold text-navy leading-tight"
            >
              Education for the{" "}
              <span className="text-gradient-hero">Next Generation</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-3 text-sm md:text-base font-medium text-muted-foreground tracking-wide"
            >
              Learning · Thinking · Sustainable Development
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-5 text-base md:text-lg text-foreground max-w-xl leading-relaxed"
            >
              Discover insights on Education, Crypto, and AI Building from the{" "}
              <a
                href="https://x.com/momobsc_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-verified font-semibold hover:underline"
              >
                @momobsc_
              </a>{" "}
              community.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              <button
                onClick={() => scrollTo("learning-hub")}
                className="bg-gradient-hero text-primary-foreground font-semibold px-7 py-3.5 rounded-full shadow-glow hover:shadow-card-hover transition-all hover:-translate-y-0.5 text-sm md:text-base"
              >
                📚 Explore Discovery
              </button>
              <button
                onClick={() => scrollTo("ai-chat")}
                className="bg-gradient-cta text-navy font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-all hover:-translate-y-0.5 text-sm md:text-base"
              >
                🤖 Chat with MOMO AI
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
