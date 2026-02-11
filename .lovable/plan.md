
## Custom Discovery Section

Thay thế Learning Hub hiện tại bằng một section "Discovery" đơn giản, lấy dữ liệu từ Supabase database.

### 1. Setup Lovable Cloud + Supabase

- Kích hoạt Lovable Cloud để có database
- Tạo bảng `discoveries` với các cột:
  - `id` (uuid, primary key)
  - `title` (text)
  - `media_cover_url` (text) - URL ảnh cover
  - `link_x` (text) - Link bài viết trên X
  - `created_at` (timestamptz)
- RLS policy: cho phép public SELECT (read-only)

### 2. UI Changes - LearningHub.tsx

- Xoa hoàn toàn phần category filters (Education, Crypto, AI Building, Sustainability)
- Xoá component `TwitterEmbed` vì không cần nữa
- Đổi tiêu đề thành "Discovery" (không có label phụ)
- Render **card grid** lấy data từ Supabase:
  - Mỗi card: ảnh cover lớn phía trên, title bên dưới
  - Click vào card mở `link_x` trong tab mới
  - Hover effect với shadow/scale nhẹ
- Giữ lại phần quote "MOMO's Wisdom" ở cuối

### 3. Data Flow

- Dùng `@tanstack/react-query` (đã cài) để fetch data từ Supabase
- Query: `supabase.from('discoveries').select('*').order('created_at', { ascending: false })`
- Loading state với skeleton cards
- Empty state nếu chưa có data

### Technical Details

**Migration SQL:**
```sql
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
```

**Files to modify:**
- `src/components/LearningHub.tsx` - rewrite UI, remove filters/TwitterEmbed, fetch from DB
- `src/integrations/supabase/` - auto-generated types after migration

**Seed data** (insert tool): Thêm bài article đầu tiên với title "Crypto Insights by MOMO", media_cover_url (bạn cung cấp URL ảnh), và link_x `https://x.com/momobsc_/article/2021262642657263695`
