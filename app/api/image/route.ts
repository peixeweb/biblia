import { NextRequest, NextResponse } from 'next/server';

// ─── Curated Wikimedia images for biblical/historical figures ─────────────────
// Note: URLs here should ideally be the final upload.wikimedia.org thumb URLs.
// If they fail, the system will fallback to dynamic Wikipedia search.
const KNOWN_IMAGES: Record<string, string> = {
  'jesus':               'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Spas_vsederzhitel_sinay.jpg/500px-Spas_vsederzhitel_sinay.jpg',
  'jesus cristo':        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Spas_vsederzhitel_sinay.jpg/500px-Spas_vsederzhitel_sinay.jpg',
  'jesus of nazareth':   'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rembrandt_Harmensz._van_Rijn_079.jpg/500px-Rembrandt_Harmensz._van_Rijn_079.jpg',
  'moises':              'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Sistine_Chapel_ceiling_-_Moses.jpg/500px-Sistine_Chapel_ceiling_-_Moses.jpg',
  'moses':               'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Sistine_Chapel_ceiling_-_Moses.jpg/500px-Sistine_Chapel_ceiling_-_Moses.jpg',
  'paulo':               'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Saint_Paul_Rembrandt.jpg/500px-Saint_Paul_Rembrandt.jpg',
  'paulo de tarso':      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Saint_Paul_Rembrandt.jpg/500px-Saint_Paul_Rembrandt.jpg',
  'paul the apostle':    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Saint_Paul_Rembrandt.jpg/500px-Saint_Paul_Rembrandt.jpg',
  'maria madalena':      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Guido_Reni_-_Penitent_Magdalene_-_WGA19309.jpg/500px-Guido_Reni_-_Penitent_Magdalene_-_WGA19309.jpg',
  'mary magdalene':      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Guido_Reni_-_Penitent_Magdalene_-_WGA19309.jpg/500px-Guido_Reni_-_Penitent_Magdalene_-_WGA19309.jpg',
  'pedro':               'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg/500px-El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg',
  'sao pedro':           'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg/500px-El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg',
  'peter':               'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg/500px-El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg',
  'saint peter':         'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg/500px-El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg',
  'maria':               'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sassoferrato_-_Virgin_in_Prayer.jpg/500px-Sassoferrato_-_Virgin_in_Prayer.jpg',
  'virgem maria':        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sassoferrato_-_Virgin_in_Prayer.jpg/500px-Sassoferrato_-_Virgin_in_Prayer.jpg',
  'mary':                'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sassoferrato_-_Virgin_in_Prayer.jpg/500px-Sassoferrato_-_Virgin_in_Prayer.jpg',
  'joao':                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg/500px-San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg',
  'sao joao':            'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg/500px-San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg',
  'john':                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg/500px-San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg',
  'mateus':              'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Rembrandt_-_The_Evangelist_Matthew_and_the_Angel_-_WGA19131.jpg/500px-Rembrandt_-_The_Evangelist_Matthew_and_the_Angel_-_WGA19131.jpg',
  'matthew':             'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Rembrandt_-_The_Evangelist_Matthew_and_the_Angel_-_WGA19131.jpg/500px-Rembrandt_-_The_Evangelist_Matthew_and_the_Angel_-_WGA19131.jpg',
  'marcos':              'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/The_Apostle_Mark_by_Tintoretto.jpg/500px-The_Apostle_Mark_by_Tintoretto.jpg',
  'mark':                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/The_Apostle_Mark_by_Tintoretto.jpg/500px-The_Apostle_Mark_by_Tintoretto.jpg',
  'lucas':               'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Guercino_-_Saint_Luke.jpg/500px-Guercino_-_Saint_Luke.jpg',
  'luke':                'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Guercino_-_Saint_Luke.jpg/500px-Guercino_-_Saint_Luke.jpg',
  'judas':               'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Giotto_-_Scrovegni_-_-31-_-_Kiss_of_Judas.jpg/500px-Giotto_-_Scrovegni_-_-31-_-_Kiss_of_Judas.jpg',
  'abraao':              'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rembrandt_-_Abraham_and_the_Angels_-_c._1646.jpg/500px-Rembrandt_-_Abraham_and_the_Angels_-_c._1646.jpg',
  'abraham':             'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rembrandt_-_Abraham_and_the_Angels_-_c._1646.jpg/500px-Rembrandt_-_Abraham_and_the_Angels_-_c._1646.jpg',
  'davi':                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/%27David%27_by_Michelangelo_Fir_JBU002.jpg/500px-%27David%27_by_Michelangelo_Fir_JBU002.jpg',
  'david':               'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/%27David%27_by_Michelangelo_Fir_JBU002.jpg/500px-%27David%27_by_Michelangelo_Fir_JBU002.jpg',
  'noe':                 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I%2C_The_Deluge.jpg/500px-Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I%2C_The_Deluge.jpg',
  'noah':                'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I%2C_The_Deluge.jpg/500px-Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I%2C_The_Deluge.jpg',
  'elias':               'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/The_Prophet_Elijah_in_the_Desert%2C_by_Washington_Allston.jpg/500px-The_Prophet_Elijah_in_the_Desert%2C_by_Washington_Allston.jpg',
  'elijah':              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/The_Prophet_Elijah_in_the_Desert%2C_by_Washington_Allston.jpg/500px-The_Prophet_Elijah_in_the_Desert%2C_by_Washington_Allston.jpg',
  'joao batista':        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Leonardo_da_Vinci_-_Saint_John_the_Baptist_-_Louvre.jpg/500px-Leonardo_da_Vinci_-_Saint_John_the_Baptist_-_Louvre.jpg',
  'john the baptist':    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Leonardo_da_Vinci_-_Saint_John_the_Baptist_-_Louvre.jpg/500px-Leonardo_da_Vinci_-_Saint_John_the_Baptist_-_Louvre.jpg',
  'enoque':              'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Tissot_Enoch.jpg/500px-Tissot_Enoch.jpg',
  'enoch':               'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Tissot_Enoch.jpg/500px-Tissot_Enoch.jpg',
  'book of enoch':       'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Tissot_Enoch.jpg/500px-Tissot_Enoch.jpg',
  'livro de enoque':     'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Tissot_Enoch.jpg/500px-Tissot_Enoch.jpg',
  'salomao':             'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Guercino_King_Solomon.jpg/500px-Guercino_King_Solomon.jpg',
  'solomon':             'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Guercino_King_Solomon.jpg/500px-Guercino_King_Solomon.jpg',
  'jo':                  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Job_Loubet.jpg/500px-Job_Loubet.jpg',
  'job':                 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Job_Loubet.jpg/500px-Job_Loubet.jpg',
  'jeremias':            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Michelangelo_-_Sistine_Chapel_ceiling_-_Jeremiah.jpg/500px-Michelangelo_-_Sistine_Chapel_ceiling_-_Jeremiah.jpg',
  'jeremiah':            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Michelangelo_-_Sistine_Chapel_ceiling_-_Jeremiah.jpg/500px-Michelangelo_-_Sistine_Chapel_ceiling_-_Jeremiah.jpg',
  'isaias':              'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Michelangelo_Sistine_Chapel_ceiling_Isaiah.jpg/500px-Michelangelo_Sistine_Chapel_ceiling_Isaiah.jpg',
  'isaiah':              'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Michelangelo_Sistine_Chapel_ceiling_Isaiah.jpg/500px-Michelangelo_Sistine_Chapel_ceiling_Isaiah.jpg',
  'adao':                'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Jan_Brueghel_the_Elder_-_The_Garden_of_Eden_with_the_Fall_of_Man.jpg/500px-Jan_Brueghel_the_Elder_-_The_Garden_of_Eden_with_the_Fall_of_Man.jpg',
  'eva':                 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Jan_Brueghel_the_Elder_-_The_Garden_of_Eden_with_the_Fall_of_Man.jpg/500px-Jan_Brueghel_the_Elder_-_The_Garden_of_Eden_with_the_Fall_of_Man.jpg',
  'samuel':              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Joshua_Reynolds_-_The_Infant_Samuel_-_WGA19349.jpg/500px-Joshua_Reynolds_-_The_Infant_Samuel_-_WGA19349.jpg',
  'daniel':              'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Peter_Paul_Rubens_-_Daniel_in_the_Lions%27_Den.jpg/500px-Peter_Paul_Rubens_-_Daniel_in_the_Lions%27_Den.jpg',
  'ester':               'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/500px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg',
  'biblia':              'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/500px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg',
  'default':             'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/500px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg',
};

function normalise(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function cleanQuery(q: string): string {
  return q.replace(/^(quem foi|quem era|quem e|o que e|quem seria|me fale sobre|sobre|conte sobre)\s+/i, '').trim();
}

function findKnown(query: string): string | null {
  const nq = normalise(cleanQuery(query));
  
  // Exact match
  for (const [key, url] of Object.entries(KNOWN_IMAGES)) {
    if (normalise(key) === nq) return url;
  }

  // Substring match (longest first to prioritize "joao batista" over "joao")
  const sortedKeys = Object.keys(KNOWN_IMAGES).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (key === 'default') continue;
    if (nq.includes(normalise(key))) {
      return KNOWN_IMAGES[key];
    }
  }

  return null;
}

const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function fetchWikipediaThumb(title: string, lang: 'pt' | 'en'): Promise<string | null> {
  const url = `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&pithumbsize=500&format=json&origin=*`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': BROWSER_UA } });
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
    const res = await fetch(url, { headers: { 'User-Agent': BROWSER_UA } });
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
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${accessKey}&per_page=1&orientation=landscape`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': BROWSER_UA } });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
  } catch { /* ignore */ }
  return null;
}

async function getImageBuffer(url: string) {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': BROWSER_UA },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!response.ok) return null;
    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    return { buffer, contentType };
  } catch {
    return null;
  }
}

// ─── Route — returns image bytes directly (proxy mode) ─────────
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get('q') || '').trim();

  if (!query) {
    return new NextResponse('Query required', { status: 400 });
  }

  // 1. Find the best image URL
  let imageUrl: string | null = findKnown(query);

  if (!imageUrl) imageUrl = await fetchWikipediaThumb(query + ' (Bíblia)', 'pt');
  if (!imageUrl) imageUrl = await searchWikipedia(query + ' personagem bíblico', 'pt');
  if (!imageUrl) imageUrl = await searchWikipedia(query + ' (apóstolo)', 'pt');
  if (!imageUrl) imageUrl = await searchWikipedia(query + ' (profeta)', 'pt');
  if (!imageUrl) imageUrl = await fetchWikipediaThumb(query + ' (Bible)', 'en');
  if (!imageUrl) imageUrl = await searchWikipedia(query + ' biblical figure', 'en');
  if (!imageUrl) imageUrl = await searchWikipedia(query + ' ancient history', 'en');
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

  // Default fallback
  if (!imageUrl) imageUrl = KNOWN_IMAGES['default'];

  // 2. Proxy the image
  let imgData = await getImageBuffer(imageUrl);

  // If the specific URL failed, try dynamic search for the raw query as a last resort
  if (!imgData) {
    const fallbackUrl = await searchWikipedia(query, 'pt') || await searchWikipedia(query, 'en');
    if (fallbackUrl) imgData = await getImageBuffer(fallbackUrl);
  }

  // Final fallback to a very stable URL if everything else failed
  if (!imgData) {
    imgData = await getImageBuffer(KNOWN_IMAGES['default']);
  }

  if (!imgData) {
    return new NextResponse('Image not found', { status: 404 });
  }

  return new NextResponse(imgData.buffer, {
    headers: {
      'Content-Type': imgData.contentType,
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
