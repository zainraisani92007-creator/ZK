# Music Creator Portfolio Website

A modern, responsive portfolio website for music creators with a dark theme and vibrant accent colors. Features YouTube playlist integration, social media links, and a professional design focused on music and audio content.

## Features

- 🎵 **YouTube Integration**: Embed your latest uploads and featured playlists
- 🎨 **Dark Theme**: Professional dark design with vibrant purple and cyan accents
- 📱 **Responsive Design**: Works perfectly on all devices
- 🚀 **Fast Loading**: Optimized for performance
- 🎭 **Smooth Animations**: Subtle scroll animations and visual effects
- 🔗 **Social Media**: Integrated social media icons and links
- 📧 **Contact Information**: Easy-to-find contact details

## Quick Setup

### 1. Customize Your Channel Details

Edit the `script.js` file and update the `CONFIG` object:

```javascript
const CONFIG = {
  channelName: "Your Channel Name",                    // Your YouTube channel name
  channelId: "UC_REPLACE_WITH_YOUR_CHANNEL_ID",       // Your YouTube channel ID
  featuredPlaylistUrl: "https://www.youtube.com/playlist?list=REPLACE_PLAYLIST_ID",
  specificPlaylistUrl: "https://www.youtube.com/playlist?list=REPLACE_WITH_YOUR_SPECIFIC_PLAYLIST_ID",
  contactEmail: "you@example.com",                     // Your contact email
  aboutMe: "Your personal description here...",        // About me text
  socialLinks: {
    youtube: "https://www.youtube.com/@yourchannel",   // Your YouTube URL
    instagram: "https://www.instagram.com/yourhandle", // Your Instagram URL
    facebook: "https://www.facebook.com/yourpage"      // Your Facebook URL
  }
};
```

### 2. Get Your YouTube Channel ID

1. Go to your YouTube channel
2. Right-click and "View Page Source"
3. Search for `"channelId":"UC..."`
4. Copy the ID (starts with "UC")

### 3. Get Your Playlist IDs

1. Go to your YouTube playlist
2. Copy the URL
3. The playlist ID is after `list=` in the URL
4. Example: `https://www.youtube.com/playlist?list=PLxxxxxxxx` → `PLxxxxxxxx`

### 4. Customize About Me

Update the `aboutMe` field in the CONFIG with your personal description as a music creator.

### 5. Update Social Media Links

Replace the placeholder URLs in `socialLinks` with your actual social media profiles.

## File Structure

```
yt-music-site/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── assets/             # Images and icons
│   └── favicon.svg     # Site favicon
└── README.md           # This file
```

## Customization Options

### Colors
The site uses CSS custom properties for easy color customization. Edit the `:root` section in `styles.css`:

```css
:root {
  --bg: #0b0f14;           /* Background color */
  --accent: #7c5cff;       /* Primary accent (purple) */
  --accent-2: #0ff1ce;     /* Secondary accent (cyan) */
  --text: #e8eaed;         /* Text color */
  --muted: #a8b0bd;        /* Muted text color */
}
```

### Fonts
The site uses Inter font by default. To change fonts, update the Google Fonts link in `index.html` and the font-family in `styles.css`.

### Layout
The site uses CSS Grid and Flexbox for responsive layouts. Sections can be easily reordered by moving HTML blocks in `index.html`.

## Deployment

### Option 1: GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select source branch and deploy

### Option 2: Netlify
1. Drag and drop the `yt-music-site` folder to Netlify
2. Your site will be live instantly

### Option 3: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Features

- Lazy loading for YouTube embeds
- Optimized CSS with minimal repaints
- Efficient JavaScript with intersection observers
- Compressed SVG icons
- Minimal external dependencies

## Troubleshooting

### YouTube Embeds Not Loading
- Check that your playlist URLs are correct
- Ensure playlists are public
- Verify channel ID format (starts with "UC")

### Styling Issues
- Clear browser cache
- Check CSS file path in HTML
- Verify CSS syntax

### Social Links Not Working
- Ensure URLs are complete (include `https://`)
- Check that social media profiles exist
- Test links manually

## Support

For issues or questions:
1. Check this README first
2. Review browser console for errors
3. Verify all URLs and IDs are correct
4. Test with a simple playlist first

## License

This project is open source and available under the MIT License.