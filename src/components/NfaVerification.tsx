import { motion } from "framer-motion";
import { ExternalLink, ShieldCheck } from "lucide-react";
import momoAvatar from "@/assets/momo-avatar.jpg";

const NFA_TOKEN_URL =
  "https://bscscan.com/token/0xd7Deb29ddBB13607375Ce50405A574AC2f7d978d?a=2581";
const NFA_TX_URL =
  "https://bscscan.com/tx/0x6f4f08e2caee8e6e934831fc614f01485da4e63b7b63700a5736f850c6cb346d";
const NFA_PLATFORM_URL = "https://nfa.chatandbuild.com";

const NfaVerification = () => (
  <section id="nfa" className="py-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
          🛡️ NFA Verified Agent
        </h2>
        <p className="mt-2 text-muted-foreground text-base md:text-lg">
          MOMO is a verified Non-Fungible Agent on BNB Smart Chain
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-hero px-6 py-5 flex items-center gap-4">
            <div className="relative">
              <img
                src={momoAvatar}
                alt="MOMO Agent"
                className="w-14 h-14 rounded-full ring-2 ring-background/40"
              />
              <div className="absolute -bottom-1 -right-1 bg-leaf rounded-full p-1 ring-2 ring-background">
                <ShieldCheck className="w-3.5 h-3.5 text-background" />
              </div>
            </div>
            <div>
              <p className="font-display font-bold text-primary-foreground text-lg">
                MOMO AI Agent
              </p>
              <p className="text-primary-foreground/70 text-sm">
                Verified &amp; Minted on BNB Smart Chain
              </p>
            </div>
            <span className="ml-auto bg-leaf/20 text-leaf font-bold text-xs px-3 py-1.5 rounded-full border border-leaf/30">
              NFA #2581
            </span>
          </div>

          {/* Details */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-muted/50 rounded-xl p-4">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Token ID
                </p>
                <p className="text-foreground font-mono font-semibold text-sm">#2581</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Network
                </p>
                <p className="text-foreground font-semibold text-sm">BNB Smart Chain</p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-xl p-4">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Contract
              </p>
              <p className="text-foreground font-mono text-xs break-all">
                0xd7Deb29ddBB13607375Ce50405A574AC2f7d978d
              </p>
            </div>

            {/* Action links */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={NFA_TOKEN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-cta text-navy font-semibold text-sm px-5 py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                <ShieldCheck className="w-4 h-4" />
                View on BscScan
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={NFA_TX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 border border-border text-foreground font-medium text-sm px-5 py-3 rounded-xl hover:bg-muted transition-colors"
              >
                View Mint TX
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border px-6 py-3 flex items-center justify-center gap-2 bg-muted/30">
            <span className="text-muted-foreground text-xs">Powered by</span>
            <a
              href={NFA_PLATFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky font-semibold text-xs hover:underline"
            >
              nfa.chatandbuild.com
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default NfaVerification;
