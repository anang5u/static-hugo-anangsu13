class UltraBackgroundRotator {
  constructor() {
    this.images = Array.isArray(window.BACKGROUND_IMAGES)
      ? window.BACKGROUND_IMAGES
      : [];

    if (!this.images.length) {
      console.warn("[BG] No images configured");
      return;
    }

    this.hero = document.querySelector(".hero-section");
    if (!this.hero) return;

    this.interval = 15000;
    this.fade = 900;
    this.used = new Set();
    this.firstLoad = true;

    this.setupHeroFadeIn();
    this.setupLayers();
    this.start();
  }

  // ---------------------------------------
  // Page fade-in setup
  // ---------------------------------------
  setupHeroFadeIn() {
    this.hero.style.opacity = "0";
    this.hero.style.transition = "opacity 1.2s ease";
  }

  revealHero() {
    requestAnimationFrame(() => {
      this.hero.style.opacity = "1";
    });
  }

  // ---------------------------------------
  // Layer setup
  // ---------------------------------------
  setupLayers() {
    this.hero.style.position = "relative";
    this.hero.style.overflow = "hidden";

    this.imgA = this.createImg();
    this.imgB = this.createImg();

    this.hero.prepend(this.imgA, this.imgB);

    this.active = this.imgA;
    this.inactive = this.imgB;
  }

  createImg() {
    const img = document.createElement("img");
    img.style.cssText = `
      position:absolute;
      inset:0;
      width:100%;
      height:100%;
      object-fit:cover;
      transition:
        opacity ${this.fade}ms ease,
        filter ${this.fade}ms ease,
        transform ${this.fade}ms ease;
      opacity:0;
      filter: blur(25px);
      transform: scale(1.05);
      z-index:0;
      will-change: opacity, filter, transform;
      backface-visibility: hidden;
    `;
    img.decoding = "async";
    img.loading = "eager";
    return img;
  }

  // ---------------------------------------
  // Pick image
  // ---------------------------------------
  pick() {
    const available = this.images.filter(i => !this.used.has(i));
    const list = available.length ? available : this.images;

    if (!available.length) this.used.clear();

    const img = list[Math.floor(Math.random() * list.length)];
    this.used.add(img);

    return img;
  }

  // ---------------------------------------
  // Responsive URL
  // ---------------------------------------
  getResponsiveUrl(url) {
    const isMobile = window.innerWidth <= 768;
    const width = isMobile ? 720 : 1920;

    if (url.includes("images.unsplash.com")) {
      if (url.includes("w=")) {
        return url.replace(/w=\d+/g, `w=${width}`);
      }
      const sep = url.includes("?") ? "&" : "?";
      return `${url}${sep}w=${width}&q=80&auto=format&fit=crop`;
    }

    return url;
  }

  // ---------------------------------------
  // Render
  // ---------------------------------------
  async show(url) {
    const next = this.inactive;
    const responsiveUrl = this.getResponsiveUrl(url);

    const preload = new Image();
    preload.src = responsiveUrl;

    try {
      if (preload.decode) await preload.decode();
    } catch {}

    next.src = responsiveUrl;

    next.style.opacity = "0";
    next.style.filter = "blur(25px)";
    next.style.transform = "scale(1.05)";

    requestAnimationFrame(() => {
      next.style.opacity = "1";

      requestAnimationFrame(() => {
        next.style.filter = "blur(0)";
        next.style.transform = "scale(1)";
        this.active.style.opacity = "0";

        [this.active, this.inactive] = [this.inactive, this.active];

        // Fade-in page only once
        if (this.firstLoad) {
          this.firstLoad = false;
          this.revealHero();
        }
      });
    });
  }

  rotate() {
    const img = this.pick();
    this.show(img);
  }

  start() {
    this.rotate();
    setInterval(() => this.rotate(), this.interval);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.bg = new UltraBackgroundRotator();
});
