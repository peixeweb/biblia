import { NextRequest, NextResponse } from 'next/server';

// ─── Curated Wikimedia images for biblical/historical figures ─────────────────
const KNOWN_IMAGES: Record<string, string> = {
  // Jesus
  'jesus':       'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg/500px-Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg',
  'jesus cristo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg/500px-Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg',
  'jesus of nazareth': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg/500px-Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg',
  'jesus nazareth': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg/500px-Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg',

  // Moses
  'moises':   'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rembrandt_Harmensz._van_Rijn_079.jpg/500px-Rembrandt_Harmensz._van_Rijn_079.jpg',
  'moses':    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rembrandt_Harmensz._van_Rijn_079.jpg/500px-Rembrandt_Harmensz._van_Rijn_079.jpg',

  // Paul
  'paulo':        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Saint_Paul_Rembrandt.jpg/500px-Saint_Paul_Rembrandt.jpg',
  'paulo de tarso': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Saint_Paul_Rembrandt.jpg/500px-Saint_Paul_Rembrandt.jpg',
  'paul the apostle': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Saint_Paul_Rembrandt.jpg/500px-Saint_Paul_Rembrandt.jpg',

  // Titus / Tito
  'tito': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Titus_Massimo.jpg/500px-Titus_Massimo.jpg',
  'tito flavio': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Titus_Massimo.jpg/500px-Titus_Massimo.jpg',
  'titus (roman emperor)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Titus_Massimo.jpg/500px-Titus_Massimo.jpg',

  // Mary Magdalene
  'maria madalena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Guido_Reni_-_Penitent_Magdalene_-_WGA19309.jpg/500px-Guido_Reni_-_Penitent_Magdalene_-_WGA19309.jpg',
  'mary magdalene': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Guido_Reni_-_Penitent_Magdalene_-_WGA19309.jpg/500px-Guido_Reni_-_Penitent_Magdalene_-_WGA19309.jpg',

  // Peter / Pedro
  'pedro':        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg/500px-El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg',
  'sao pedro':  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg/500px-El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg',
  'peter':        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg/500px-El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg',
  'saint peter': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg/500px-El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg',

  // Mary / Maria
  'maria': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sassoferrato_-_Virgin_in_Prayer.jpg/500px-Sassoferrato_-_Virgin_in_Prayer.jpg',
  'virgem maria': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sassoferrato_-_Virgin_in_Prayer.jpg/500px-Sassoferrato_-_Virgin_in_Prayer.jpg',
  'mary': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sassoferrato_-_Virgin_in_Prayer.jpg/500px-Sassoferrato_-_Virgin_in_Prayer.jpg',

  // John / João
  'joao': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg/500px-San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg',
  'sao joao': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg/500px-San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg',
  'john': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg/500px-San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg',

  // Matthew / Mateus
  'mateus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Rembrandt_-_The_Evangelist_Matthew_and_the_Angel_-_WGA19131.jpg/500px-Rembrandt_-_The_Evangelist_Matthew_and_the_Angel_-_WGA19131.jpg',
  'matthew': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Rembrandt_-_The_Evangelist_Matthew_and_the_Angel_-_WGA19131.jpg/500px-Rembrandt_-_The_Evangelist_Matthew_and_the_Angel_-_WGA19131.jpg',

  // Abraham
  'abraao':    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rembrandt_-_Abraham_and_the_Angels_-_c._1646.jpg/500px-Rembrandt_-_Abraham_and_the_Angels_-_c._1646.jpg',
  'abraham':   'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rembrandt_-_Abraham_and_the_Angels_-_c._1646.jpg/500px-Rembrandt_-_Abraham_and_the_Angels_-_c._1646.jpg',

  // David
  'davi':   'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/%27David%27_by_Michelangelo_Fir_JBU002.jpg/500px-%27David%27_by_Michelangelo_Fir_JBU002.jpg',
  'david':  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/%27David%27_by_Michelangelo_Fir_JBU002.jpg/500px-%27David%27_by_Michelangelo_Fir_JBU002.jpg',

  // Bible / generic
  'biblia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/500px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg',
  'bible':  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/500px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg',
  'default': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/500px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function normalise(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

const IMAGE_QUERY_ALIAS_RULES: Array<[RegExp, string]> = [
  [/^(?:quem\s+foi|quem\s+e|quem\s+é|quem\s+era|que\s+foi|o\s+que\s+é|o\s+que\s+foi|a\s+historia\s+de|a\s+história\s+de|historia\s+de|história\s+de|detalhes\s+sobre|informacoes\s+sobre|informações\s+sobre|sobre)\s+/i, ''],
];

function normalizeImageQuery(query: string): string {
  return query
    .replace(/[?!.]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripSearchPreamble(query: string): string {
  let stripped = normalizeImageQuery(query);
  for (const [pattern, replacement] of IMAGE_QUERY_ALIAS_RULES) {
    stripped = stripped.replace(pattern, replacement).trim();
  }
  return stripped;
}

function isRomanGeneralTitusQuery(query: string) {
  const q = normalizeImageQuery(query).toLowerCase();
  return q.includes('tito') && /\b(general|imperador|romano|flavio|flávio|comandante|governador|consul|cônsul|senador|tribuno|legiao|legião|flavius)\b/.test(q) && !/\b(apostolo|apóstolo|bispo|discipulo|discípulo|igreja|biblia)\b/.test(q);
}

function isBiblicalApostleTitusQuery(query: string) {
  const q = normalizeImageQuery(query).toLowerCase();
  return q.includes('tito') && !isRomanGeneralTitusQuery(q);
}

function resolveImageQuery(query: string): string {
  const stripped = stripSearchPreamble(query);
  if (isRomanGeneralTitusQuery(stripped)) {
    return 'Titus (Roman emperor)';
  }
  if (isBiblicalApostleTitusQuery(stripped)) {
    return 'Titus (apostle)';
  }
  return stripped;
}

function findKnown(query: string): string | null {
  const nq = normalise(query);
  
  // Try exact match in map
  if (KNOWN_IMAGES[nq]) return KNOWN_IMAGES[nq];

  // Try partial match
  const sortedKeys = Object.keys(KNOWN_IMAGES).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (key === 'default') continue;
    if (nq.includes(key)) return KNOWN_IMAGES[key];
  }
  
  return null;
}

async function fetchWikipediaThumb(title: string, lang: 'pt' | 'en'): Promise<string | null> {
  const url = `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&pithumbsize=600&format=json&origin=*`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': BROWSER_UA }, signal: AbortSignal.timeout(5000) });
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
  const url = `https://${lang}.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=3&format=json&origin=*`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': BROWSER_UA }, signal: AbortSignal.timeout(5000) });
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

async function searchUnsplash(query: string): Promise<string | null> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) return null;
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${accessKey}&per_page=1&orientation=landscape`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': BROWSER_UA }, signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.results?.[0]?.urls?.regular) return data.results[0].urls.regular;
  } catch { /* ignore */ }
  return null;
}

async function getImageBuffer(url: string) {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': BROWSER_UA },
      next: { revalidate: 86400 } // Cache for 24 hours
    });
    if (!response.ok) return null;
    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    return { buffer, contentType };
  } catch {
    return null;
  }
}

// ─── Route ─────────────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const raw = (searchParams.get('q') || '').trim();
  if (!raw) return new NextResponse('Query required', { status: 400 });

  const effectiveQuery = resolveImageQuery(raw);
  const stripped = stripSearchPreamble(raw);

  // 1. Try Known Images Map
  let imageUrl = findKnown(stripped);

  // 2. Wikipedia (Bible Context)
  if (!imageUrl) {
    imageUrl = await searchWikipedia(effectiveQuery + ' (Bíblia)', 'pt')
      || await searchWikipedia(effectiveQuery + ' (apóstolo)', 'pt')
      || await searchWikipedia(effectiveQuery + ' bíblico', 'pt')
      || await fetchWikipediaThumb(effectiveQuery, 'pt')
      || await searchWikipedia(effectiveQuery + ' (Bible)', 'en')
      || await fetchWikipediaThumb(effectiveQuery, 'en');
  }

  // 3. Unsplash Fallback
  if (!imageUrl) {
    imageUrl = await searchUnsplash(stripped + ' biblical painting')
      || await searchUnsplash(stripped + ' religion');
  }

  // 4. Default
  if (!imageUrl) imageUrl = KNOWN_IMAGES['default'];

  // Proxy the image
  let imgData = await getImageBuffer(imageUrl);
  
  if (!imgData) {
    // Last ditch effort: direct search without context
    const lastResort = await searchWikipedia(stripped, 'pt') || await searchWikipedia(stripped, 'en');
    if (lastResort) imgData = await getImageBuffer(lastResort);
  }

  if (!imgData) {
    imgData = await getImageBuffer(KNOWN_IMAGES['default']);
  }

  if (!imgData) return new NextResponse('Not found', { status: 404 });

  return new NextResponse(imgData.buffer, {
    headers: {
      'Content-Type': imgData.contentType,
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
