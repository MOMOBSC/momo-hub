CREATE TABLE public.discoveries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  media_cover_url text NOT NULL,
  link_x text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.discoveries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON public.discoveries
  FOR SELECT USING (true);