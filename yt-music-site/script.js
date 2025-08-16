const CONFIG = {
  channelName: "Your Channel Name",
  channelId: "UC_REPLACE_WITH_YOUR_CHANNEL_ID",
  featuredPlaylistUrl: "https://www.youtube.com/playlist?list=REPLACE_PLAYLIST_ID",
  contactEmail: "you@example.com",
  socialLinks: {
    youtube: "https://www.youtube.com/",
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/"
  }
};

function getUploadsPlaylistId(channelId) {
  if (!channelId || !channelId.startsWith("UC")) return null;
  return "UU" + channelId.slice(2);
}

function extractPlaylistId(input) {
  if (!input) return null;
  try {
    const url = new URL(input);
    const list = url.searchParams.get("list");
    if (list) return list;
  } catch (e) {
    // Not a full URL; try regex
  }
  const match = String(input).match(/[?&]list=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function setIframeSrc(iframeId, playlistId) {
  const iframe = document.getElementById(iframeId);
  if (!iframe) return;
  if (!playlistId) {
    // Hide the entire section if we cannot build the embed
    const section = iframe.closest(".section");
    if (section) section.style.display = "none";
    return;
  }
  const src = `https://www.youtube-nocookie.com/embed/videoseries?modestbranding=1&rel=0&iv_load_policy=3&color=white&list=${encodeURIComponent(playlistId)}`;
  iframe.src = src;
}

function setLink(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!url) {
    el.style.display = "none";
  } else {
    el.href = url;
  }
}

function isPlaceholderChannelId(id) {
  return !id || id.includes("REPLACE");
}

function isPlaceholderPlaylistUrl(url) {
  return !url || url.includes("REPLACE");
}

document.addEventListener("DOMContentLoaded", () => {
  // Branding
  const channelNameEls = [
    document.getElementById("channelName"),
    document.getElementById("footerChannelName")
  ];
  channelNameEls.forEach(el => { if (el && CONFIG.channelName) el.textContent = CONFIG.channelName; });

  // Year + contact
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  const contactLink = document.getElementById("contactLink");
  if (contactLink && CONFIG.contactEmail) {
    contactLink.href = `mailto:${CONFIG.contactEmail}`;
    contactLink.textContent = CONFIG.contactEmail;
  }

  // Social links
  setLink("ytHeader", CONFIG.socialLinks.youtube);
  setLink("igHeader", CONFIG.socialLinks.instagram);
  setLink("fbHeader", CONFIG.socialLinks.facebook);
  setLink("ytConnect", CONFIG.socialLinks.youtube);
  setLink("igConnect", CONFIG.socialLinks.instagram);
  setLink("fbConnect", CONFIG.socialLinks.facebook);

  // Latest uploads via uploads playlist (UU + channelId without UC)
  const uploadsPlaylistId = isPlaceholderChannelId(CONFIG.channelId)
    ? null
    : getUploadsPlaylistId(CONFIG.channelId);
  setIframeSrc("uploadsPlayer", uploadsPlaylistId);

  // Featured playlist from provided URL
  const featuredId = isPlaceholderPlaylistUrl(CONFIG.featuredPlaylistUrl)
    ? null
    : extractPlaylistId(CONFIG.featuredPlaylistUrl);
  setIframeSrc("featuredPlaylistPlayer", featuredId);
});