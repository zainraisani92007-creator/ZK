const CONFIG = {
  channelName: "Your Channel Name",
  channelId: "UC_REPLACE_WITH_YOUR_CHANNEL_ID",
  featuredPlaylistUrl: "https://www.youtube.com/playlist?list=REPLACE_PLAYLIST_ID",
  specificPlaylistUrl: "https://www.youtube.com/playlist?list=REPLACE_WITH_YOUR_SPECIFIC_PLAYLIST_ID",
  contactEmail: "you@example.com",
  aboutMe: "I'm a passionate music creator producing original tracks, remixes, and audio experiences. My sound blends electronic, ambient, and experimental elements to create unique sonic journeys. Explore my latest releases, curated playlists, and behind-the-scenes sounds.",
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
  const wrap = iframe.closest(".player-wrap");
  if (!playlistId) {
    const section = iframe.closest(".section");
    if (section) section.style.display = "none";
    return;
  }
  
  // Create the YouTube embed URL
  const src = `https://www.youtube-nocookie.com/embed/videoseries?modestbranding=1&rel=0&iv_load_policy=3&color=white&list=${encodeURIComponent(playlistId)}`;
  
  // Set up loading states
  if (wrap) {
    wrap.classList.remove("is-loaded");
    
    // Handle iframe load event
    const markLoaded = () => {
      wrap.classList.add("is-loaded");
      if (wrap.querySelector(".skeleton")) {
        wrap.querySelector(".skeleton").style.display = "none";
      }
    };
    
    // Remove any existing listeners
    iframe.removeEventListener("load", markLoaded);
    iframe.addEventListener("load", markLoaded, { once: true });
    
    // Fallback timeout to hide skeleton
    setTimeout(markLoaded, 8000);
  }
  
  // Set the source
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

function setupScrollReveal() {
  const els = Array.from(document.querySelectorAll('[data-animate]'));
  if (!('IntersectionObserver' in window) || els.length === 0) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
  els.forEach(el => io.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  // Branding
  const channelNameEls = [
    document.getElementById("channelName"),
    document.getElementById("footerChannelName"),
    document.getElementById("heroChannelName")
  ];
  channelNameEls.forEach(el => { if (el && CONFIG.channelName) el.textContent = CONFIG.channelName; });
  if (CONFIG.channelName) {
    document.title = `${CONFIG.channelName} — Music`;
  }

  // Year + contact
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  const contactLink = document.getElementById("contactLink");
  if (contactLink && CONFIG.contactEmail) {
    contactLink.href = `mailto:${CONFIG.contactEmail}`;
    contactLink.textContent = CONFIG.contactEmail;
  }

  // Setup players
  if (!isPlaceholderChannelId(CONFIG.channelId)) {
    const uploadsId = getUploadsPlaylistId(CONFIG.channelId);
    setIframeSrc("uploadsPlayer", uploadsId);
  } else {
    setIframeSrc("uploadsPlayer", null);
  }

  if (!isPlaceholderPlaylistUrl(CONFIG.featuredPlaylistUrl)) {
    const featuredId = extractPlaylistId(CONFIG.featuredPlaylistUrl);
    setIframeSrc("featuredPlaylistPlayer", featuredId);
  } else {
    setIframeSrc("featuredPlaylistPlayer", null);
  }

  if (!isPlaceholderPlaylistUrl(CONFIG.specificPlaylistUrl)) {
    const specificId = extractPlaylistId(CONFIG.specificPlaylistUrl);
    setIframeSrc("specificPlaylistPlayer", specificId);
  } else {
    setIframeSrc("specificPlaylistPlayer", null);
  }

  // Setup social links
  setLink("ytHeader", CONFIG.socialLinks.youtube);
  setLink("igHeader", CONFIG.socialLinks.instagram);
  setLink("fbHeader", CONFIG.socialLinks.facebook);
  setLink("ytConnect", CONFIG.socialLinks.youtube);
  setLink("igConnect", CONFIG.socialLinks.instagram);
  setLink("fbConnect", CONFIG.socialLinks.facebook);

  // Setup About Me text
  const aboutMeText = document.getElementById("aboutMeText");
  if (aboutMeText && CONFIG.aboutMe) {
    aboutMeText.textContent = CONFIG.aboutMe;
  }

  // Setup CTA links
  if (!isPlaceholderChannelId(CONFIG.channelId)) {
    setLink("subscribeCta", `https://www.youtube.com/channel/${CONFIG.channelId}?sub_confirmation=1`);
  } else {
    setLink("subscribeCta", "#");
  }

  // Scroll reveal animations
  setupScrollReveal();
});