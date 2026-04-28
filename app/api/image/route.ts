import { NextRequest, NextResponse } from 'next/server';

// ─── Curated Wikimedia images for biblical/historical figures ─────────────────
const KNOWN_IMAGES: Record<string, string> = {
  'jesus':               'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg/400px-Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg',
  'jesus cristo':        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg/400px-Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg',
  'jesus of nazareth':   'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg/400px-Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg',
  'moises':              'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rembrandt_Harmensz._van_Rijn_079.jpg/400px-Rembrandt_Harmensz._van_Rijn_079.jpg',
  'moses':               'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rembrandt_Harmensz._van_Rijn_079.jpg/400px-Rembrandt_Harmensz._van_Rijn_079.jpg',
  'paulo':               'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Saint_Paul_Rembrandt.jpg/400px-Saint_Paul_Rembrandt.jpg',
  'paulo de tarso':      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Saint_Paul_Rembrandt.jpg/400px-Saint_Paul_Rembrandt.jpg',
  'paul the apostle':    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Saint_Paul_Rembrandt.jpg/400px-Saint_Paul_Rembrandt.jpg',
  'maria madalena':      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Guido_Reni_-_Penitent_Magdalene_-_WGA19309.jpg/400px-Guido_Reni_-_Penitent_Magdalene_-_WGA19309.jpg',
  'mary magdalene':      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Guido_Reni_-_Penitent_Magdalene_-_WGA19309.jpg/400px-Guido_Reni_-_Penitent_Magdalene_-_WGA19309.jpg',
  'pedro':               'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg/400px-El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg',
  'sao pedro':           'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg/400px-El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg',
  'peter':               'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg/400px-El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg',
  'saint peter':         'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg/400px-El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg',
  'maria':               'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sassoferrato_-_Virgin_in_Prayer.jpg/400px-Sassoferrato_-_Virgin_in_Prayer.jpg',
  'virgem maria':        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sassoferrato_-_Virgin_in_Prayer.jpg/400px-Sassoferrato_-_Virgin_in_Prayer.jpg',
  'mary':                'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sassoferrato_-_Virgin_in_Prayer.jpg/400px-Sassoferrato_-_Virgin_in_Prayer.jpg',
  'joao':                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg/400px-San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg',
  'sao joao':            'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg/400px-San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg',
  'john':                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg/400px-San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg',
  'mateus':              'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Rembrandt_-_The_Evangelist_Matthew_and_the_Angel_-_WGA19131.jpg/400px-Rembrandt_-_The_Evangelist_Matthew_and_the_Angel_-_WGA19131.jpg',
  'matthew':             'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Rembrandt_-_The_Evangelist_Matthew_and_the_Angel_-_WGA19131.jpg/400px-Rembrandt_-_The_Evangelist_Matthew_and_the_Angel_-_WGA19131.jpg',
  'marcos':              'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/The_Apostle_Mark_by_Tintoretto.jpg/400px-The_Apostle_Mark_by_Tintoretto.jpg',
  'mark':                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/The_Apostle_Mark_by_Tintoretto.jpg/400px-The_Apostle_Mark_by_Tintoretto.jpg',
  'lucas':               'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Guercino_-_Saint_Luke.jpg/400px-Guercino_-_Saint_Luke.jpg',
  'luke':                'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Guercino_-_Saint_Luke.jpg/400px-Guercino_-_Saint_Luke.jpg',
  'judas':               'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Giotto_-_Scrovegni_-_-31-_-_Kiss_of_Judas.jpg/400px-Giotto_-_Scrovegni_-_-31-_-_Kiss_of_Judas.jpg',
  'abraao':              'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rembrandt_-_Abraham_and_the_Angels_-_c._1646.jpg/400px-Rembrandt_-_Abraham_and_the_Angels_-_c._1646.jpg',
  'abraham':             'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rembrandt_-_Abraham_and_the_Angels_-_c._1646.jpg/400px-Rembrandt_-_Abraham_and_the_Angels_-_c._1646.jpg',
  'davi':                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/%27David%27_by_Michelangelo_Fir_JBU002.jpg/400px-%27David%27_by_Michelangelo_Fir_JBU002.jpg',
  'david':               'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/%27David%27_by_Michelangelo_Fir_JBU002.jpg/400px-%27David%27_by_Michelangelo_Fir_JBU002.jpg',
  'noe':                 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I%2C_The_Deluge.jpg/400px-Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I%2C_The_Deluge.jpg',
  'noah':                'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I%2C_The_Deluge.jpg/400px-Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I%2C_The_Deluge.jpg',
  'elias':               'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/The_Prophet_Elijah_in_the_Desert%2C_by_Washington_Allston.jpg/400px-The_Prophet_Elijah_in_the_Desert%2C_by_Washington_Allston.jpg',
  'elijah':              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/The_Prophet_Elijah_in_the_Desert%2C_by_Washington_Allston.jpg/400px-The_Prophet_Elijah_in_the_Desert%2C_by_Washington_Allston.jpg',
  'joao batista':        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Leonardo_da_Vinci_-_Saint_John_the_Baptist_-_Louvre.jpg/400px-Leonardo_da_Vinci_-_Saint_John_the_Baptist_-_Louvre.jpg',
  'john the baptist':    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Leonardo_da_Vinci_-_Saint_John_the_Baptist_-_Louvre.jpg/400px-Leonardo_da_Vinci_-_Saint_John_the_Baptist_-_Louvre.jpg',
  'enoque':              'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Tissot_Enoch.jpg/400px-Tissot_Enoch.jpg',
  'enoch':               'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Tissot_Enoch.jpg/400px-Tissot_Enoch.jpg',
  'book of enoch':       'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Tissot_Enoch.jpg/400px-Tissot_Enoch.jpg',
  'livro de enoque':     'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Tissot_Enoch.jpg/400px-Tissot_Enoch.jpg',
  'gospel of thomas':    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg/400px-Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg',
  'evangelho de tome':   'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg/400px-Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg',
  'tomas':               'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg/400px-Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg',
  'salomao':             'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Guercino_King_Solomon.jpg/400px-Guercino_King_Solomon.jpg',
  'solomon':             'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Guercino_King_Solomon.jpg/400px-Guercino_King_Solomon.jpg',
  'jo':                  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Job_Loubet.jpg/400px-Job_Loubet.jpg',
  'job':                 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Job_Loubet.jpg/400px-Job_Loubet.jpg',
  'jeremias':            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Michelangelo_-_Sistine_Chapel_ceiling_-_Jeremiah.jpg/400px-Michelangelo_-_Sistine_Chapel_ceiling_-_Jeremiah.jpg',
  'jeremiah':            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Michelangelo_-_Sistine_Chapel_ceiling_-_Jeremiah.jpg/400px-Michelangelo_-_Sistine_Chapel_ceiling_-_Jeremiah.jpg',
  'isaias':              'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Michelangelo_Sistine_Chapel_ceiling_Isaiah.jpg/400px-Michelangelo_Sistine_Chapel_ceiling_Isaiah.jpg',
  'isaiah':              'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Michelangelo_Sistine_Chapel_ceiling_Isaiah.jpg/400px-Michelangelo_Sistine_Chapel_ceiling_Isaiah.jpg',
  'tito apostle':        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/St_Titus.jpg/400px-St_Titus.jpg',
  'tito apostolo':       'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/St_Titus.jpg/400px-St_Titus.jpg',
  'titus apostle':       'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/St_Titus.jpg/400px-St_Titus.jpg',
  'imperador tito':      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Titus_Bust.jpg/400px-Titus_Bust.jpg',
  'emperor titus':       'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Titus_Bust.jpg/400px-Titus_Bust.jpg',
  'tito flavio':         'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Titus_Bust.jpg/400px-Titus_Bust.jpg',
  'adao':                'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/400px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
  'eva':                 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Jan_Brueghel_the_Elder_-_The_Garden_of_Eden_with_the_Fall_of_Man.jpg/400px-Jan_Brueghel_the_Elder_-_The_Garden_of_Eden_with_the_Fall_of_Man.jpg',
  'isaque':              'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Caravaggio_-_Sacrificio_di_Isacco_-_Uffizi.jpg/400px-Caravaggio_-_Sacrificio_di_Isacco_-_Uffizi.jpg',
  'jaco':                'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Rembrandt_-_Jacob_Wrestling_with_the_Angel_-_Google_Art_Project.jpg/400px-Rembrandt_-_Jacob_Wrestling_with_the_Angel_-_Google_Art_Project.jpg',
  'jose':                'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Guido_Reni_-_Saint_Joseph_and_the_Christ_Child_-_WGA19293.jpg/400px-Guido_Reni_-_Saint_Joseph_and_the_Christ_Child_-_WGA19293.jpg',
  'samuel':              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Joshua_Reynolds_-_The_Infant_Samuel_-_WGA19349.jpg/400px-Joshua_Reynolds_-_The_Infant_Samuel_-_WGA19349.jpg',
  'saul':                'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Rembrandt_-_David_and_Saul.jpg/400px-Rembrandt_-_David_and_Saul.jpg',
  'daniel':              'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Peter_Paul_Rubens_-_Daniel_in_the_Lions%27_Den.jpg/400px-Peter_Paul_Rubens_-_Daniel_in_the_Lions%27_Den.jpg',
  'ester':               'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Edwin_Long_-_Esther.jpg/400px-Edwin_Long_-_Esther.jpg',
  'biblia':              'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/400px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg',
  'manuscrito':          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Great_Isaiah_Scroll.jpg/400px-Great_Isaiah_Scroll.jpg',
  'pergaminho':          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Great_Isaiah_Scroll.jpg/400px-Great_Isaiah_Scroll.jpg',
  'default':             'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/400px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg',
};

function normalise(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function cleanQuery(q: string): string {
  return q.replace(/^(quem foi|quem era|quem e|o que e|quem seria|me fale sobre|sobre|conte sobre)\s+/i, '').trim();
}

function findKnown(query: string): string | null {
  const nq = normalise(cleanQuery(query));
  for (const [key, url] of Object.entries(KNOWN_IMAGES)) {
    if (normalise(key) === nq) return url;
  }
  return null;
}

async function fetchWikipediaThumb(title: string, lang: 'pt' | 'en'): Promise<string | null> {
  const url = `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&pithumbsize=500&format=json&origin=*`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'BibliaAcademica/1.0' } });
    if (!res.ok) return null;
    const data = await res.json();
    const pages = data?.query?.pages;
    if (!pages) return null;
    for (const id in pages) {
      const thumb = pages[id]?.thumbnail?.source;
      if (thumb) return thumb;
    }
  } catch { /* ignore */ }
  return null;
}

async function searchWikipedia(query: string, lang: 'pt' | 'en'): Promise<string | null> {
  const url = `https://${lang}.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=2&format=json&origin=*`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'BibliaAcademica/1.0' } });
    if (!res.ok) return null;
    const data = await res.json();
    const titles: string[] = data?.[1] || [];
    for (const title of titles) {
      const thumb = await fetchWikipediaThumb(title, lang);
      if (thumb) return thumb;
    }
  } catch { /* ignore */ }
  return null;
}

async function fetchUnsplash(query: string): Promise<string | null> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) return null;
  // Unsplash search API
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${accessKey}&per_page=1&orientation=landscape`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'BibliaAcademica/1.0' } });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
  } catch { /* ignore */ }
  return null;
}

// ─── Route — returns image bytes directly (no base64, no CORS issues) ─────────
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get('q') || '').trim();

  if (!query) {
    return new NextResponse('Query required', { status: 400 });
  }

  // ── Find the best image URL ──
  let imageUrl: string | null = null;

  imageUrl = findKnown(query);

  if (!imageUrl) imageUrl = await fetchWikipediaThumb(query + ' (Bíblia)', 'pt');
  if (!imageUrl) imageUrl = await searchWikipedia(query + ' personagem bíblico', 'pt');
  if (!imageUrl) imageUrl = await searchWikipedia(query + ' (apóstolo)', 'pt');
  if (!imageUrl) imageUrl = await searchWikipedia(query + ' (profeta)', 'pt');
  if (!imageUrl) imageUrl = await fetchWikipediaThumb(query + ' (Bible)', 'en');
  if (!imageUrl) imageUrl = await searchWikipedia(query + ' biblical figure', 'en');
  if (!imageUrl) imageUrl = await searchWikipedia(query + ' (apostle)', 'en');
  if (!imageUrl) imageUrl = await searchWikipedia(query + ' (prophet)', 'en');
  if (!imageUrl) imageUrl = await searchWikipedia(query + ' ancient history', 'en');

  // Unsplash Fallback
  if (!imageUrl) imageUrl = await fetchUnsplash(query + ' bible');
  if (!imageUrl) imageUrl = await fetchUnsplash(query + ' religion');

  // First-word fallback
  if (!imageUrl) {
    const firstWord = query.split(/[\s,.-]/)[0];
    if (firstWord && firstWord.length > 2 && normalise(firstWord) !== normalise(query)) {
      imageUrl = findKnown(firstWord)
        ?? await fetchWikipediaThumb(firstWord + ' (Bible)', 'en')
        ?? await fetchWikipediaThumb(firstWord + ' (Bíblia)', 'pt');
    }
  }

  // Always fall back to the Bible image
  if (!imageUrl) imageUrl = KNOWN_IMAGES['default'];

  // ── Proxy the image bytes through the server ──
  // This avoids ALL browser CORS/hotlinking issues on mobile and PC.
  try {
    const imgRes = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BibliaAcademica/1.0; +https://biblia.app)',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
      },
    });

    if (!imgRes.ok) {
      // If the specific URL fails, try the default fallback
      const fallback = await fetch(KNOWN_IMAGES['default'], {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BibliaAcademica/1.0)' },
      });
      if (!fallback.ok) return new NextResponse('Image unavailable', { status: 503 });
      const buf = await fallback.arrayBuffer();
      return new NextResponse(buf, {
        status: 200,
        headers: {
          'Content-Type': fallback.headers.get('content-type') || 'image/jpeg',
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const buffer = await imgRes.arrayBuffer();
    const contentType = imgRes.headers.get('content-type') || 'image/jpeg';

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    console.error('[image] proxy failed:', err);
    return new NextResponse('Image unavailable', { status: 503 });
  }
}
