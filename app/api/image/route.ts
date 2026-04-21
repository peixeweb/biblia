import { NextRequest, NextResponse } from 'next/server';

// ─── Known high-quality Wikimedia images for common biblical figures ──────────
const KNOWN_IMAGES: Record<string, string> = {
  // Jesus
  jesus:       'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg/400px-Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg',
  'jesus cristo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg/400px-Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg',
  'jesus of nazareth': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg/400px-Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg',
  'jesus nazareth': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg/400px-Giovanni_Bellini%2C_Christ_Blessing%2C_1500.jpg',

  // Moses
  moisés:   'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rembrandt_Harmensz._van_Rijn_079.jpg/400px-Rembrandt_Harmensz._van_Rijn_079.jpg',
  moises:   'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rembrandt_Harmensz._van_Rijn_079.jpg/400px-Rembrandt_Harmensz._van_Rijn_079.jpg',
  moses:    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rembrandt_Harmensz._van_Rijn_079.jpg/400px-Rembrandt_Harmensz._van_Rijn_079.jpg',

  // Paul
  paulo:        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Saint_Paul_Rembrandt.jpg/400px-Saint_Paul_Rembrandt.jpg',
  'paulo de tarso': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Saint_Paul_Rembrandt.jpg/400px-Saint_Paul_Rembrandt.jpg',
  'paul the apostle': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Saint_Paul_Rembrandt.jpg/400px-Saint_Paul_Rembrandt.jpg',
  'paul of tarsus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Saint_Paul_Rembrandt.jpg/400px-Saint_Paul_Rembrandt.jpg',

  // Mary Magdalene
  'maria madalena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Guido_Reni_-_Penitent_Magdalene_-_WGA19309.jpg/400px-Guido_Reni_-_Penitent_Magdalene_-_WGA19309.jpg',
  'mary magdalene': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Guido_Reni_-_Penitent_Magdalene_-_WGA19309.jpg/400px-Guido_Reni_-_Penitent_Magdalene_-_WGA19309.jpg',

  // Peter / Pedro
  pedro:        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg/400px-El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg',
  'são pedro':  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg/400px-El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg',
  peter:        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg/400px-El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg',
  'saint peter': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg/400px-El_Greco_-_Saint_Peter_-_Google_Art_Project.jpg',

  // Mary / Maria
  maria: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sassoferrato_-_Virgin_in_Prayer.jpg/400px-Sassoferrato_-_Virgin_in_Prayer.jpg',
  'virgem maria': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sassoferrato_-_Virgin_in_Prayer.jpg/400px-Sassoferrato_-_Virgin_in_Prayer.jpg',
  mary: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sassoferrato_-_Virgin_in_Prayer.jpg/400px-Sassoferrato_-_Virgin_in_Prayer.jpg',

  // John the Apostle / João
  joão: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg/400px-San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg',
  'são joão': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg/400px-San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg',
  john: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg/400px-San_Juan_Evangelista_en_Patmos_%28Vel%C3%A1zquez%29.jpg',

  // Matthew / Mateus
  mateus: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Rembrandt_-_The_Evangelist_Matthew_and_the_Angel_-_WGA19131.jpg/400px-Rembrandt_-_The_Evangelist_Matthew_and_the_Angel_-_WGA19131.jpg',
  matthew: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Rembrandt_-_The_Evangelist_Matthew_and_the_Angel_-_WGA19131.jpg/400px-Rembrandt_-_The_Evangelist_Matthew_and_the_Angel_-_WGA19131.jpg',

  // Mark / Marcos
  marcos: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/The_Apostle_Mark_by_Tintoretto.jpg/400px-The_Apostle_Mark_by_Tintoretto.jpg',
  mark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/The_Apostle_Mark_by_Tintoretto.jpg/400px-The_Apostle_Mark_by_Tintoretto.jpg',

  // Luke / Lucas
  lucas: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Guercino_-_Saint_Luke.jpg/400px-Guercino_-_Saint_Luke.jpg',
  luke: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Guercino_-_Saint_Luke.jpg/400px-Guercino_-_Saint_Luke.jpg',

  // Judas
  judas: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Giotto_-_Scrovegni_-_-31-_-_Kiss_of_Judas.jpg/400px-Giotto_-_Scrovegni_-_-31-_-_Kiss_of_Judas.jpg',


  // Abraham
  abraão:    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rembrandt_-_Abraham_and_the_Angels_-_c._1646.jpg/400px-Rembrandt_-_Abraham_and_the_Angels_-_c._1646.jpg',
  abraham:   'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rembrandt_-_Abraham_and_the_Angels_-_c._1646.jpg/400px-Rembrandt_-_Abraham_and_the_Angels_-_c._1646.jpg',

  // David
  davi:   'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/%27David%27_by_Michelangelo_Fir_JBU002.jpg/400px-%27David%27_by_Michelangelo_Fir_JBU002.jpg',
  david:  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/%27David%27_by_Michelangelo_Fir_JBU002.jpg/400px-%27David%27_by_Michelangelo_Fir_JBU002.jpg',

  // Noah
  noé:   'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I%2C_The_Deluge.jpg/400px-Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I%2C_The_Deluge.jpg',
  noah:  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I%2C_The_Deluge.jpg/400px-Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I%2C_The_Deluge.jpg',

  // Elijah
  elias:  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/The_Prophet_Elijah_in_the_Desert%2C_by_Washington_Allston.jpg/400px-The_Prophet_Elijah_in_the_Desert%2C_by_Washington_Allston.jpg',
  elijah: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/The_Prophet_Elijah_in_the_Desert%2C_by_Washington_Allston.jpg/400px-The_Prophet_Elijah_in_the_Desert%2C_by_Washington_Allston.jpg',

  // John the Baptist
  'joão batista': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Leonardo_da_Vinci_-_Saint_John_the_Baptist_-_Louvre.jpg/400px-Leonardo_da_Vinci_-_Saint_John_the_Baptist_-_Louvre.jpg',
  'john the baptist': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Leonardo_da_Vinci_-_Saint_John_the_Baptist_-_Louvre.jpg/400px-Leonardo_da_Vinci_-_Saint_John_the_Baptist_-_Louvre.jpg',

  // Enoch / Enoque
  enoque: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Tissot_Enoch.jpg/400px-Tissot_Enoch.jpg',
  enoch:  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Tissot_Enoch.jpg/400px-Tissot_Enoch.jpg',
  'book of enoch': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Tissot_Enoch.jpg/400px-Tissot_Enoch.jpg',
  'livro de enoque': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Tissot_Enoch.jpg/400px-Tissot_Enoch.jpg',

  // Thomas / Tomé
  'gospel of thomas': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg/400px-Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg',
  'evangelho de tomé': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg/400px-Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg',
  tomás: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg/400px-Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg',

  // Solomon
  salomão: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Guercino_King_Solomon.jpg/400px-Guercino_King_Solomon.jpg',
  solomon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Guercino_King_Solomon.jpg/400px-Guercino_King_Solomon.jpg',

  // Job
  jó:  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Job_Loubet.jpg/400px-Job_Loubet.jpg',
  job: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Job_Loubet.jpg/400px-Job_Loubet.jpg',

  // Jeremiah
  jeremias:  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Michelangelo_-_Sistine_Chapel_ceiling_-_Jeremiah.jpg/400px-Michelangelo_-_Sistine_Chapel_ceiling_-_Jeremiah.jpg',
  jeremiah:  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Michelangelo_-_Sistine_Chapel_ceiling_-_Jeremiah.jpg/400px-Michelangelo_-_Sistine_Chapel_ceiling_-_Jeremiah.jpg',

  // Isaiah
  isaías:  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Michelangelo_Sistine_Chapel_ceiling_Isaiah.jpg/400px-Michelangelo_Sistine_Chapel_ceiling_Isaiah.jpg',
  isaiah:  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Michelangelo_Sistine_Chapel_ceiling_Isaiah.jpg/400px-Michelangelo_Sistine_Chapel_ceiling_Isaiah.jpg',

  // Noah's Ark / Ark
  'arca de noé': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I%2C_The_Deluge.jpg/400px-Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I%2C_The_Deluge.jpg',
  "noah's ark": 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I%2C_The_Deluge.jpg/400px-Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I%2C_The_Deluge.jpg',

  // Bible / generic
  bíblia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/400px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg',
  biblia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/400px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg',
  bible:  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/400px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function normalise(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function findKnown(query: string): string | null {
  const nq = normalise(query);

  // Exact match
  for (const [key, url] of Object.entries(KNOWN_IMAGES)) {
    if (normalise(key) === nq) return url;
  }

  // Partial match (query contains key or key contains query)
  for (const [key, url] of Object.entries(KNOWN_IMAGES)) {
    const nk = normalise(key);
    if (nq.includes(nk) || nk.includes(nq)) return url;
  }

  return null;
}

async function fetchWikipediaThumb(title: string, lang: 'pt' | 'en'): Promise<string | null> {
  const url = `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&pithumbsize=500&format=json&origin=*`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
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
  // Use Wikipedia's opensearch to find the best article title, then fetch its image
  const url = `https://${lang}.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=3&format=json&origin=*`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) return null;
    const data = await res.json();
    const titles: string[] = data?.[1] || [];
    for (const title of titles.slice(0, 3)) {
      const thumb = await fetchWikipediaThumb(title, lang);
      if (thumb) return thumb;
    }
  } catch { /* ignore */ }
  return null;
}

// ─── Route ─────────────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get('q') || '';
  const query = raw.trim();

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    // ── Strategy 1: Check known images map — fetch & convert to base64 ──
    const known = findKnown(query);
    if (known) {
      try {
        const knownRes = await fetch(known, {
          signal: AbortSignal.timeout(8000),
          headers: { 'User-Agent': 'BibliaAcademica/1.0 (educational project)' },
        });
        if (knownRes.ok) {
          const buf = await knownRes.arrayBuffer();
          const b64 = Buffer.from(buf).toString('base64');
          const ct = knownRes.headers.get('content-type') || 'image/jpeg';
          return NextResponse.json({
            imageUrl: `data:${ct};base64,${b64}`,
            title: query,
            source: 'known-base64',
          });
        }
      } catch { /* fall through to Wikipedia strategies */ }
    }

    // ── Strategy 2: Direct Wikipedia PT lookup ──
    let imageUrl = await fetchWikipediaThumb(query, 'pt');

    // ── Strategy 3: OpenSearch PT (fuzzy title match) with Bible context ──
    if (!imageUrl) {
      // First try with biblical context to avoid random matches like municipalities (e.g. for "Pedro")
      imageUrl = await searchWikipedia(query + ' (apóstolo)', 'pt');
      if (!imageUrl) imageUrl = await searchWikipedia(query + ' (Bíblia)', 'pt');
      if (!imageUrl) imageUrl = await searchWikipedia(query + ' personagem bíblico', 'pt');
      // If none of those work, try the query alone
      if (!imageUrl) imageUrl = await searchWikipedia(query, 'pt');
    }

    // ── Strategy 4: Direct Wikipedia EN lookup ──
    if (!imageUrl) {
      imageUrl = await fetchWikipediaThumb(query, 'en');
    }

    // ── Strategy 5: OpenSearch EN (fuzzy title match) with Bible context ──
    if (!imageUrl) {
      imageUrl = await searchWikipedia(query + ' (apostle)', 'en');
      if (!imageUrl) imageUrl = await searchWikipedia(query + ' (Bible)', 'en');
      if (!imageUrl) imageUrl = await searchWikipedia(query, 'en');
    }

    // ── Strategy 6: Try first word only (e.g. "Jesus de Nazaré" → "Jesus") ──
    if (!imageUrl) {
      const firstWord = query.split(/[\s,.-]/)[0];
      if (firstWord && firstWord.length > 2 && firstWord.toLowerCase() !== query.toLowerCase()) {
        const knownFirst = findKnown(firstWord);
        if (knownFirst) {
          return NextResponse.json({ imageUrl: knownFirst, title: firstWord, source: 'known-first' });
        }
        imageUrl = await fetchWikipediaThumb(firstWord, 'en')
          ?? await fetchWikipediaThumb(firstWord, 'pt');
      }
    }

    if (!imageUrl) {
      return NextResponse.json({ error: 'No image found' }, { status: 404 });
    }

    // Stream the image as base64 to avoid CORS issues on the client
    const imgRes = await fetch(imageUrl, { signal: AbortSignal.timeout(8000) });
    if (!imgRes.ok) {
      // Return the URL directly as fallback (client fetches it)
      return NextResponse.json({ imageUrl, title: query, source: 'wikipedia-url' });
    }

    const buffer = await imgRes.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const contentType = imgRes.headers.get('content-type') || 'image/jpeg';

    return NextResponse.json({
      imageUrl: `data:${contentType};base64,${base64}`,
      title: query,
      source: 'wikipedia-base64',
    });

  } catch (error) {
    console.error('[image] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
}