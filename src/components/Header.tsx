import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import momoAvatar from "@/assets/momo-avatar.jpg";

const navItems = ["Home", "Discovery", "AI Chat", "Resources", "About"];

const sectionMap: Record<string, string> = {
  Home: "hero",
  Discovery: "learning-hub",
  "AI Chat": "ai-chat",
  Resources: "resources",
  About: "footer",
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const ids = Object.values(sectionMap);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          const entry = Object.entries(sectionMap).find(
            ([, v]) => v === visible.target.id
          );
          if (entry) setActiveSection(entry[0]);
        }
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-[72px] px-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("hero")}>
          <img src={momoAvatar} alt="MOMO" className="w-10 h-10 rounded-full ring-2 ring-primary/40" />
          <span className="font-display font-bold text-xl text-navy">MOMO Hub</span>
          <span className="text-verified text-xs">✓</span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(sectionMap[item])}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeSection === item
                  ? "text-navy bg-muted"
                  : "text-muted-foreground hover:text-navy hover:bg-muted"
              }`}
            >
              {item}
              {activeSection === item && (
                <motion.div
                  layoutId="nav-indicator"
                  className="h-0.5 bg-primary rounded-full mt-0.5"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://x.com/momobsc_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium bg-gradient-cta text-navy px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Follow @momobsc_
          </a>
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="p-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <div key={item}>
                  <button
                    onClick={() => scrollTo(sectionMap[item])}
                    className={`w-full text-left px-4 py-3.5 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === item
                        ? "text-navy bg-muted"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item}
                  </button>
                  {i < navItems.length - 1 && (
                    <div className="h-px bg-border mx-4" />
                  )}
                </div>
              ))}
              <a
                href="https://x.com/momobsc_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-sm font-medium bg-gradient-cta text-navy px-4 py-3.5 rounded-full mt-3"
              >
                Follow @momobsc_
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
