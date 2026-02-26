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

  function defaultGalleryImages(cover, candidates = []) {
    const merged = uniq([cover, ...candidates, ...sharedGalleryExtras]);
    return merged.slice(0, 9);
  }

  // NOTE: مفاتيح الأسماء لازم تطابق data-hotel بالـHTML حرفياً
  const hotelCoverOverrides = {
    "Divan Istanbul": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/42160386.jpg?k=b4fa2f801f4a5cefa00dd0c1fe5ab2b4ef4cb3b4bb944188d2f1384f4b5237ac&o=&hp=1",
    ],
    "Point Hotel Taksim": [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/06/3a/b8/point-hotel.jpg?w=900&h=500&s=1",
    ],
    "Crowne Plaza Old City": [
      "https://www.hotels-tr.net/data/Photos/OriginalPhoto/11986/1198611/1198611310/photo-crowne-plaza-istanbul-old-city-by-ihg-istanbul-1.JPEG",
    ],
    "Mercure Istanbul Bomonti": [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/1e/bd/9f/exterior.jpg?w=700&h=-1&s=1",
    ],
    "Holiday Inn Şişli": [
      "https://digital.ihg.com/is/image/ihg/holiday-inn-istanbul-5090389494-4x3",
    ],
    "Arts Hotel Harbiye": [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/0f/e4/06/arts-hotel-istanbul.jpg?w=900&h=-1&s=1",
    ],
    "Lions Royal Hotel": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/486996180.jpg?k=7cec9105f71ce2b1273f8b06ec81e46ce596e400ca7c905f6d1058b34dcf1cf5&o=&hp=1",
    ],
    "Mosaic Hotel Laleli": [
      "https://www.mosaic-hotel.com/wp-content/uploads/2022/04/mustafa3bas_hotelfotografcisi_mustafa3bas_hotelfotografcisi_5M1A5747.jpg",
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
    "Eresin Hotels Topkapı": [
      "https://image-tc.galaxy.tf/wijpeg-99ed0ya4e1zgmfr1a93gt0lj8/standard.jpg?crop=247%2C0%2C1107%2C830",
    ],
    "Holiday Inn Istanbul City Topkapı": [
      "https://digital.ihg.com/is/image/ihg/holiday-inn-istanbul-6224485588-4x3",
    ],
    "The Marmara Pera": [
      "https://www.hotel-board.com/picture/the-marmara-pera-hotel-6693957.jpg",
    ],
    "Arts Hotel Taksim": [
      "https://media-cdn.tripadvisor.com/media/photo-s/29/5d/37/e3/exterior.jpg",
    ],
    "Barceló Istanbul": [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/5e/5a/55/bist-view.jpg?w=700&h=-1&s=1",
    ],
    "Nevi Hotel & Suites Taksim": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/306099602.jpg?k=b67e38a7cfab1fe46121d526b511d931d2dc471411a6e7de077db508b976fd27&o=&hp=1",
    ],
    "Renaissance Istanbul Polat Bosphorus Hotel": [
      "https://cache.marriott.com/content/dam/marriott-renditions/ISTBR/istbr-exterior-9065-hor-feat.jpg",
    ],
  };

  // Optional: per-hotel custom gallery (absolute URLs)
  const customHotelGalleries = {
    "Mercure Istanbul Bomonti": [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/1e/bd/9f/exterior.jpg?w=700&h=-1&s=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/467247046.jpg?k=48837db6f61fc6c147feaae2c848f351e9c013e1771edf6df78c6d3fdad450cd&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/265768229.jpg?k=5dcecb13248a27d19085536ece1547b212d0dd085399c661846464f992fcea6a&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/265768232.jpg?k=0f3e057e3bfcd0454150a8af620b08bed6a8390fe79c367030ad652bfe5fd8c1&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/265768236.jpg?k=4d4f6272b2eab529a9fd89abf2cf20a4ac2ec5b16d06ac535f83f50cbcb9f670&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/265768247.jpg?k=a1d640f4507fa8ebafdf5ab66df2837bd1dbf28dc0f4d1647f41c252d5c78836&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/265768238.jpg?k=f8388867bc64da11ad71f58f0ffd8c8d6ddf87ec0e680b8c5f76d6773d3cfd2b&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/265768243.jpg?k=e5a6ec428f44920d908379f4f7112922e4d9a8f95ff9ad6d7f4c1a4f4f59e0f5&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/265768251.jpg?k=c9fb3409b6d40422f6b4623a4f56de39d6ef8cc58e4458b4f4e72b8ff06ddfe4&o=",
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

    // cover first
    const merged = uniq([coverUrl, ...galleryUrls]);
    return {
      coverUrl,
      images: merged,
    };
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

      // choose cover:
      let coverUrl = fallbackCover;
      let fallbackCandidates = [];

      // 1) local manifest if available
      if (folder) {
        try {
          const { coverUrl: localCover } = await galleryFromManifest(folder);
          coverUrl = localCover;
        } catch (_) {
          // ignore, go fallback to overrides
        }
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

  function clearFilters() {
    const q = $("#q");
    const ratingFilter = $("#ratingFilter");
    const areaFilter = $("#areaFilter");
    if (q) q.value = "";
    if (ratingFilter) ratingFilter.value = "all";
    if (areaFilter) areaFilter.value = "all";
    filterHotels();
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
      activeImages = uniq(custom).slice(0, 9);
      activeIndex = 0;
      if (lightboxLoading) lightboxLoading.style.display = "none";
      if (lightboxImage) lightboxImage.style.display = "";
      showImage(0);
      return;
    }

    // 2) If manifest exists: use local images
    if (folder) {
      try {
        const { coverUrl, images } = await galleryFromManifest(folder);
        activeImages = uniq(images).slice(0, 60);
        activeIndex = 0;
        if (lightboxLoading) lightboxLoading.style.display = "none";
        if (lightboxImage) lightboxImage.style.display = "";
        showImage(0);
        return;
      } catch (_) {
        // fall back to overrides/default
      }
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
    $("#clearBtn")?.addEventListener("click", clearFilters);

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
