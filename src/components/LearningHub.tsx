import { motion } from "framer-motion";
import { ExternalLink, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

type Discovery = {
  id: string;
  title: string;
  media_cover_url: string;
  link_x: string;
  created_at: string;
};

const LearningHub = () => {
  const { data: discoveries, isLoading } = useQuery({
    queryKey: ["discoveries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("discoveries" as any)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as Discovery[];
    },
  });

  return (
    <section id="learning-hub" className="py-20 bg-gradient-sky">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            📚 Discovery
          </h2>
          <p className="mt-3 text-muted-foreground text-base md:text-lg">
            Curated insights from the MOMO community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                <Skeleton className="w-full" style={{ aspectRatio: "5/2" }} />
                <div className="p-5">
                  <Skeleton className="h-5 w-3/4" />
                </div>
              </div>
            ))}

          {!isLoading && discoveries?.length === 0 && (
            <div className="col-span-full flex flex-col items-center py-16 text-muted-foreground">
              <BookOpen className="w-12 h-12 mb-4 opacity-40" />
              <p className="text-base font-medium">No discoveries yet</p>
              <p className="text-sm mt-1">Stay tuned for curated content!</p>
            </div>
          )}

          {discoveries?.map((item, i) => (
            <motion.a
              key={item.id}
              href={item.link_x}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl border border-border bg-card overflow-hidden shadow-card hover:shadow-card-hover hover:scale-[1.03] transition-all duration-300 flex flex-col"
            >
              <div className="overflow-hidden" style={{ aspectRatio: "5/2" }}>
                <img
                  src={item.media_cover_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex items-center justify-between gap-2 flex-1">
                <h3 className="font-semibold text-navy text-sm md:text-base line-clamp-2">
                  {item.title}
                </h3>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-verified transition-colors" />
              </div>
            </motion.a>
          ))}
        </div>

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
