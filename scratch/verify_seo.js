const fs = require('fs');
const files = ['index.html', 'youtube-cutter.html', 'youtube-mp3-cutter.html', 'tiktok-downloader.html'];

console.log('=== SEO METRICS VERIFICATION ===\n');
files.forEach(f => {
    const html = fs.readFileSync('public/' + f, 'utf8');
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : '';
    const desc = descMatch ? descMatch[1] : '';
    const imgs = html.match(/<img[^>]+>/g) || [];
    
    console.log(`Page: /${f === 'index.html' ? '' : f.replace('.html', '')}`);
    console.log(`  Title [${title.length} chars, Ideal: <60]: ${title}`);
    console.log(`  Meta Desc [${desc.length} chars, Ideal: <160]: ${desc}`);
    console.log(`  Images found (${imgs.length}):`);
    imgs.forEach(img => console.log('    ' + img));
    console.log('');
});
