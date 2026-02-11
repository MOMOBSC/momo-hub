import { motion } from "framer-motion";
import momoAvatar from "@/assets/momo-avatar.jpg";
import momoBanner from "@/assets/momo-banner.jpeg";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Banner */}
      <div className="relative w-full h-[220px] md:h-[320px]">
        <img src={momoBanner} alt="Education for the next generation" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
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
              className="mt-2 text-sm md:text-base font-medium text-muted-foreground tracking-wide"
            >
              Learning · Thinking · Sustainable Development
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-4 text-base md:text-lg text-foreground max-w-xl"
            >
              Discover insights on Education, Crypto, and AI Building from the{" "}
              <a href="https://x.com/momobsc_" target="_blank" rel="noopener noreferrer" className="text-verified font-semibold hover:underline">
                @momobsc_
              </a>{" "}
              community.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap gap-3 mt-6"
            >
              <button
                onClick={() => scrollTo("learning-hub")}
                className="bg-gradient-hero text-primary-foreground font-semibold px-6 py-3 rounded-full shadow-glow hover:shadow-card-hover transition-all hover:-translate-y-0.5"
              >
                📚 Explore Learning Hub
              </button>
              <button
                onClick={() => scrollTo("ai-chat")}
                className="bg-gradient-cta text-navy font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-all hover:-translate-y-0.5"
              >
                🤖 Chat with MOMO AI
              </button>
            </motion.div>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-6 md:gap-10 mt-10 py-5 px-6 rounded-2xl bg-muted/60 backdrop-blur-sm"
        >
          {[
            { icon: "📝", label: "Posts Shared", value: "591" },
            { icon: "🌍", label: "Global Community", value: "" },
            { icon: "✓", label: "Verified Educator", value: "" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2 text-sm md:text-base font-medium text-navy">
              <span className="text-lg">{s.icon}</span>
              {s.value && <span className="font-bold">{s.value}</span>}
              <span className="text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
