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
      "https://images.sunshine.co.uk/ss/htl/2/4/4/24461-2-l.jpg",
    ],
    "Lions Royal Hotel": [
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/746180737.jpg?k=8169a5057106a0232cfd0e6e619ee9fb3d6b84219a9832bfa29c1763f1d62d94&o=&s=1024x",
    ],
    "Mosaic Hotel Laleli": [
      "https://tophotels.ru/icache/hotel_photos/83/112/93412/2615901_740x550.jpg",
    ],
    "Renaissance Istanbul Polat Bosphorus Hotel": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/433346345.jpg?k=95768d076e2e2c810d5a251d83d01aa8655eca1968cc504ded4564aa0f4b8c77&o=",
    ],

    // ✅ إضافة/تصحيح أغلفة لفنادق موجودة عندك
    "Ramada Plaza By Wyndham Sultanahmet": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/522066008.jpg?k=864ac63962c2a83d843a5b0a69b8ce9c121861001b85e7e473cc826d9446a818&o=",
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
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/27433582.jpg?k=d3f705634e0ba105be0f8de5c8960aa6a61da5dc3d224caa4989ef9b8c6cd026&o=",
    ],
    "Arts Hotel Taksim": [
      "https://www.tatilbon.com/urunresim/28477_b.jpg",
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
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/327324954.jpg?k=f9ae98a50707a4c5f78356a8c85460d4a3fc5ea1effdb671a9e84a9743951a40&o=",
    ],
    "Titanic City Taksim": [
      "https://cdn3.enuygun.com/media/lib/uploads/image/titanic-city-taksim-istanbul-dis-mekan-76000558.jpg",
    ],
    "Ramada Plaza Istanbul City Center": [
      "https://photos.hotelbeds.com/giata/bigger/08/086140/086140a_hb_a_005.jpg",
    ],
    "Renaissance Polat Istanbul Hotel": [
      "https://i.travelapi.com/lodging/1000000/10000/1100/1060/cc2fd998_z.jpg",
    ],
    "Crowne Plaza Istanbul Florya": [
      "https://www.istanbulprivatetour.net/img/original/17268385021770028281.webp",
    ],
    "CVK Park Bosphorus Hotel Istanbul": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/503097759.jpg?k=2ae66da63b80df51caf7d911dd9156f93dfd68a895132bf861624b7c1089e18a&o=",
    ],
    "Aloft Istanbul Karakoy": [
      "https://media.licdn.com/dms/image/v2/D4D22AQGxjQV6Y2fCNQ/feedshare-shrink_800/B4DZoQ1.m8IkAg-/0/1761219180133?e=2147483647&v=beta&t=GDWL4B5lzGxN4D-ggMDeFwqcRbENbx5VuylzsXG1PAc",
    ],
    "Ottomans Life Hotel Deluxe": [
      "https://www.ottomanslifedeluxe.com/public/uploads/home_welcome_video_bg.webp",
    ],
    "Legacy Ottoman Hotel": [
      "https://legacy-ottoman-hotel.hotel-istanbul.net/data/Photos/OriginalPhoto/12749/1274942/1274942710/photo-legacy-ottoman-hotel-istanbul-old-city-istanbul-4.JPEG",
    ],
    "DoubleTree by Hilton Istanbul Topkapi": [
      "https://images.trvl-media.com/lodging/20000000/19430000/19427300/19427241/b3c42e01.jpg?impolicy=resizecrop&ra=fit&rw=1200",
    ],
    "Hotel Zurich Istanbul": [
      "https://imgkit.otelz.com/turkiye/istanbul/fatih/hotel-zurich-istanbul-539963410.png?tr=w-450,h-330,fo-auto,q-80",
    ],
    "Hilton Istanbul Maslak": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/821637359.jpg?k=f66c90927a0dc7ba778ce1c0809522ae7e2384a777c0d8723e355e352aadb3e2&o=",
    ],
    "Hilton Istanbul Bakirkoy": [
      "https://www.turizmekstra.com/images/haberler/konaklama/1000x606/hilton-istanbuldaki-zincirini-bakirkoy-ile-genisletti_5b3bbebbd3b70.jpg",
    ],
    "Golden Tulip Istanbul Bayrampasa": [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/3d/a7/e6/exterior.jpg?w=1200&h=1200&s=1",
    ],
    "Windsor Hotel & Convention Center Istanbul": [
      "https://cdn3.enuygun.com/media/lib/1x420/uploads/image/windsor-convention-center-istanbul-one-cikan-resim-76585880.webp",
    ],
    "Wanda Vista Istanbul": [
      "https://cf.bstatic.com/xdata/images/hotel/max500/538031042.jpg?k=ebd124d1573985cafb7c3519f3fcded48caab145ea97d4834e7905a9de65b4d2&o=&hp=1",
    ],
    "Centro WestSide by Rotana Istanbul": [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/b5/6a/73/getlstd-property-photo.jpg?w=900&h=-1&s=1",
    ],
    "Clarion Hotel Istanbul Mahmutbey": [
      "https://www.tatilhatti.com/images/istanbul/bagcilar/clarion-hotel-istanbul-mahmutbey/clarion-hotel-istanbul-mahmutbey-istanbul-bagcilar_1.jpg",
    ],
    "Delta Hotels by Marriott Istanbul Levent": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/627957763.jpg?k=9218b84175a62be4a46f8859f6200d009942b74d38326a4439939904084b6e77&o=",
    ],
    "Sorriso Hotel Laleli": [
      "https://images.trvl-media.com/lodging/6000000/5770000/5769000/5768907/5feb092b.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
    ],
    "Berr Istanbul Hotel": [
      "https://cf.bstatic.com/xdata/images/hotel/max500/72814827.jpg?k=c1961ac716e2932cf7be17d8b065cbad1a96bc026a2e27d1ebe947a66e20d6c7&o=&hp=1",
    ],
    "Radisson Blu Hotel Istanbul Ottomare": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/603514877.jpg?k=d1aee82997506eb161a3060e05da9a67a71e6559efacb1fcb01e303f50d3bfad&o=",
    ],
    "Hilton Istanbul Bosphorus": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/802863305.jpg?k=7ba07cd895776656199ad3d51bc76520bd42b934a5e11896d8d8e08e5af0f29b&o=",
    ],
    "Elite World Istanbul Taksim": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/151213806.jpg?k=76932cca976a2c9e5b2fc3f9a507130aa623b9a730f565ce7baad67e1397bae9&o=",
    ],
    "Elite World Comfy Istanbul Taksim": [
      "https://images.odamax.com/imgproxy/img/1024x768/odamax/image/upload/Elite_World_Comfy_stanbul_Taksim_Hotel_202508261449150_Onur_Kuru_ELITE_WORLD_COMFY35.JPG",
    ],
    "Mineo Hotel Taksim": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/744650968.jpg?k=8c560ff8b8d89066901aee99cd5fa6e3944b7e0e41abc978261ea44bbd9ae84e&o=",
    ],
    "Wish More Hotel Istanbul": [
      "https://pix10.agoda.net/hotelImages/145/1450706/1450706_17042118250052543142.jpg?ca=6&ce=1&s=414x232",
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
