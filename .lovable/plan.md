

## Vấn đề

X Article không hiển thị đúng qua iframe embed - chỉ hiện link `x.com/i/article/2021...` thay vì cover image và title đầy đủ. Đây là hạn chế của Twitter embed khi xử lý Articles.

## Giải pháp

Sử dụng **Twitter Widgets.js** (`https://platform.twitter.com/widgets.js`) để render embed chính thức. Cách này load script Twitter và gọi `twttr.widgets.createTweet()` để render tweet/article đúng cách trong một div.

## Chi tiết kỹ thuật

**File sửa:** `src/components/LearningHub.tsx`

1. **Tạo component `TwitterEmbed`** sử dụng `useEffect` + `useRef`:
   - Load script `https://platform.twitter.com/widgets.js` một lần
   - Gọi `window.twttr.widgets.createTweet(id, containerRef)` để render
   - Hiển thị loading skeleton trong khi chờ load

2. **Dùng `TwitterEmbed` cho articles** thay vì iframe:
   - Articles: dùng `TwitterEmbed` component mới
   - Tweets thường: giữ nguyên `react-tweet` component

3. **Fallback**: Nếu embed thất bại, hiển thị card với link "Read on X"

