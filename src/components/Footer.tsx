const links = [
  { label: "X @momobsc_", url: "https://x.com/momobsc_" },
  { label: "Binance", url: "https://www.binance.com" },
  { label: "Giggle Academy", url: "https://giggleacademy.com" },
  { label: "BNB Chain", url: "https://www.bnbchain.org" },
];

const Footer = () => (
  <footer id="footer" className="bg-navy text-primary-foreground">
    <div className="container mx-auto px-4 py-14">
      <div className="flex flex-col items-center text-center gap-6">
        <h3 className="font-display text-xl font-bold">MOMO Hub 🌍</h3>
        <p className="text-primary-foreground/70 text-sm max-w-md">
          Education for the next generation
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <p className="text-primary-foreground/40 text-sm">
          🎓 Learning · 💭 Thinking · 🌱 Sustainable Development
        </p>

        <div className="border-t border-primary-foreground/10 w-full pt-6 mt-2">
          <p className="text-primary-foreground/30 text-xs">
            © 2026 MOMO Hub · Built with 💛 by the community · Inspired by educators worldwide
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
