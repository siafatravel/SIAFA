const sharedGalleryExtras = [
  "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
  "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
  "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
  "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
  "https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg",
  "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
  "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
  "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg"
];

function uniq(arr){
  return [...new Set(arr.filter(Boolean))];
}

function defaultGalleryImages(cover, candidates=[]){
  const merged = uniq([cover, ...candidates, ...sharedGalleryExtras]);
  return merged.slice(0, 9);
}

const hotelCoverOverrides = {
  "Divan Istanbul": ["https://picsum.photos/seed/divan-istanbul-taksim-exterior/1200/760", "https://cf.bstatic.com/xdata/images/hotel/max1024x768/42160386.jpg?k=b4fa2f801f4a5cefa00dd0c1fe5ab2b4ef4cb3b4bb944188d2f1384f4b5237ac&o=&hp=1"],
  "Divan Istanbul Taksim": ["https://picsum.photos/seed/divan-istanbul-taksim-exterior/1200/760", "https://cf.bstatic.com/xdata/images/hotel/max1024x768/42160386.jpg?k=b4fa2f801f4a5cefa00dd0c1fe5ab2b4ef4cb3b4bb944188d2f1384f4b5237ac&o=&hp=1"],
  "Point Hotel Taksim": ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/06/3a/b8/point-hotel.jpg?w=900&h=500&s=1"],
  "Crowne Plaza Old City": ["https://www.hotels-tr.net/data/Photos/OriginalPhoto/11986/1198611/1198611310/photo-crowne-plaza-istanbul-old-city-by-ihg-istanbul-1.JPEG"],
  "Mercure Istanbul Bomonti": ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/1e/bd/9f/exterior.jpg?w=700&h=-1&s=1"],
  "Holiday Inn Şişli": ["https://digital.ihg.com/is/image/ihg/holiday-inn-istanbul-5090389494-4x3"],
  "Arts Hotel Harbiye": ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/0f/e4/06/arts-hotel-istanbul.jpg?w=900&h=-1&s=1"],
  "Lions Royal Hotel": ["https://picsum.photos/seed/lions-royal-hotel-laleli-exterior/1200/760", "https://cf.bstatic.com/xdata/images/hotel/max1024x768/486996180.jpg?k=7cec9105f71ce2b1273f8b06ec81e46ce596e400ca7c905f6d1058b34dcf1cf5&o=&hp=1"],
  "Mosaic Hotel Laleli": ["https://www.mosaic-hotel.com/wp-content/uploads/2022/04/mustafa3bas_hotelfotografcisi_mustafa3bas_hotelfotografcisi_5M1A5747.jpg"],
  "Beethoven Premium Hotel Laleli": ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/286436520.jpg?k=45b8a3c6499d3fda73a63870a56f5709df5821364242f96140f603144fdd8f97&o="],
  "The Parma Downtown Laleli": ["https://lh3.googleusercontent.com/p/AF1QipOURXjUDXY3NW8MwErR-KxRQmdpK0vSBuYGMAjM=s1360-w1360-h1020-rw"],
  "Martinenz Hotel Laleli": ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/289742660.jpg?k=a71b4f6a2a424b95b106d78453346c983e952a836b5b1fe392c47fa80c5d7eb8&o=&hp=1"],
  "Four Sides Şişli": ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/249173676.jpg?k=2dbfdbb457d6b0863358da918d84e43bea8c00bc1f2fc7d96af7358d847db89d&o=&hp=1"],
  "Mare Park Hotel Şişli": ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/319791347.jpg?k=2c06ff0bcf139f872294ef702ad9f9038bd2333d57b55072728ddb91d9eb9c53&o=&hp=1"],
  "Akgün Istanbul Hotel Topkapı": ["https://media-cdn.tripadvisor.com/media/photo-s/02/5d/f3/57/exterior.jpg"],
  "Valide Hotel Şişli": ["https://lh3.googleusercontent.com/p/AF1QipMpvMLWqtgTCpyRr1ZSAXcOUkZgUVah8Nd18bbP=s1360-w1360-h1020-rw"],
  "Eresin Hotels Topkapı": ["https://image-tc.galaxy.tf/wijpeg-99ed0ya4e1zgmfr1a93gt0lj8/standard.jpg?crop=247%2C0%2C1107%2C830"],
  "Holiday Inn Istanbul City Topkapı": ["https://digital.ihg.com/is/image/ihg/holiday-inn-istanbul-6224485588-4x3"],
  "The Marmara Taksim": ["https://picsum.photos/seed/the-marmara-taksim-exterior/1200/760", "https://www.hotel-board.com/picture/the-marmara-pera-hotel-6693957.jpg"],
  "The Marmara Pera": ["https://picsum.photos/seed/the-marmara-taksim-exterior/1200/760", "https://www.hotel-board.com/picture/the-marmara-pera-hotel-6693957.jpg"],
  "Arts Hotel Taksim": ["https://media-cdn.tripadvisor.com/media/photo-s/29/5d/37/e3/exterior.jpg"],
  "Barceló Istanbul": ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/5e/5a/55/bist-view.jpg?w=700&h=-1&s=1"],
  "Nevi Hotel & Suites Taksim": ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/306099602.jpg?k=b67e38a7cfab1fe46121d526b511d931d2dc471411a6e7de077db508b976fd27&o=&hp=1"],
  "Renaissance Istanbul Polat Bosphorus Hotel": ["https://picsum.photos/seed/renaissance-istanbul-polat-bosphorus-exterior/1200/760", "https://cache.marriott.com/content/dam/marriott-renditions/ISTBR/istbr-exterior-9065-hor-feat.jpg"],

  "Grand Gülsoy Old City": ["https://picsum.photos/seed/grand-gulsoy-old-city-istanbul-hotel-exterior/1200/760"],
  "The Craton Hotel Şişli": ["https://picsum.photos/seed/the-craton-hotel-sisli-istanbul-exterior/1200/760"],
  "Titanic City Taksim": ["https://picsum.photos/seed/titanic-city-taksim-istanbul-exterior/1200/760"],
  "Ramada Plaza Istanbul City Center": ["https://picsum.photos/seed/ramada-plaza-istanbul-city-center-exterior/1200/760"],
  "Renaissance Polat Istanbul Hotel": ["https://picsum.photos/seed/renaissance-polat-istanbul-hotel-exterior/1200/760"],
  "Crowne Plaza Florya": ["https://picsum.photos/seed/crowne-plaza-florya-istanbul-exterior/1200/760"],
  "CVK Park Bosphorus Hotel Taksim": ["https://picsum.photos/seed/cvk-park-bosphorus-hotel-istanbul-exterior/1200/760"],
  "Aloft Istanbul Karaköy": ["https://picsum.photos/seed/aloft-istanbul-karakoy-hotel-exterior/1200/760"],
  "Ottomans Life Hotel Deluxe Fatih": ["https://picsum.photos/seed/ottomans-life-hotel-deluxe-fatih-istanbul-exterior/1200/760"],
  "Legacy Ottoman Hotel Eminönü": ["https://picsum.photos/seed/legacy-ottoman-hotel-eminonu-istanbul-exterior/1200/760"],
  "DoubleTree by Hilton Topkapı": ["https://picsum.photos/seed/doubletree-by-hilton-topkapi-istanbul-exterior/1200/760"],
  "Hotel Zurich Istanbul Old City": ["https://picsum.photos/seed/hotel-zurich-istanbul-old-city-exterior/1200/760"],
  "Hilton Istanbul Maslak": ["https://picsum.photos/seed/hilton-istanbul-maslak-exterior/1200/760"],
  "Hilton Istanbul Bakırköy": ["https://picsum.photos/seed/hilton-istanbul-bakirkoy-exterior/1200/760"],
  "Golden Tulip Bayrampaşa": ["https://picsum.photos/seed/golden-tulip-bayrampasa-istanbul-exterior/1200/760"],
  "Windsor Hotel & Convention Center": ["https://picsum.photos/seed/windsor-hotel-convention-center-istanbul-exterior/1200/760"],
  "Wanda Vista Istanbul": ["https://picsum.photos/seed/wanda-vista-istanbul-exterior/1200/760"],
  "Centro WestSide by Rotana": ["https://picsum.photos/seed/centro-westside-by-rotana-istanbul-exterior/1200/760"],
  "Clarion Hotel Istanbul Mahmutbey": ["https://picsum.photos/seed/clarion-hotel-istanbul-mahmutbey-exterior/1200/760"],
  "Delta Hotels by Marriott Istanbul Levent": ["https://picsum.photos/seed/delta-hotels-by-marriott-istanbul-levent-exterior/1200/760"],
  "Sorriso Hotel Laleli": ["https://picsum.photos/seed/sorriso-hotel-laleli-istanbul-exterior/1200/760"],
  "Berr Istanbul Hotel Fatih": ["https://picsum.photos/seed/berr-istanbul-hotel-fatih-exterior/1200/760"],
  "Pera Istanbul Hotel Fatih": ["https://picsum.photos/seed/berr-istanbul-hotel-fatih-exterior/1200/760"],
  "Radisson Blu Hotel Istanbul Ottomare": ["https://picsum.photos/seed/radisson-blu-hotel-istanbul-ottomare-exterior/1200/760"],
  "Hilton Istanbul Bosphorus": ["https://picsum.photos/seed/hilton-istanbul-bosphorus-exterior/1200/760"],
  "Elite World Istanbul Taksim": ["https://picsum.photos/seed/elite-world-istanbul-taksim-exterior/1200/760"],
  "Elite World Comfy Taksim": ["https://picsum.photos/seed/elite-world-comfy-taksim-exterior/1200/760"],
  "Mineo Hotel Taksim": ["https://picsum.photos/seed/mineo-hotel-taksim-istanbul-exterior/1200/760"],
  "Menu Hotel Taksim": ["https://picsum.photos/seed/mineo-hotel-taksim-istanbul-exterior/1200/760"],
  "Wish More Hotel İstanbul": ["https://picsum.photos/seed/wish-more-hotel-istanbul-exterior/1200/760"],
  "Marriott Hotel Şişli": ["marriott sisli.jpg"],
  "Hilton Istanbul Bomonti": ["https://picsum.photos/seed/hilton-istanbul-bomonti-exterior/1200/760", "https://www.instyle.gr/wp-content/uploads/2014/01/21/1-Hilton-Istanbul-Bomonti-Exterior1.jpg"],
  "Sheraton Istanbul Levent": [
    "https://picsum.photos/seed/sheraton-istanbul-levent-exterior/1200/760",
    "https://media-cdn.tripadvisor.com/media/photo-s/24/9b/1b/c8/exterior.jpg",
    "https://cache.marriott.com/is/image/marriotts7prod/si-istsl-exterior-15986:Wide-Hor?wid=1336&fit=constrain",
    "sheraton levent.webp"
  ],
  "Ramada Plaza By Wyndham Sultanahmet": [
    "https://picsum.photos/seed/ramada-plaza-by-wyndham-sultanahmet-exterior/1200/760",
    "https://www.wyndhamhotels.com/content/dam/property-images/en-us/ra/tr/others/istanbul/56602/56602_exterior_view_1.jpg",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/522066005.jpg?k=6416ffa8debdeee8b9cec5656271a340ec73978555bbf3327b1a465b1e4e62da&o=&hp=1",
    "ramada plaza sultanahmet.webp"
  ]
};

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
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/265768251.jpg?k=c9fb3409b6d40422f6b4623a4f56de39d6ef8cc58e4458b4f4e72b8ff06ddfe4&o="
  ]
};

function hotelImages(hotelName, cover, candidates=[]){
  const custom = customHotelGalleries[hotelName];
  if(Array.isArray(custom) && custom.length){
    return uniq(custom).slice(0, 9);
  }
  return defaultGalleryImages(cover, candidates);
}

function initMapInteractions(){
  const mapSvg = document.getElementById('istanbulMap');
  const metroToggle = document.getElementById('toggleMetro');
  const tramToggle = document.getElementById('toggleTram');
  const mapInfo = document.getElementById('mapInfo');
  const metroLines = document.querySelectorAll('[data-layer="metro"]');
  const tramLines = document.querySelectorAll('[data-layer="tram"]');
  const poiGroups = document.querySelectorAll('.poi-group');

  const setLayerState = (elements, visible) => {
    elements.forEach((el) => {
      el.style.display = visible ? '' : 'none';
    });
  };

  const activatePoi = (poi) => {
    if(!poi || !mapInfo) return;
    poiGroups.forEach((node) => node.classList.remove('is-active'));
    poi.classList.add('is-active');

    const name = poi.dataset.name || '';
    const info = poi.dataset.info || '';
    const transit = poi.dataset.transit || '—';
    mapInfo.innerHTML = `<b>${name}</b><br>${info}<br><span style="opacity:.9">النقل الأقرب: ${transit}</span>`;
  };

  metroToggle?.addEventListener('change', () => setLayerState(metroLines, metroToggle.checked));
  tramToggle?.addEventListener('change', () => setLayerState(tramLines, tramToggle.checked));

  poiGroups.forEach((poi) => {
    poi.addEventListener('click', (e) => {
      e.stopPropagation();
      activatePoi(poi);
    });
    poi.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        activatePoi(poi);
      }
    });
  });

  mapSvg?.addEventListener('click', (e) => {
    const target = e.target;
    if(!(target instanceof Element)) return;
    const poi = target.closest('.poi-group');
    if(poi) activatePoi(poi);
  });

  if(poiGroups.length) activatePoi(poiGroups[0]);
}

function initAreaFilter(){
  const areas = [...new Set(Array.from(document.querySelectorAll('#hotelList .hotel')).map((h)=>h.dataset.area).filter(Boolean))];
  const areaFilter = document.getElementById('areaFilter');
  areas.sort((a,b)=>a.localeCompare(b,'ar'));
  areas.forEach((area)=>{
    const opt = document.createElement('option');
    opt.value = area;
    opt.textContent = area;
    areaFilter.appendChild(opt);
  });
}

function renderHotels(){
  const hotels = document.querySelectorAll('#hotelList .hotel');
  hotels.forEach((card) => {
    const hotel = card.dataset.hotel;
    const hotelAr = card.dataset.hotelAr || hotel;
    const city = card.dataset.city;
    const area = card.dataset.area || city;
    const stars = Math.max(1, Math.min(parseInt(card.dataset.stars || "5", 10), 5));
    const starsText = "★".repeat(stars);
    const note = card.dataset.note ? ` (${card.dataset.note})` : "";
    const fallbackCover = "background123.jpg";
    const overrideCandidates = hotelCoverOverrides[hotel] || [];
    const cover = Array.isArray(overrideCandidates) ? (overrideCandidates[0] || fallbackCover) : overrideCandidates;
    const fallbackChain = [...overrideCandidates.slice(1), fallbackCover];
    card.innerHTML = `
      <img class="hotel-thumb" src="${cover}" loading="lazy" alt="واجهة ${hotel}" data-fallbacks='${JSON.stringify(fallbackChain)}'>
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
        <div class="muted">${city} - ${area}</div>
      </div>
      <button class="gallery-btn" type="button">عرض الصور</button>
    `;
  });
}

function filterHotels(){
  const q = (document.getElementById('q').value || '').toLowerCase().trim();
  const rating = document.getElementById('ratingFilter')?.value || 'all';
  const area = document.getElementById('areaFilter')?.value || 'all';
  const items = document.querySelectorAll('#hotelList .hotel');

  items.forEach(item=>{
    const text = item.innerText.toLowerCase();
    const stars = parseInt(item.dataset.stars || '0', 10);

    const textMatch = text.includes(q);
    const ratingMatch = rating === 'all'
      ? true
      : rating === '5'
        ? stars === 5
        : stars >= 3 && stars <= 4;
    const areaMatch = area === 'all' ? true : (item.dataset.area || '') === area;

    item.style.display = (textMatch && ratingMatch && areaMatch) ? '' : 'none';
  });
}

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxStrip = document.getElementById('lightboxStrip');
let activeImages = [];
let activeIndex = 0;
let activeHotel = '';

function renderThumbs(){
  lightboxStrip.innerHTML = activeImages.map((src, idx) => (
    `<img src="${src}" class="lightbox-thumb ${idx===activeIndex?'active':''}" data-idx="${idx}" loading="lazy" alt="${activeHotel} ${idx+1}">`
  )).join('');
}

function showImage(index){
  activeIndex = (index + activeImages.length) % activeImages.length;
  lightboxImage.src = activeImages[activeIndex];
  lightboxTitle.textContent = `${activeHotel} — صورة ${activeIndex + 1} من ${activeImages.length}`;
  renderThumbs();
}

function openLightbox(hotel, startIndex, cover, candidates=[]){
  activeHotel = hotel;
  activeImages = hotelImages(hotel, cover, candidates);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  showImage(startIndex);
}

function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}

renderHotels();
initAreaFilter();
initMapInteractions();

document.getElementById('hotelList').addEventListener('error', (e) => {
  const img = e.target.closest('.hotel-thumb');
  if(!img) return;

  const fallbacks = JSON.parse(img.dataset.fallbacks || '[]');
  const next = fallbacks.shift();
  img.dataset.fallbacks = JSON.stringify(fallbacks);

  if(next){
    img.src = next;
  }
}, true);

document.getElementById('hotelList').addEventListener('click', (e) => {
  const card = e.target.closest('.hotel');
  if(!card) return;

  const isImageClick = !!e.target.closest('.hotel-thumb');
  const isButtonClick = !!e.target.closest('.gallery-btn');
  if(!isImageClick && !isButtonClick) return;

  const coverSrc = card.querySelector('.hotel-thumb')?.currentSrc || card.querySelector('.hotel-thumb')?.src || '';
  const candidates = JSON.parse(card.querySelector('.hotel-thumb')?.dataset.fallbacks || "[]");
  openLightbox(card.dataset.hotel, 0, coverSrc, candidates);
});

lightboxStrip.addEventListener('click', (e) => {
  const thumb = e.target.closest('.lightbox-thumb');
  if(!thumb) return;
  showImage(parseInt(thumb.dataset.idx, 10));
});

document.getElementById('lightboxPrev').addEventListener('click', () => showImage(activeIndex - 1));
document.getElementById('lightboxNext').addEventListener('click', () => showImage(activeIndex + 1));
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if(e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if(!lightbox.classList.contains('open')) return;
  if(e.key === 'Escape') closeLightbox();
  if(e.key === 'ArrowLeft') showImage(activeIndex + 1);
  if(e.key === 'ArrowRight') showImage(activeIndex - 1);
});
