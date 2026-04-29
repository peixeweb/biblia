import { NextRequest, NextResponse } from 'next/server';

// ─── Curated Wikimedia images for biblical/historical figures ─────────────────
const KNOWN_IMAGES: Record<string, string> = {
  'jesus':               'https://commons.wikimedia.org/wiki/Special:FilePath/Giovanni_Bellini,_Christ_Blessing,_1500.jpg?width=500',
  'jesus cristo':        'https://commons.wikimedia.org/wiki/Special:FilePath/Giovanni_Bellini,_Christ_Blessing,_1500.jpg?width=500',
  'jesus of nazareth':   'https://commons.wikimedia.org/wiki/Special:FilePath/Giovanni_Bellini,_Christ_Blessing,_1500.jpg?width=500',
  'moises':              'https://commons.wikimedia.org/wiki/Special:FilePath/Rembrandt_Harmensz._van_Rijn_079.jpg?width=500',
  'moses':               'https://commons.wikimedia.org/wiki/Special:FilePath/Rembrandt_Harmensz._van_Rijn_079.jpg?width=500',
  'paulo':               'https://commons.wikimedia.org/wiki/Special:FilePath/Saint_Paul_Rembrandt.jpg?width=500',
  'paulo de tarso':      'https://commons.wikimedia.org/wiki/Special:FilePath/Saint_Paul_Rembrandt.jpg?width=500',
  'paul the apostle':    'https://commons.wikimedia.org/wiki/Special:FilePath/Saint_Paul_Rembrandt.jpg?width=500',
  'maria madalena':      'https://commons.wikimedia.org/wiki/Special:FilePath/Guido_Reni_-_Penitent_Magdalene_-_WGA19309.jpg?width=500',
  'mary magdalene':      'https://commons.wikimedia.org/wiki/Special:FilePath/Guido_Reni_-_Penitent_Magdalene_-_WGA19309.jpg?width=500',
  'pedro':               'https://commons.wikimedia.org/wiki/Special:FilePath/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg?width=500',
  'sao pedro':           'https://commons.wikimedia.org/wiki/Special:FilePath/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg?width=500',
  'peter':               'https://commons.wikimedia.org/wiki/Special:FilePath/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg?width=500',
  'saint peter':         'https://commons.wikimedia.org/wiki/Special:FilePath/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg?width=500',
  'maria':               'https://commons.wikimedia.org/wiki/Special:FilePath/Sassoferrato_-_Virgin_in_Prayer.jpg?width=500',
  'virgem maria':        'https://commons.wikimedia.org/wiki/Special:FilePath/Sassoferrato_-_Virgin_in_Prayer.jpg?width=500',
  'mary':                'https://commons.wikimedia.org/wiki/Special:FilePath/Sassoferrato_-_Virgin_in_Prayer.jpg?width=500',
  'joao':                'https://commons.wikimedia.org/wiki/Special:FilePath/San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg?width=500',
  'sao joao':            'https://commons.wikimedia.org/wiki/Special:FilePath/San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg?width=500',
  'john':                'https://commons.wikimedia.org/wiki/Special:FilePath/San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg?width=500',
  'mateus':              'https://commons.wikimedia.org/wiki/Special:FilePath/Rembrandt_-_The_Evangelist_Matthew_and_the_Angel_-_WGA19131.jpg?width=500',
  'matthew':             'https://commons.wikimedia.org/wiki/Special:FilePath/Rembrandt_-_The_Evangelist_Matthew_and_the_Angel_-_WGA19131.jpg?width=500',
  'marcos':              'https://commons.wikimedia.org/wiki/Special:FilePath/The_Apostle_Mark_by_Tintoretto.jpg?width=500',
  'mark':                'https://commons.wikimedia.org/wiki/Special:FilePath/The_Apostle_Mark_by_Tintoretto.jpg?width=500',
  'lucas':               'https://commons.wikimedia.org/wiki/Special:FilePath/Guercino_-_Saint_Luke.jpg?width=500',
  'luke':                'https://commons.wikimedia.org/wiki/Special:FilePath/Guercino_-_Saint_Luke.jpg?width=500',
  'judas':               'https://commons.wikimedia.org/wiki/Special:FilePath/Giotto_-_Scrovegni_-_-31-_-_Kiss_of_Judas.jpg?width=500',
  'abraao':              'https://commons.wikimedia.org/wiki/Special:FilePath/Rembrandt_-_Abraham_and_the_Angels_-_c._1646.jpg?width=500',
  'abraham':             'https://commons.wikimedia.org/wiki/Special:FilePath/Rembrandt_-_Abraham_and_the_Angels_-_c._1646.jpg?width=500',
  'davi':                'https://commons.wikimedia.org/wiki/Special:FilePath/%27David%27_by_Michelangelo_Fir_JBU002.jpg?width=500',
  'david':               'https://commons.wikimedia.org/wiki/Special:FilePath/%27David%27_by_Michelangelo_Fir_JBU002.jpg?width=500',
  'noe':                 'https://commons.wikimedia.org/wiki/Special:FilePath/Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I%2C_The_Deluge.jpg?width=500',
  'noah':                'https://commons.wikimedia.org/wiki/Special:FilePath/Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I%2C_The_Deluge.jpg?width=500',
  'elias':               'https://commons.wikimedia.org/wiki/Special:FilePath/The_Prophet_Elijah_in_the_Desert%2C_by_Washington_Allston.jpg?width=500',
  'elijah':              'https://commons.wikimedia.org/wiki/Special:FilePath/The_Prophet_Elijah_in_the_Desert%2C_by_Washington_Allston.jpg?width=500',
  'joao batista':        'https://commons.wikimedia.org/wiki/Special:FilePath/Leonardo_da_Vinci_-_Saint_John_the_Baptist_-_Louvre.jpg?width=500',
  'john the baptist':    'https://commons.wikimedia.org/wiki/Special:FilePath/Leonardo_da_Vinci_-_Saint_John_the_Baptist_-_Louvre.jpg?width=500',
  'enoque':              'https://commons.wikimedia.org/wiki/Special:FilePath/Tissot_Enoch.jpg?width=500',
  'enoch':               'https://commons.wikimedia.org/wiki/Special:FilePath/Tissot_Enoch.jpg?width=500',
  'book of enoch':       'https://commons.wikimedia.org/wiki/Special:FilePath/Tissot_Enoch.jpg?width=500',
  'livro de enoque':     'https://commons.wikimedia.org/wiki/Special:FilePath/Tissot_Enoch.jpg?width=500',
  'gospel of thomas':    'https://commons.wikimedia.org/wiki/Special:FilePath/Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg?width=500',
  'evangelho de tome':   'https://commons.wikimedia.org/wiki/Special:FilePath/Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg?width=500',
  'tomas':               'https://commons.wikimedia.org/wiki/Special:FilePath/Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg?width=500',
  'salomao':             'https://commons.wikimedia.org/wiki/Special:FilePath/Guercino_King_Solomon.jpg?width=500',
  'solomon':             'https://commons.wikimedia.org/wiki/Special:FilePath/Guercino_King_Solomon.jpg?width=500',
  'jo':                  'https://commons.wikimedia.org/wiki/Special:FilePath/Job_Loubet.jpg?width=500',
  'job':                 'https://commons.wikimedia.org/wiki/Special:FilePath/Job_Loubet.jpg?width=500',
  'jeremias':            'https://commons.wikimedia.org/wiki/Special:FilePath/Michelangelo_-_Sistine_Chapel_ceiling_-_Jeremiah.jpg?width=500',
  'jeremiah':            'https://commons.wikimedia.org/wiki/Special:FilePath/Michelangelo_-_Sistine_Chapel_ceiling_-_Jeremiah.jpg?width=500',
  'isaias':              'https://commons.wikimedia.org/wiki/Special:FilePath/Michelangelo_Sistine_Chapel_ceiling_Isaiah.jpg?width=500',
  'isaiah':              'https://commons.wikimedia.org/wiki/Special:FilePath/Michelangelo_Sistine_Chapel_ceiling_Isaiah.jpg?width=500',
  'tito apostle':        'https://commons.wikimedia.org/wiki/Special:FilePath/St_Titus.jpg?width=500',
  'tito apostolo':       'https://commons.wikimedia.org/wiki/Special:FilePath/St_Titus.jpg?width=500',
  'titus apostle':       'https://commons.wikimedia.org/wiki/Special:FilePath/St_Titus.jpg?width=500',
  'imperador tito':      'https://commons.wikimedia.org/wiki/Special:FilePath/Titus_Bust.jpg?width=500',
  'emperor titus':       'https://commons.wikimedia.org/wiki/Special:FilePath/Titus_Bust.jpg?width=500',
  'tito flavio':         'https://commons.wikimedia.org/wiki/Special:FilePath/Titus_Bust.jpg?width=500',
  'adao':                'https://commons.wikimedia.org/wiki/Special:FilePath/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg?width=500',
  'eva':                 'https://commons.wikimedia.org/wiki/Special:FilePath/Jan_Brueghel_the_Elder_-_The_Garden_of_Eden_with_the_Fall_of_Man.jpg?width=500',
  'isaque':              'https://commons.wikimedia.org/wiki/Special:FilePath/Caravaggio_-_Sacrificio_di_Isacco_-_Uffizi.jpg?width=500',
  'jaco':                'https://commons.wikimedia.org/wiki/Special:FilePath/Rembrandt_-_Jacob_Wrestling_with_the_Angel_-_Google_Art_Project.jpg?width=500',
  'jose':                'https://commons.wikimedia.org/wiki/Special:FilePath/Guido_Reni_-_Saint_Joseph_and_the_Christ_Child_-_WGA19293.jpg?width=500',
  'samuel':              'https://commons.wikimedia.org/wiki/Special:FilePath/Joshua_Reynolds_-_The_Infant_Samuel_-_WGA19349.jpg?width=500',
  'saul':                'https://commons.wikimedia.org/wiki/Special:FilePath/Rembrandt_-_David_and_Saul.jpg?width=500',
  'daniel':              'https://commons.wikimedia.org/wiki/Special:FilePath/Peter_Paul_Rubens_-_Daniel_in_the_Lions%27_Den.jpg?width=500',
  'ester':               'https://commons.wikimedia.org/wiki/Special:FilePath/Edwin_Long_-_Esther.jpg?width=500',
  'biblia':              'https://commons.wikimedia.org/wiki/Special:FilePath/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg?width=500',
  'manuscrito':          'https://commons.wikimedia.org/wiki/Special:FilePath/Great_Isaiah_Scroll.jpg?width=500',
  'pergaminho':          'https://commons.wikimedia.org/wiki/Special:FilePath/Great_Isaiah_Scroll.jpg?width=500',
  'default':             'https://commons.wikimedia.org/wiki/Special:FilePath/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg?width=500',
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

  // ── Redirect to the image ──
  // By redirecting instead of proxying the arrayBuffer, we bypass Node.js fetch 
  // issues (like 400 Bad Request on certain Wikimedia Commons URLs) and avoid 
  // Next.js binary response bugs. The browser will handle the image request 
  // directly, which works universally on mobile and PC without CORS issues for <img> tags.
  return NextResponse.redirect(imageUrl);
}
