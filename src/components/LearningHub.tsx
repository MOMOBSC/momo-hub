import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
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
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            📚 Discovery
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                <Skeleton className="w-full aspect-video" />
                <div className="p-4">
                  <Skeleton className="h-5 w-3/4" />
                </div>
              </div>
            ))}

          {!isLoading && discoveries?.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No discoveries yet — stay tuned!
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
              className="group rounded-2xl border border-border bg-card overflow-hidden shadow-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <div className="overflow-hidden" style={{ aspectRatio: '5/3' }}>
                <img
                  src={item.media_cover_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex items-center justify-between gap-2">
                <h3 className="font-semibold text-navy text-sm md:text-base line-clamp-2">
                  {item.title}
                </h3>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
              </div>
            </motion.a>
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
