from pathlib import Path
import re, json, html

ROOT = Path(__file__).resolve().parents[1]
HOTELS_DIR = ROOT / 'hotels'

STAR_WORD_AR = {'5': 'فاخر','4': 'مريح','3': 'عملي'}
STAR_WORD_EN = {'5': 'luxury','4': 'comfortable','3': 'practical'}

AREA_EN = {
    'شيشلي':'Sisli','تقسيم':'Taksim','فاتح-لالالي':'Fatih-Laleli','لالالي':'Laleli','ليفينت':'Levent','فلوريا':'Florya','توبكابي':'Topkapi','كاراكوي':'Karakoy','بكركوي':'Bakirkoy','بيرم باشا':'Bayrampasa','محمود بيه':'Mahmutbey','ماسلاك':'Maslak','بيشكتاش':'Besiktas','اوتومار':'Ottomare'
}
AMENITIES_EN = {
'واي فاي مجاني في جميع المناطق':'Free Wi-Fi in all areas','مكتب استقبال 24 ساعة':'24-hour front desk','تكييف وتدفئة':'Air conditioning and heating','خدمة تنظيف يومية':'Daily housekeeping','مصعد وغرف عائلية':'Elevator and family rooms','إفطار متنوع يومياً':'Daily breakfast buffet','غرف اجتماعات':'Meeting rooms','خدمة كونسيرج':'Concierge service'
}

def norm(s): return re.sub(r'\s+', ' ', s).strip()
def extract(pattern, text, flags=re.S, default=''):
    m = re.search(pattern, text, flags)
    return m.group(1).strip() if m else default

def marketing_ar(ar_name, area, stars):
    level = STAR_WORD_AR.get(stars, 'مناسب')
    return f"فندق {ar_name} يقع في منطقة {area} في إسطنبول، وهو خيار {level} مناسب للعائلات والمسافرين بغرض السياحة أو العمل، مع موقع عملي وخدمة مريحة طوال الإقامة."

def marketing_en(en_name, area, stars):
    level = STAR_WORD_EN.get(stars, 'good')
    area_en = AREA_EN.get(area, area)
    return f"{en_name} is located in {area_en}, Istanbul, and is a {level} choice for families and travelers, offering a practical location and comfortable service throughout the stay."

for path in sorted(HOTELS_DIR.glob('*.html')):
    t = path.read_text(encoding='utf-8', errors='ignore')
    page_title = extract(r'<title>(.*?)</title>', t) or path.stem
    canonical = extract(r'<link\s+rel="canonical"\s+href="(.*?)"\s*/?>', t) or f'https://www.siafatravel.com/hotels/{path.name}'

    ar_name = norm(extract(r'<section class="detail-card"><h1>(.*?)</h1>', t)) or path.stem
    en_name = norm(extract(r'<section class="detail-card"><h1>.*?</h1><p>(.*?)</p>', t)) or ar_name
    line_info = norm(extract(r'(<p>التصنيف:.*?</p>)', t))
    stars = extract(r'التصنيف:\s*([★]+)', line_info)
    stars_num = str(len(stars)) if stars else extract(r'ratingValue":\s*"(\d)"', t, default='5')
    area = extract(r'المنطقة:\s*([^|<]+)', line_info, default='إسطنبول').strip()
    city = extract(r'المدينة:\s*([^<]+)', line_info, default='إسطنبول').strip()

    whatsapp = extract(r'<a class="btn" href="(https://wa.me/[^"]+)"', t)
    if not whatsapp:
        msg = f"Hello, I need more information about {en_name}"
        whatsapp = f'https://wa.me/905317387785?text={html.escape(msg)}'

    gallery_html = extract(r'<div class="detail-gallery">(.*?)</div>', t)
    image_tags = re.findall(r'<img[^>]+src="([^"]+)"', gallery_html) or [f'../assets/hotels/{path.stem}/cover.jpg']

    amen_ul = extract(r'<ul class="amenities">(.*?)</ul>', t)
    amenities = [norm(x) for x in re.findall(r'<li>(.*?)</li>', amen_ul, re.S)]
    if not amenities:
        amenities = list(AMENITIES_EN.keys())[:6]

    ar_desc = marketing_ar(ar_name, area, stars_num)
    en_desc = marketing_en(en_name, area, stars_num)
    area_en = AREA_EN.get(area, area)
    city_en = 'Istanbul' if city == 'إسطنبول' else city

    stars_out = '★' * int(stars_num or '5')
    gallery_markup = '\n'.join([f'        <img src="{html.escape(src)}" alt="{html.escape(en_name)}" loading="lazy" decoding="async" width="1200" height="800">' for src in image_tags])
    amen_ar = ''.join([f'<li>{html.escape(a)}</li>' for a in amenities])
    amen_en = ''.join([f'<li>{html.escape(AMENITIES_EN.get(a,a))}</li>' for a in amenities])

    out = f'''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{html.escape(page_title)}</title>
  <meta name="description" content="{html.escape(ar_desc)}">
  <link rel="canonical" href="{html.escape(canonical)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{html.escape(page_title)}">
  <meta property="og:description" content="{html.escape(ar_desc)}">
  <meta property="og:url" content="{html.escape(canonical)}">
  <meta property="og:image" content="https://www.siafatravel.com/logo.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{html.escape(page_title)}">
  <meta name="twitter:description" content="{html.escape(ar_desc)}">
  <meta name="twitter:image" content="https://www.siafatravel.com/logo.png">
  <link rel="stylesheet" href="../hotels.css">
  <link rel="stylesheet" href="../hotel-detail.css">
  <style>.language-switcher{{display:flex;justify-content:flex-end;margin-bottom:12px}}.language-switcher select{{padding:4px 6px;border-radius:8px}}html[dir="ltr"] body{{direction:ltr}}</style>
</head>
<body>
  <main class="hotel-detail">
    <div class="language-switcher"><select id="languageSelect"><option value="ar">العربية</option><option value="en">English</option></select></div>
    <div class="top-actions"><a class="btn secondary" href="../hotels.html" id="backBtn">⬅ العودة لقائمة الفنادق</a><a class="btn" href="{html.escape(whatsapp)}" id="infoBtn">معلومات عن الفندق</a></div>
    <section class="detail-card"><h1 id="hotelNameAr">{html.escape(ar_name)}</h1><p id="hotelNameEn">{html.escape(en_name)}</p><p id="metaAr">التصنيف: {stars_out} | المنطقة: {html.escape(area)} | المدينة: {html.escape(city)}</p><p id="metaEn" style="display:none">Rating: {stars_out} | Area: {html.escape(area_en)} | City: {html.escape(city_en)}</p></section>
    <section class="detail-card"><h2 id="imagesTitle">الصور</h2><div class="detail-gallery">\n{gallery_markup}\n    </div></section>
    <section class="detail-card"><h2 id="aboutTitle">تعريف الفندق</h2><p class="hotel-marketing" id="aboutAr">{html.escape(ar_desc)}</p><p class="hotel-marketing" id="aboutEn" style="display:none">{html.escape(en_desc)}</p></section>
    <section class="detail-card"><h2 id="amenTitle">Amenities / الخدمات</h2><ul class="amenities" id="amenAr">{amen_ar}</ul><ul class="amenities" id="amenEn" style="display:none">{amen_en}</ul></section>
    <section class="detail-card"><a class="btn" href="{html.escape(whatsapp)}" id="contactBtn">تواصل على الواتس اب</a></section>
  </main>
<script>
(function(){{
  const sel=document.getElementById('languageSelect');
  const lang=localStorage.getItem('siafaLang')||'ar';
  function apply(l){{
    const en=l==='en';
    document.documentElement.lang=en?'en':'ar';
    document.documentElement.dir=en?'ltr':'rtl';
    sel.value=en?'en':'ar';
    document.getElementById('metaAr').style.display=en?'none':'';
    document.getElementById('metaEn').style.display=en?'':'none';
    document.getElementById('aboutAr').style.display=en?'none':'';
    document.getElementById('aboutEn').style.display=en?'':'none';
    document.getElementById('amenAr').style.display=en?'none':'';
    document.getElementById('amenEn').style.display=en?'':'none';
    document.getElementById('hotelNameAr').textContent=en?{json.dumps(en_name)}:{json.dumps(ar_name)};
    document.getElementById('hotelNameEn').textContent=en?{json.dumps(ar_name)}:{json.dumps(en_name)};
    document.getElementById('backBtn').textContent=en?'⬅ Back to hotels list':'⬅ العودة لقائمة الفنادق';
    document.getElementById('infoBtn').textContent=en?'Hotel information':'معلومات عن الفندق';
    document.getElementById('imagesTitle').textContent=en?'Photos':'الصور';
    document.getElementById('aboutTitle').textContent=en?'Hotel overview':'تعريف الفندق';
    document.getElementById('amenTitle').textContent=en?'Amenities':'Amenities / الخدمات';
    document.getElementById('contactBtn').textContent=en?'Contact on WhatsApp':'تواصل على الواتس اب';
  }}
  apply(lang);
  sel.addEventListener('change',e=>{{localStorage.setItem('siafaLang',e.target.value); apply(e.target.value);}});
}})();
</script>
</body>
</html>'''
    path.write_text(out, encoding='utf-8')

print('Updated', len(list(HOTELS_DIR.glob('*.html'))), 'hotel pages')
