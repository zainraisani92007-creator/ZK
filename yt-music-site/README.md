# YouTube Music Site

A clean, modern, mobile-friendly landing page to showcase your YouTube channel's music content.

## Quick start

1. Open `yt-music-site/script.js` and update the `CONFIG` object:
   - `channelName`: your channel/artist name
   - `channelId`: your channel ID (starts with `UC...`). The site derives your uploads playlist automatically
   - `featuredPlaylistUrl`: paste your YouTube playlist link
   - `contactEmail`: email for the footer
   - `socialLinks`: links for YouTube, Instagram, Facebook

2. Open `yt-music-site/index.html` in a browser, or run a quick local server:

```bash
cd yt-music-site
python3 -m http.server 5173
# then open http://localhost:5173
```

## How to find your Channel ID

- If your channel URL looks like `https://www.youtube.com/channel/UCxxxxxxxxxxxxxxxxxx`, the ID is the part after `/channel/`.
- If you have a custom URL, go to your channel page and right-click → View page source, then search for `"channelId"`.

## Notes

- The "Latest Uploads" embed uses your channel's uploads playlist, derived by replacing the `UC` prefix with `UU` (no API key needed).
- The playlist section embeds your specific YouTube playlist link.
- Design is dark-themed with vibrant accents; customize colors in `yt-music-site/styles.css` under `:root`.