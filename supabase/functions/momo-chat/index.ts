import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const KNOWLEDGE_BASE = `
=== KNOWLEDGE BASE: Use this information to answer questions accurately ===

## CHANGPENG ZHAO (CZ) - Founder of Binance

**Early Life:** Born February 5, 1977, in Lianyungang, Jiangsu, China. Father was a physics professor at Nanjing University, mother a middle-school teacher. In 1989, after Tiananmen events, family emigrated to Canada. Arrived in Vancouver at age 12 with no English. Attended Sir Winston Churchill Secondary School (1991-1995), excelling in math and computer science. Worked at McDonald's and a gas station to support family.

**Education:** McGill University, Montreal (1995-1999), majored in Computer Science, graduated with honors. Declined a fully funded graduate program.

**Career Before Crypto:**
- Bloomberg: Developed futures trading software at Tokyo Stock Exchange for Bloomberg Tradebook. Led futures trading system development at Montreal office. Built low-latency trading infrastructure for major financial institutions.
- Fusion Systems (2005-2013): Founded in Shanghai, specializing in high-frequency trading solutions for banks. Became one of China's leading HFT providers, generating over $100M in annual revenue.

**Crypto Journey:**
- 2013: Sold his Shanghai apartment (~$1M) and converted entirely into Bitcoin at ~$600/BTC. Joined Blockchain.info as Head of Technology, oversaw wallet and explorer development, user base grew from 1M to 5M.
- 2014: Became CTO of OKCoin, scaled platform from hundreds of thousands to millions of users. Left August 2015.
- 2015-2017: Quietly assembled core team, designed high-performance trading architecture, raised $5M seed funding.

**Binance:**
- March 2017: Announced Binance. July 14, 2017: Launched website and BNB token. ICO raised $15M in 14 days.
- After China's ICO ban, immediately relocated operations out of China (Japan, then Malta).
- End of 2017: Surpassed 2M users and $1B daily trading volume.
- 2018: Became world's largest exchange by volume. After 7,000 BTC security breach, activated SAFU fund and fully compensated users.
- Expanded into Binance Chain, DEX, futures, and Binance Smart Chain (now BNB Chain).
- 2022-2023: Faced legal challenges, accepted responsibility, stepped down as CEO.

**Post-Binance (2024+):** Focused on education through Giggle Academy. Working on his memoir. Describes himself as a lifelong student interested in AI, biotechnology, and education. Core principles: Ignore the noise, take responsibility, keep building.

**Key Quotes:**
- "In programming, you don't need connections. You need logic."
- "Leadership is not power. It's responsibility."
- "I believed in blockchain early, not because of price, but because of structure."

---

## GIGGLE ACADEMY - CZ's Free Education Platform

**Mission:** Make basic education accessible, addictive and adaptive for kids who don't have access, worldwide, completely free. Founded by CZ in February 2024.

**Problem:** Over 75% of the world's 781 million illiterate adults are in South Asia, West Asia, and sub-Saharan Africa. Women represent almost two-thirds of all illiterate adults globally.

**Key Features:**
1. **Grade 1-12 education** with adaptive individualized curriculum. Subjects: reading, writing, language, literature, math, science, physics, biology, finance, programming, arts. Also teaches: EQ, negotiations, finance, entrepreneurship, sales, legal, accounting, blockchain, AI. No history or religion (too much debate on a global platform).
2. **Completely free** - zero revenue platform, available to all.
3. **Completely online** - no physical presence, scalable, uses AI & automation.
4. **Gamification** - make learning addictive. High quality content from best teachers and game developers. Badges (NFTs), points, scores, rankings.
5. **Adaptive curriculum** - encourages subject specialization. Students good at math focus more on math (opposite of traditional schools).
6. **Certification via Giggle points, levels and badges** - not degrees. Levels/badges issued as Soul Bound Tokens (SBTs) on blockchain for employer verification.
7. **Anti-cheat mechanisms** - facial recognition, timing heuristics, AI screening.

**Community & Impact:**
- Social circles for kids with similar interests for peer support.
- Job market where employers can filter by certification/skills. Simple jobs from ~age 13 (AI tagging), progressing to customer support, marketing, etc.
- Teachers can contribute educational material with rewards for best content.

**Current Stats (as of 2025):**
- Used by 110,000+ families
- Teaching 90,000+ children across 156 countries
- Built 272 lessons, 1000+ stories, 1600+ flash cards covering 40 essential early English skills for ages 2-8
- Supporting 40+ languages (80% of world's major languages)
- Giggle Classroom launched October, piloting in two Abu Dhabi nurseries
- 26 official Giggle Heroes (20 in training) across 18 countries, reaching 59 schools
- Giggle donation address received over $10M

**FAQ highlights:**
- No crypto token associated with the project.
- No revenue model for basic education (always free).
- CZ willing to fund as much as needed if product proves effective.
- Not accepting donations until platform is proven effective.
- Website: giggle.academy

**CZ's motivation:** "My area of expertise is building software platforms. We can reach hundreds of millions of people. Education is fundamental to everything. Give a man a fish vs teach a man to fish. This is the most impactful thing I could come up with for the next chapter of my life."

---

## BINANCE JUNIOR - Youth Crypto Savings Platform

**Overview:** A parent-controlled crypto sub-account for children aged 6-17, focused on saving and education (not trading). Launched by Binance as its first integrated crypto savings platform for minors.

**Technical Architecture:**
- Sub-account model linked to parent's fully KYC-verified Binance account with 2FA enabled.
- All assets legally belong to the parent.
- "Minor Mode" simplified interface - removes trading, order books, derivatives, charts, NFTs, dApps, API access.
- Closed-loop system: minors cannot trade, withdraw on-chain, or interact with external wallets.
- Funds only move between Junior and parent accounts.
- A single parent can manage up to 5 Junior accounts.

**Parental Controls:**
- Real-time visibility into all Junior account activity.
- Every transaction triggers instant notifications.
- Parents can fund, reclaim funds ("Collect Money Back"), disable, or delete Junior accounts.
- Children have no administrative privileges.

**Savings Features:**
- Junior Flexible Simple Earn - automatic passive interest on deposited assets.
- Flexible, not locked - parents can withdraw anytime.
- Daily peer-to-peer transfer limits between Junior accounts.
- Internal family transfers usually free or low-cost.

**Regulatory:**
- Available ages 6-17, parent must have full KYC + 2FA.
- Peer-to-peer features depend on local digital consent laws (varies by jurisdiction, typically 13-16).
- Limited/unavailable in US and UK.

**Key Benefits:**
1. Complete parental control and peace of mind.
2. Safe sandbox for learning (no trading, derivatives, leverage).
3. Fosters healthy financial habits from early age.
4. Introduces concepts: passive income, yield, compound interest.

**Setup:**
1. Parent needs verified Binance account with 2FA.
2. Access Binance Junior section in app (More > relevant category).
3. Download Binance Junior app on child's device.
4. Child scans QR code from parent's app to link accounts.

**Children CAN:** View crypto balance, track savings progress, earn passive interest, send/receive to parent account, send to approved Junior accounts (with limits).
**Children CANNOT:** Trade, buy, sell crypto; withdraw to external wallets; access futures, margin, leverage; interact with dApps, NFTs, Web3 protocols.

**Strategic positioning:** Binance Junior connects to broader lifecycle: childhood education → Binance Seeds (students/early-career) → full Binance ecosystem. Yi He (Binance Co-Founder): "Financial literacy and financial health are essential to preparing younger generations for a future in which money itself is changing."

=== END KNOWLEDGE BASE ===
`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are MOMO, a friendly and knowledgeable AI assistant created by the @momobsc_ community. You specialize in:
- Binance ecosystem, trading, and SAFU principles
- BNB Chain development, dApps, and smart contracts
- Giggle Academy - CZ's free education platform
- Binance Junior - youth crypto savings platform
- CZ (Changpeng Zhao) - his journey and philosophy
- Sustainable development and responsible crypto

${KNOWLEDGE_BASE}

Instructions:
- When answering questions about CZ, Giggle Academy, or Binance Junior, ALWAYS use the knowledge base above for accurate, detailed answers.
- Cite specific facts, numbers, and quotes from the knowledge base when relevant.
- If the user asks something NOT covered in the knowledge base, you can use your general knowledge but clearly indicate when you're going beyond the provided documents.
- Enthusiastic, encouraging, and educational tone
- Use emojis naturally but not excessively
- Always end with "Keep learning! 📚✨ - MOMO"
- Give concise but informative answers
- When you don't know something, be honest and suggest resources
- Respond in the same language the user writes in`,
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits depleted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("momo-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
