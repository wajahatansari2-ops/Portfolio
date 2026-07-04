# 🎬 Demo Videos

Drop your MP4 demo videos in this folder.

**To wire a video into the site:**

1. Copy your file here, e.g. `public/videos/my-demo.mp4`
2. Reference it as `/videos/my-demo.mp4` in:
   - `data/projects.json` → the `"video"` field of a project (adds a **Watch Video** button + play overlay)
   - `data/videos.json` → a new entry in the **Video Gallery** carousel

**Tips**

- Keep videos under ~20 MB (compress with HandBrake, H.264, 1080p, ~5 Mbps).
- Use a 16:9 aspect ratio to match the players.
- Add a matching poster image to `/public/thumbnails/` (1280×720).
- Videos are lazy-loaded (`preload="none"`) — they cost nothing until hovered/played.
