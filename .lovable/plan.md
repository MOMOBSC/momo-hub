

## UI/UX Optimization Plan

A comprehensive pass across all sections to improve visual polish, spacing, mobile responsiveness, and the MOMO AI Chat experience.

---

### 1. Header Improvements
- Update nav item "Learning Hub" to "Discovery" to match the renamed section
- Add subtle active-state indicator when scrolling to each section
- Improve mobile menu spacing and add dividers between items

### 2. Hero Section Polish
- Add more vertical breathing room (increase top/bottom padding)
- Improve the stats/tagline spacing on mobile so text doesn't feel cramped
- Make CTA buttons slightly larger on mobile for better tap targets

### 3. Discovery Section Tweaks
- Add a subtle subtitle under "Discovery" heading (e.g., "Curated insights from the MOMO community")
- Improve card hover animation with a smoother scale + shadow transition
- Better empty state with an icon illustration instead of plain text
- Ensure consistent card height across grid items

### 4. MOMO AI Chat - Major UX Upgrade
This is the biggest improvement area:

- **Chat bubble styling**: Add subtle rounded corners differentiation - user bubbles get a small tail/notch effect, assistant bubbles get the avatar closer
- **Message timestamps**: Show relative time (e.g., "just now") under each message
- **Improved typing indicator**: Make the bouncing dots smoother with a subtle fade-in container
- **Better suggestion chips**: Style them as pill buttons with icons, and hide them after first use or when typing
- **Input field improvements**: 
  - Add a subtle border glow when focused
  - Disable send button when input is empty (visual feedback)
  - Make the input area sticky and more prominent
- **Welcome message formatting**: Use a cleaner layout with inline badges/tags instead of bullet points
- **Responsive fixes**: 
  - Reduce chat height on mobile from 380px to auto/viewport-aware
  - Make suggestion chips horizontally scrollable on mobile instead of wrapping
  - Larger touch targets for send button on mobile
- **Auto-scroll behavior**: Add a "scroll to bottom" button when user scrolls up in chat history

### 5. Resources Section
- Add subtle gradient background variation to differentiate from Discovery section
- Improve card icon size and spacing
- Add hover arrow animation on "Explore" links

### 6. Footer
- Add social media icons (X/Twitter icon) instead of plain text links
- Improve spacing between sections
- Add a "Back to top" button

---

### Technical Details

**Files to modify:**
- `src/components/Header.tsx` - Update nav labels, add scroll spy
- `src/components/HeroSection.tsx` - Spacing and mobile CTA improvements  
- `src/components/LearningHub.tsx` - Subtitle, card polish, empty state
- `src/components/AiChat.tsx` - Major UX overhaul (timestamps, suggestion behavior, input UX, responsive chat height, scroll-to-bottom button)
- `src/components/Resources.tsx` - Hover animations, visual polish
- `src/components/Footer.tsx` - Icons, back-to-top button
- `src/index.css` - Any new utility classes needed

**No new dependencies required** - all improvements use existing Tailwind, Framer Motion, and Lucide icons.

