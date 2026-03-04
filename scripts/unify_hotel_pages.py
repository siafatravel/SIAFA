from pathlib import Path
import re, json, html

ROOT = Path(__file__).resolve().parents[1]
HOTELS_DIR = ROOT / 'hotels'

STAR_WORD = {
    '5': 'فاخر',
    '4': 'مريح',
    '3': 'عملي',
}

AREA_HINTS = {
    'شيشلي': 'قرب المولات والمواصلات الرئيسية',
    'تقسيم': 'قرب شارع الاستقلال والحياة النابضة',
    'لاليلي': 'موقع عملي للتسوق وقرب المواصلات',
    'الفاتح': 'قرب المعالم التاريخية في المدينة القديمة',
    'سultanahmet': 'قلب إسطنبول التاريخي',
    'سلطان أحمد': 'قلب إسطنبول التاريخي',
    'فلوريا': 'قرب الواجهة البحرية ومناطق هادئة',
    'ليفنت': 'قرب مراكز الأعمال والمترو',
    'بومونتي': 'موقع مركزي بين شيشلي وتقسيم',
    'توبكابي': 'ربط جيد مع مركز المدينة والمطار',
    'كاراكوي': 'قرب البوسفور والمدينة القديمة',
    'بايرم باشا': 'خيار جيد للوصول السريع للمناطق الحيوية',
    'بكر كوي': 'قرب الساحل ومراكز التسوق',
    'ماسلاك': 'قرب منطقة الأعمال والطريق السريع',
    'المحمودية': 'وصول مناسب لمختلف أحياء إسطنبول',
    'محموت بيه': 'وصول مناسب لمختلف أحياء إسطنبول',
    'بيرا': 'قرب غلاطة وبيوغلو',
    'اوتومار': 'إطلالات بحرية وقرب الطرق الرئيسية',
}


def norm(s):
    return re.sub(r'\s+', ' ', s).strip()


def extract(pattern, text, flags=re.S, default=''):
    m = re.search(pattern, text, flags)
    return m.group(1).strip() if m else default


def marketing(ar_name, area, stars):
    level = STAR_WORD.get(stars, 'مناسب')
    hint = ''
    for k, v in AREA_HINTS.items():
        if k in area:
            hint = v
            break
    if not hint:
        hint = f'الوصول السهل إلى أهم مناطق {area}'
    return (
        f"فندق {ar_name} يقع في منطقة {area} في إسطنبول، وهو خيار {level} "
        f"مناسب للعائلات والمسافرين بغرض السياحة أو العمل. "
        f"يمتاز بموقع يساعد على {hint}، مع مستوى خدمة مريح ومرافق أساسية "
        f"تجعل الإقامة عملية وممتعة طوال الرحلة."
    )


pages = sorted(HOTELS_DIR.glob('*.html'))
desc_map = {}

for path in pages:
    t = path.read_text(encoding='utf-8', errors='ignore')

    page_title = extract(r'<title>(.*?)</title>', t) or path.stem
    desc = extract(r'<meta\s+name="description"\s+content="(.*?)"\s*/?>', t)
    canonical = extract(r'<link\s+rel="canonical"\s+href="(.*?)"\s*/?>', t)

    ar_name = norm(extract(r'<section class="detail-card"><h1>(.*?)</h1>', t)) or path.stem
    en_name = norm(extract(r'<section class="detail-card"><h1>.*?</h1><p>(.*?)</p>', t)) or ar_name
    line_info = norm(extract(r'(<p>التصنيف:.*?</p>)', t))

    stars = extract(r'التصنيف:\s*([★]+)', line_info)
    stars_num = str(len(stars)) if stars else extract(r'ratingValue":\s*"(\d)"', t, default='5')
    area = extract(r'المنطقة:\s*([^|<]+)', line_info, default='إسطنبول')
    city = extract(r'المدينة:\s*([^<]+)', line_info, default='إسطنبول')

    whatsapp = extract(r'<a class="btn" href="(https://wa.me/[^"]+)"', t)
    if not whatsapp:
        whatsapp = f'https://wa.me/905317387785?text={html.escape("مرحبا هل يمكنني الحصول على معلومات اكثر حول فندق " + en_name)}'

    imgs = re.findall(r'<div class="detail-gallery">(.*?)</div>', t, re.S)
    gallery_html = imgs[0] if imgs else ''
    image_tags = re.findall(r'<img[^>]+src="([^"]+)"', gallery_html)
    if not image_tags:
        image_tags = [f'../assets/hotels/{path.stem}/cover.jpg']

    amen_ul = extract(r'<ul class="amenities">(.*?)</ul>', t)
    amenities = re.findall(r'<li>(.*?)</li>', amen_ul, re.S)
    if not amenities:
        amenities = [
            'واي فاي مجاني في جميع المناطق', 'مكتب استقبال 24 ساعة', 'تكييف وتدفئة',
            'خدمة تنظيف يومية', 'مصعد وغرف عائلية', 'إفطار متنوع يومياً'
        ]

    mtext = marketing(ar_name, area.strip(), stars_num)
    desc_map[path.stem] = mtext

    og_desc = desc or f'تعرف على فندق {ar_name} في منطقة {area} بإسطنبول، مع الصور والخدمات الأساسية وطريقة الحجز عبر واتساب.'

    img_json = ', '.join([json.dumps(src) for src in image_tags])
    amenities_json = ', '.join([
        '{"@type": "LocationFeatureSpecification", "name": ' + json.dumps(norm(a)) + ', "value": true}'
        for a in amenities
    ])
    stars_out = '★' * int(stars_num or '5')

    gallery_markup = '\n'.join([
        f'        <img src="{html.escape(src)}" alt="{html.escape(en_name)}" loading="lazy" decoding="async" width="1200" height="800">'
        for src in image_tags
    ])
    amenities_markup = ''.join([f'<li>{html.escape(norm(a))}</li>' for a in amenities])

    out = f'''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{html.escape(page_title)}</title>
  <meta name="description" content="{html.escape(og_desc)}">
  <link rel="canonical" href="{html.escape(canonical)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{html.escape(page_title)}">
  <meta property="og:description" content="{html.escape(og_desc)}">
  <meta property="og:url" content="{html.escape(canonical)}">
  <meta property="og:image" content="https://www.siafatravel.com/logo.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{html.escape(page_title)}">
  <meta name="twitter:description" content="{html.escape(og_desc)}">
  <meta name="twitter:image" content="https://www.siafatravel.com/logo.png">
  <link rel="stylesheet" href="../hotels.css">
  <link rel="stylesheet" href="../hotel-detail.css">
  <script type="application/ld+json">{{"@context": "https://schema.org", "@type": "Hotel", "name": {json.dumps(en_name)}, "url": {json.dumps(canonical)}, "image": [{img_json}], "address": {{"@type": "PostalAddress", "addressLocality": {json.dumps(city.strip())}, "addressCountry": "TR", "streetAddress": {json.dumps(area.strip())}}}, "starRating": {{"@type": "Rating", "ratingValue": {json.dumps(stars_num)}, "bestRating": "5"}}, "amenityFeature": [{amenities_json}]}}</script>
</head>
<body>
  <main class="hotel-detail">
    <div class="top-actions"><a class="btn secondary" href="../hotels.html">⬅ العودة لقائمة الفنادق</a><a class="btn" href="{html.escape(whatsapp)}">معلومات عن الفندق</a></div>
    <section class="detail-card"><h1>{html.escape(ar_name)}</h1><p>{html.escape(en_name)}</p><p>التصنيف: {stars_out} | المنطقة: {html.escape(area.strip())} | المدينة: {html.escape(city.strip())}</p></section>
    <section class="detail-card"><h2>الصور</h2><div class="detail-gallery">
{gallery_markup}
    </div></section>
    <section class="detail-card"><h2>تعريف الفندق</h2><p class="hotel-marketing">{html.escape(mtext)}</p></section>
    <section class="detail-card"><h2>Amenities / الخدمات</h2><ul class="amenities">{amenities_markup}</ul></section>
    <section class="detail-card"><a class="btn" href="{html.escape(whatsapp)}">تواصل على الواتس اب</a></section>
  </main>
</body>
</html>
'''
    path.write_text(out, encoding='utf-8')

(ROOT / 'data' / 'hotel-marketing-ar.json').write_text(
    json.dumps(desc_map, ensure_ascii=False, indent=2), encoding='utf-8'
)

print(f'Updated {len(pages)} hotel pages.')
