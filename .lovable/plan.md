

## Vấn đề

Link `https://x.com/momobsc_/status/2021262642657263695` là một **X Article** (bài viết dài trên X), không phải tweet thông thường. Thư viện `react-tweet` không hỗ trợ hiển thị Articles, chỉ hỗ trợ tweets.

## Giải pháp

1. **Xóa tweet ID article** (`2021262642657263695`) khỏi danh sách posts vì không thể embed được.

2. **Thay thế bằng fallback card** cho articles - tạo một card hiển thị tiêu đề, mô tả ngắn, và link "Read on X" để người dùng click vào đọc trực tiếp trên X.

3. **Cập nhật cấu trúc dữ liệu** để phân biệt giữa `type: "tweet"` và `type: "article"`:
   - Tweet: dùng `react-tweet` embed như hiện tại
   - Article: hiển thị custom card với link ra X

## Chi tiết kỹ thuật

File sửa: `src/components/LearningHub.tsx`

- Thêm trường `type` vào mỗi post (`"tweet"` hoặc `"article"`)
- Với `type: "article"`: render một card tùy chỉnh gồm tiêu đề, mô tả, và nút "Read on X"
- Với `type: "tweet"`: giữ nguyên `<Tweet id={...} />`
- Thêm error handling với `Suspense` và fallback cho trường hợp tweet không load được

## Yêu cầu từ bạn

Bạn có muốn cung cấp thêm các **tweet ID thực** (không phải article) từ @momobsc_ để thay thế các ID hiện tại đang bị lỗi 404 không? Hiện tại 5/6 ID trong danh sách không hoạt động.

