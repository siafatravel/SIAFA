/* hotels.js */

(() => {
  "use strict";

  // ===== Helpers =====
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

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

  function uniq(arr) {
    return [...new Set((arr || []).filter(Boolean))];
  }

  // ===== Map interactions =====
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

    metroToggle?.addEventListener("change", () =>
      setLayerState(metroLines, !!metroToggle.checked)
    );
    tramToggle?.addEventListener("change", () =>
      setLayerState(tramLines, !!tramToggle.checked)
    );

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

  // ===== Area filter =====
  function initAreaFilter() {
    const areaFilter = $("#areaFilter");
    if (!areaFilter) return;

    const areas = [...new Set(
      $$("#hotelList .hotel")
        .map((h) => (h.dataset.area || "").trim())
        .filter(Boolean)
    )].sort((a, b) => a.localeCompare(b, "ar"));

    for (const area of areas) {
      const opt = document.createElement("option");
      opt.value = area;
      opt.textContent = area;
      areaFilter.appendChild(opt);
    }
  }

  // ===== Render hotel cards (cover from manifest + fallback) =====
  async function renderHotels() {
    const cards = $$("#hotelList .hotel");
    const fallbackCover = "background123.jpg";

    for (const card of cards) {
      const hotel = card.dataset.hotel || "";
      const hotelAr = card.dataset.hotelAr || hotel;
      const city = card.dataset.city || "";
      const area = card.dataset.area || "";
      const stars = Math.max(1, Math.min(parseInt(card.dataset.stars || "5", 10), 5));
      const starsText = "★".repeat(stars);
      const note = card.dataset.note ? ` (${card.dataset.note})` : "";
      const folder = getFolderFromCard(card);

      let coverUrl = fallbackCover;

      try {
        const m = await loadManifest(folder);
        const coverName = String(m.cover || "cover.jpg").trim();
        coverUrl = buildLocalUrl(folder, coverName);
      } catch (_) {
        coverUrl = fallbackCover;
      }

      card.innerHTML = `
        <img class="hotel-thumb" src="${coverUrl}" loading="lazy" alt="واجهة ${hotel}">
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

  // ===== Filtering =====
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
        rating === "all"
          ? true
          : rating === "5"
          ? stars === 5
          : stars >= 3 && stars <= 4;

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

  // ===== Lightbox =====
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
          `<img src="${src}" class="lightbox-thumb ${idx === activeIndex ? "active" : ""}"
                data-idx="${idx}" loading="lazy" alt="${activeHotel} ${idx + 1}">`
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

  async function openLightbox(card) {
    if (!lightbox) return;

    activeHotel = card.dataset.hotel || "";
    const folder = getFolderFromCard(card);
    const fallbackCover = "background123.jpg";

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");

    if (lightboxLoading) lightboxLoading.style.display = "";
    if (lightboxImage) lightboxImage.style.display = "none";
    if (lightboxTitle) lightboxTitle.textContent = `${activeHotel} — جارِ تحميل الصور…`;
    if (lightboxStrip) lightboxStrip.innerHTML = "";

    try {
      const m = await loadManifest(folder);

      const coverName = String(m.cover || "cover.jpg").trim();
      const coverUrl = buildLocalUrl(folder, coverName);

      const imgs = Array.isArray(m.images) ? m.images : [];
      const galleryUrls = uniq(
        imgs.map((name) => buildLocalUrl(folder, String(name).trim()))
      );

      const merged = uniq([coverUrl, ...galleryUrls]);
      activeImages = merged.length ? merged.slice(0, 60) : [fallbackCover];
    } catch (_) {
      activeImages = [fallbackCover];
    }

    activeIndex = 0;

    if (lightboxLoading) lightboxLoading.style.display = "none";
    if (lightboxImage) lightboxImage.style.display = "";
    showImage(0);
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

  // ===== Init =====
  async function init() {
    await renderHotels();
    initAreaFilter();
    initMapInteractions();
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