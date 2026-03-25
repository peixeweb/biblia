async function test() {
  const query = "jesus";
  const searchRes = await fetch(
    `https://pt.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=3`
  );
  const searchData = await searchRes.json();
  const pages = searchData.query.search;
  
  for (const page of pages) {
    const imgRes = await fetch(
      `https://pt.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(page.title)}&prop=pageimages|images&format=json&origin=*&pithumbsize=600`
    );
    const imgData = await imgRes.json();
    const pageData = Object.values(imgData.query.pages)[0];
    
    if (pageData.thumbnail) {
      console.log(`Title: ${page.title}`);
      console.log(`Thumbnail: ${pageData.thumbnail.source}`);
    }
  }
}
test();
