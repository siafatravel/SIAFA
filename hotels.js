/* hotels.js */
(() => {
  "use strict";

  // =========================
  // Helpers
  // =========================
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const uniq = (arr) => [...new Set((arr || []).filter(Boolean))];

  // =========================
  // Fallback shared gallery (when no local manifest)
  // =========================
  const sharedGalleryExtras = [
    "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
    "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    "https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg",
    "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
  ];

  // ✅ بدون limit نهائياً
  function defaultGalleryImages(cover, candidates = []) {
    return uniq([cover, ...candidates, ...sharedGalleryExtras]);
  }

  // NOTE: مفاتيح الأسماء لازم تطابق data-hotel بالـHTML حرفياً
  const hotelCoverOverrides = {
    // ✅ فنادق كان عندك مشكلة بصورها
    "Hilton Istanbul Bomonti": [
      "https://images.trvl-media.com/lodging/7000000/6230000/6226800/6226720/c0561ffa.jpg?impolicy=resizecrop&ra=fit&rw=1200",
    ],
    "Sheraton Istanbul Levent": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/490724874.jpg?k=fc2752dbf8f45261a208709f2c9cf1fcc873a3e147512cce025c3fceea1b7370&o=",
    ],
    "Divan Istanbul Taksim": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/42160386.jpg?k=b4fa2f801f4a5cefa00dd0c1fe5ab2b4ef4cb3b4bb944188d2f1384f4b5237ac&o=&hp=1",
    ],
    "Lions Royal Hotel": [
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/746180737.jpg?k=8169a5057106a0232cfd0e6e619ee9fb3d6b84219a9832bfa29c1763f1d62d94&o=&s=1024x",
    ],
    "Mosaic Hotel Laleli": [
      "https://www.mosaic-hotel.com/wp-content/uploads/2022/04/mustafa3bas_hotelfotografcisi_mustafa3bas_hotelfotografcisi_5M1A5747.jpg",
    ],
    "Renaissance Istanbul Polat Bosphorus Hotel": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/433346345.jpg?k=95768d076e2e2c810d5a251d83d01aa8655eca1968cc504ded4564aa0f4b8c77&o=",
    ],

    // ✅ إضافة/تصحيح أغلفة لفنادق موجودة عندك
    "Ramada Plaza By Wyndham Sultanahmet": [
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    ],
    "Point Hotel Taksim": [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/06/3a/b8/point-hotel.jpg?w=1200&h=700&s=1",
    ],
    "Crowne Plaza Old City": [
      "https://www.hotels-tr.net/data/Photos/OriginalPhoto/11986/1198611/1198611310/photo-crowne-plaza-istanbul-old-city-by-ihg-istanbul-1.JPEG",
    ],
    "Mercure Istanbul Bomonti": [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/1e/bd/9f/exterior.jpg?w=1200&h=-1&s=1",
    ],
    "Holiday Inn Şişli": [
      "https://digital.ihg.com/is/image/ihg/holiday-inn-istanbul-5090389494-4x3",
    ],
    "Arts Hotel Harbiye": [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/0f/e4/06/arts-hotel-istanbul.jpg?w=1200&h=-1&s=1",
    ],
    "Beethoven Premium Hotel Laleli": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/286436520.jpg?k=45b8a3c6499d3fda73a63870a56f5709df5821364242f96140f603144fdd8f97&o=",
    ],
    "The Parma Downtown Laleli": [
      "https://lh3.googleusercontent.com/p/AF1QipOURXjUDXY3NW8MwErR-KxRQmdpK0vSBuYGMAjM=s1360-w1360-h1020-rw",
    ],
    "Martinenz Hotel Laleli": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/289742660.jpg?k=a71b4f6a2a424b95b106d78453346c983e952a836b5b1fe392c47fa80c5d7eb8&o=&hp=1",
    ],
    "Four Sides Şişli": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/249173676.jpg?k=2dbfdbb457d6b0863358da918d84e43bea8c00bc1f2fc7d96af7358d847db89d&o=&hp=1",
    ],
    "Mare Park Hotel Şişli": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/319791347.jpg?k=2c06ff0bcf139f872294ef702ad9f9038bd2333d57b55072728ddb91d9eb9c53&o=&hp=1",
    ],
    "Akgün Istanbul Hotel Topkapı": [
      "https://media-cdn.tripadvisor.com/media/photo-s/02/5d/f3/57/exterior.jpg",
    ],
    "Valide Hotel Şişli": [
      "https://lh3.googleusercontent.com/p/AF1QipMpvMLWqtgTCpyRr1ZSAXcOUkZgUVah8Nd18bbP=s1360-w1360-h1020-rw",
    ],
    "The Marmara Pera": [
      "https://www.hotel-board.com/picture/the-marmara-pera-hotel-6693957.jpg",
    ],
    "Arts Hotel Taksim": [
      "https://media-cdn.tripadvisor.com/media/photo-s/29/5d/37/e3/exterior.jpg",
    ],
    "Barceló Istanbul": [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/5e/5a/55/bist-view.jpg?w=1200&h=-1&s=1",
    ],
    "Nevi Hotel & Suites Taksim": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/306099602.jpg?k=b67e38a7cfab1fe46121d526b511d931d2dc471411a6e7de077db508b976fd27&o=&hp=1",
    ],

    // ✅ الفنادق الجديدة — أغلفة مؤقتة
    "Grand Hotel Gulsoy": [
    ],
    "The Craton Hotel Sisli": [
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    ],
    "Titanic City Taksim": [
      "https://images.trvl-media.com/lodging/3000000/2010000/2001500/2001408/a72a5e6f.jpg?impolicy=resizecrop&ra=fit&rw=1200",
    ],
    "Ramada Plaza Istanbul City Center": [
      "https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg",
    ],
    "Renaissance Polat Istanbul Hotel": [
      "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    ],
    "Crowne Plaza Istanbul Florya": [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    ],
    "CVK Park Bosphorus Hotel Istanbul": [
      "https://image-tc.galaxy.tf/wijpeg-7qmepp9q0ezfe026g5zoh1u5y/superior-sea-king-2.jpg",
    ],
    "Aloft Istanbul Karakoy": [
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    ],
    "Ottomans Life Hotel Deluxe": [
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
    ],
    "Legacy Ottoman Hotel": [
      "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
    ],
    "DoubleTree by Hilton Istanbul Topkapi": [
      "https://images.trvl-media.com/lodging/20000000/19430000/19427300/19427241/b3c42e01.jpg?impolicy=resizecrop&ra=fit&rw=1200",
    ],
    "Hotel Zurich Istanbul": [
      "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
    ],
    "Hilton Istanbul Maslak": [
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    ],
    "Hilton Istanbul Bakirkoy": [
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    ],
    "Golden Tulip Istanbul Bayrampasa": [
      "https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg",
    ],
    "Windsor Hotel & Convention Center Istanbul": [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    ],
    "Wanda Vista Istanbul": [
      "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    ],
    "Centro WestSide by Rotana Istanbul": [
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
    ],
    "Clarion Hotel Istanbul Mahmutbey": [
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    ],
    "Delta Hotels by Marriott Istanbul Levent": [
      "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
    ],
    "Surisso Hotel Laleli": [
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    ],
    "Bey Istanbul Hotel": [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    ],
    "Radisson Blu Hotel Istanbul Ottomare": [
      "https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg",
    ],
    "Hilton Istanbul Bosphorus": [
      "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
    ],
    "Elite World Istanbul Taksim": [
      "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    ],
    "Elite World Comfy Istanbul Taksim": [
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    ],
    "Mineo Hotel Taksim": [
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
    ],
    "Wish More Hotel Istanbul": [
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    ],
  };

  // Optional: per-hotel custom gallery (absolute URLs)
  const customHotelGalleries = {
    "Mercure Istanbul Bomonti": [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/1e/bd/9f/exterior.jpg?w=1200&h=-1&s=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/467247046.jpg?k=48837db6f61fc6c147feaae2c848f351e9c013e1771edf6df78c6d3fdad450cd&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/265768229.jpg?k=5dcecb13248a27d19085536ece1547b212d0dd085399c661846464f992fcea6a&o=",
    ],
  };

  // =========================
  // Local assets (manifest) support
  // =========================
  function buildLocalUrl(folder, filename) {
    return `assets/hotels/${folder}/${filename}`;
  }

  function getFolderFromCard(card) {
    return (card?.dataset?.folder || "").trim();
  }

  async function loadManifest(folder) {
    if (!folder) throw new Error("Missing folder");
    const url = `assets/hotels/${folder}/manifest.json?v=${Date.now()}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("manifest not found");
    return res.json();
  }

  async function galleryFromManifest(folder) {
    const m = await loadManifest(folder);
    const coverName = String(m.cover || "cover.jpg").trim();
    const coverUrl = buildLocalUrl(folder, coverName);

    const imgs = Array.isArray(m.images) ? m.images : [];
    const galleryUrls = uniq(imgs.map((name) => buildLocalUrl(folder, String(name).trim())));

    const merged = uniq([coverUrl, ...galleryUrls]);
    return { coverUrl, images: merged };
  }

  // =========================
  // Map interactions
  // =========================
  function initMapInteractions() {
    const metroToggle = $("#toggleMetro");
    const tramToggle = $("#toggleTram");
    const mapInfo = $("#mapInfo");

    const metroLines = $$('[data-layer="metro"]');
    const tramLines = $$('[data-layer="tram"]');
    const poiGroups = $$(".poi-group");

    const setLayerState = (elements, visible) => {
      elements.forEach((el) => (el.style.display = visible ? "" : "none"));
    };

    const activatePoi = (poi) => {
      if (!poi || !mapInfo) return;
      poiGroups.forEach((n) => n.classList.remove("is-active"));
      poi.classList.add("is-active");

      const name = poi.dataset.name || "";
      const info = poi.dataset.info || "";
      const transit = poi.dataset.transit || "—";
      mapInfo.innerHTML = `<b>${name}</b><br>${info}<br><span style="opacity:.9">النقل الأقرب: ${transit}</span>`;
    };

    metroToggle?.addEventListener("change", () => setLayerState(metroLines, !!metroToggle.checked));
    tramToggle?.addEventListener("change", () => setLayerState(tramLines, !!tramToggle.checked));

    poiGroups.forEach((poi) => {
      poi.addEventListener("click", (e) => {
        e.stopPropagation();
        activatePoi(poi);
      });
      poi.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activatePoi(poi);
        }
      });
    });

    if (poiGroups.length) activatePoi(poiGroups[0]);
  }

  // =========================
  // Area filter
  // =========================
  function initAreaFilter() {
    const areaFilter = $("#areaFilter");
    if (!areaFilter) return;

    const areas = uniq(
      $$("#hotelList .hotel")
        .map((h) => (h.dataset.area || "").trim())
        .filter(Boolean)
    ).sort((a, b) => a.localeCompare(b, "ar"));

    for (const area of areas) {
      const opt = document.createElement("option");
      opt.value = area;
      opt.textContent = area;
      areaFilter.appendChild(opt);
    }
  }

  // =========================
  // Render hotel cards
  // =========================
  async function renderHotels() {
    const cards = $$("#hotelList .hotel");
    const fallbackCover = "background123.jpg";

    for (const card of cards) {
      const hotel = (card.dataset.hotel || "").trim();
      const hotelAr = card.dataset.hotelAr || hotel;
      const city = card.dataset.city || "";
      const area = card.dataset.area || "";
      const stars = Math.max(1, Math.min(parseInt(card.dataset.stars || "5", 10), 5));
      const starsText = "★".repeat(stars);
      const note = card.dataset.note ? ` (${card.dataset.note})` : "";
      const folder = getFolderFromCard(card);

      let coverUrl = fallbackCover;
      let fallbackCandidates = [];

      // 1) local manifest if available
      if (folder) {
        try {
          const { coverUrl: localCover } = await galleryFromManifest(folder);
          coverUrl = localCover;
        } catch (_) {}
      }

      // 2) override by hotel name if exists
      const overrideArr = hotelCoverOverrides[hotel];
      if (Array.isArray(overrideArr) && overrideArr.length) {
        coverUrl = overrideArr[0] || coverUrl;
        fallbackCandidates = overrideArr.slice(1);
      }

      card.innerHTML = `
        <img class="hotel-thumb"
             src="${coverUrl}"
             loading="lazy"
             alt="واجهة ${hotel}"
             data-fallbacks='${JSON.stringify(fallbackCandidates)}'>
        <div class="hotel-meta">
          <div class="hotel-headline">
            <div>
              <b>${hotel}${note}</b>
              <div class="hotel-ar">${hotelAr}${note}</div>
            </div>
            <div class="hotel-rating" aria-label="تصنيف ${stars} نجوم">
              <span class="rating-label">التصنيف</span>
              <span class="rating-stars">${starsText}</span>
            </div>
          </div>
          <div class="muted">${city}${area ? ` - ${area}` : ""}</div>
        </div>
        <button class="gallery-btn" type="button">عرض الصور</button>
      `;
    }
  }

  // =========================
  // Filtering
  // =========================
  function filterHotels() {
    const q = ($("#q")?.value || "").toLowerCase().trim();
    const rating = $("#ratingFilter")?.value || "all";
    const area = $("#areaFilter")?.value || "all";

    const items = $$("#hotelList .hotel");
    items.forEach((item) => {
      const text = (item.innerText || "").toLowerCase();
      const stars = parseInt(item.dataset.stars || "0", 10);

      const textMatch = text.includes(q);
      const ratingMatch =
        rating === "all" ? true :
        rating === "5" ? stars === 5 :
        stars >= 3 && stars <= 4;

      const areaMatch = area === "all" ? true : (item.dataset.area || "") === area;

      item.style.display = textMatch && ratingMatch && areaMatch ? "" : "none";
    });
  }

  // =========================
  // Lightbox
  // =========================
  const lightbox = $("#lightbox");
  const lightboxImage = $("#lightboxImage");
  const lightboxTitle = $("#lightboxTitle");
  const lightboxStrip = $("#lightboxStrip");
  const lightboxLoading = $("#lightboxLoading");

  let activeImages = [];
  let activeIndex = 0;
  let activeHotel = "";

  function renderThumbs() {
    if (!lightboxStrip) return;
    lightboxStrip.innerHTML = activeImages
      .map(
        (src, idx) =>
          `<img src="${src}"
                class="lightbox-thumb ${idx === activeIndex ? "active" : ""}"
                data-idx="${idx}"
                loading="lazy"
                alt="${activeHotel} ${idx + 1}">`
      )
      .join("");
  }

  function showImage(index) {
    if (!activeImages.length || !lightboxImage || !lightboxTitle) return;

    activeIndex = (index + activeImages.length) % activeImages.length;
    lightboxImage.src = activeImages[activeIndex];
    lightboxTitle.textContent = `${activeHotel} — صورة ${activeIndex + 1} من ${activeImages.length}`;
    renderThumbs();
  }

  function openLightboxUI(hotelName) {
    activeHotel = hotelName;
    lightbox?.classList.add("open");
    lightbox?.setAttribute("aria-hidden", "false");
    if (lightboxLoading) lightboxLoading.style.display = "";
    if (lightboxImage) lightboxImage.style.display = "none";
    if (lightboxTitle) lightboxTitle.textContent = `${hotelName} — جارِ تحميل الصور…`;
    if (lightboxStrip) lightboxStrip.innerHTML = "";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    if (lightboxImage) lightboxImage.src = "";
    activeImages = [];
    activeIndex = 0;
    activeHotel = "";
    if (lightboxStrip) lightboxStrip.innerHTML = "";
  }

  async function openLightbox(card) {
    if (!card) return;

    const hotel = (card.dataset.hotel || "").trim();
    const folder = getFolderFromCard(card);

    openLightboxUI(hotel);

    // 1) If custom hotel gallery exists: use it first
    const custom = customHotelGalleries[hotel];
    if (Array.isArray(custom) && custom.length) {
      activeImages = uniq(custom);
      activeIndex = 0;
      if (lightboxLoading) lightboxLoading.style.display = "none";
      if (lightboxImage) lightboxImage.style.display = "";
      showImage(0);
      return;
    }

    // 2) If manifest exists: use local images
    if (folder) {
      try {
        const { images } = await galleryFromManifest(folder);
        activeImages = uniq(images);
        activeIndex = 0;
        if (lightboxLoading) lightboxLoading.style.display = "none";
        if (lightboxImage) lightboxImage.style.display = "";
        showImage(0);
        return;
      } catch (_) {}
    }

    // 3) Fallback: cover from card image + overrides + shared extras
    const coverSrc =
      card.querySelector(".hotel-thumb")?.currentSrc ||
      card.querySelector(".hotel-thumb")?.src ||
      "";

    const overrideArr = hotelCoverOverrides[hotel] || [];
    const candidates = Array.isArray(overrideArr) ? overrideArr.slice(1) : [];

    activeImages = defaultGalleryImages(overrideArr[0] || coverSrc || "background123.jpg", candidates);
    activeIndex = 0;

    if (lightboxLoading) lightboxLoading.style.display = "none";
    if (lightboxImage) lightboxImage.style.display = "";
    showImage(0);
  }

  // =========================
  // Image fallback chain (for covers)
  // =========================
  function initImageFallback() {
    const list = $("#hotelList");
    if (!list) return;

    list.addEventListener(
      "error",
      (e) => {
        const img = e.target?.closest?.(".hotel-thumb");
        if (!img) return;

        let fallbacks = [];
        try {
          fallbacks = JSON.parse(img.dataset.fallbacks || "[]");
        } catch (_) {}

        const next = fallbacks.shift();
        img.dataset.fallbacks = JSON.stringify(fallbacks);

        if (next) img.src = next;
      },
      true
    );
  }

  // =========================
  // Init
  // =========================
  async function init() {
    await renderHotels();
    initAreaFilter();
    initMapInteractions();
    initImageFallback();

    filterHotels();

    $("#q")?.addEventListener("input", filterHotels);
    $("#ratingFilter")?.addEventListener("change", filterHotels);
    $("#areaFilter")?.addEventListener("change", filterHotels);

    $("#hotelList")?.addEventListener("click", (e) => {
      const target = e.target;
      const card = target?.closest?.(".hotel");
      if (!card) return;

      const isImageClick = !!target.closest?.(".hotel-thumb");
      const isButtonClick = !!target.closest?.(".gallery-btn");
      if (!isImageClick && !isButtonClick) return;

      openLightbox(card);
    });

    lightboxStrip?.addEventListener("click", (e) => {
      const thumb = e.target?.closest?.(".lightbox-thumb");
      if (!thumb) return;
      showImage(parseInt(thumb.dataset.idx || "0", 10));
    });

    $("#lightboxPrev")?.addEventListener("click", () => showImage(activeIndex - 1));
    $("#lightboxNext")?.addEventListener("click", () => showImage(activeIndex + 1));
    $("#lightboxClose")?.addEventListener("click", closeLightbox);

    lightbox?.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox?.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showImage(activeIndex + 1);
      if (e.key === "ArrowRight") showImage(activeIndex - 1);
    });
  }

  document.addEventListener("DOMContentLoaded", init);

  // keep global for inline calls (if any)
  window.filterHotels = filterHotels;
})();
