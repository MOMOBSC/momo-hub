import { ArrowUp } from "lucide-react";

const links = [
  { label: "𝕏 @momobsc_", url: "https://x.com/momobsc_" },
  { label: "Binance", url: "https://www.binance.com" },
  { label: "Giggle Academy", url: "https://giggleacademy.com" },
  { label: "BNB Chain", url: "https://www.bnbchain.org" },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-gradient-sky text-foreground">
      <div className="container mx-auto px-4 py-14">
        <div className="flex flex-col items-center text-center gap-8">
          <h3 className="font-display text-xl font-bold">MOMO Hub 🌍</h3>
          <p className="text-muted-foreground text-sm max-w-md">
            Education for the next generation
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-navy transition-colors hover:underline underline-offset-4"
              >
                {l.label}
              </a>
            ))}
          </div>

          <p className="text-muted-foreground text-sm">
            🎓 Learning · 💭 Thinking · 🌱 Sustainable Development
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-muted-foreground hover:text-navy text-xs transition-colors group"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            Back to top
          </button>

          <div className="border-t border-border w-full pt-6">
            <p className="text-muted-foreground/60 text-xs">
              © 2026 MOMO Hub · Built with 💛 by the community · Inspired by educators worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
