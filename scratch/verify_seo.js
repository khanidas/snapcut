const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const pages = [
    { file: 'public/index.html', url: '/' },
    { file: 'public/youtube-cutter.html', url: '/youtube-cutter' },
    { file: 'public/youtube-mp3-cutter.html', url: '/youtube-mp3-cutter' },
    { file: 'public/tiktok-downloader.html', url: '/tiktok-downloader' },
    { file: 'public/youtube-ringtone-maker.html', url: '/youtube-ringtone-maker' },
    { file: 'public/youtube-shorts-cutter.html', url: '/youtube-shorts-cutter' },
    { file: 'public/tiktok-sound-downloader.html', url: '/tiktok-sound-downloader' },
    { file: 'public/de/index.html', url: '/de/' },
    { file: 'public/fr/index.html', url: '/fr/' },
    { file: 'public/es/index.html', url: '/es/' }
];

console.log('=== COMPREHENSIVE SEO AUDIT ACROSS ALL 10 PAGES ===\n');

let hasErrors = false;

pages.forEach(p => {
    const fullPath = path.join(ROOT, p.file);
    if (!fs.existsSync(fullPath)) {
        console.error(`❌ File not found: ${p.file}`);
        hasErrors = true;
        return;
    }
    const html = fs.readFileSync(fullPath, 'utf8');
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
    const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : '';
    const desc = descMatch ? descMatch[1] : '';
    const canonical = canonicalMatch ? canonicalMatch[1] : '';
    
    const titleOk = title.length > 20 && title.length <= 60;
    const descOk = desc.length >= 120 && desc.length <= 160;

    console.log(`Page: ${p.url} (${p.file})`);
    console.log(`  Title [${title.length} chars ${titleOk ? '✅' : '⚠️'}]: ${title}`);
    console.log(`  Meta Desc [${desc.length} chars ${descOk ? '✅' : '⚠️'}]: ${desc}`);
    console.log(`  Canonical: ${canonical}`);

    if (!titleOk) console.warn(`  ⚠️ Warning: Title length not ideal: ${title.length}`);
    if (!descOk) console.warn(`  ⚠️ Warning: Desc length not ideal: ${desc.length}`);

    // Images check
    const imgs = html.match(/<img[^>]+>/g) || [];
    imgs.forEach(img => {
        const hasWidth = img.includes('width=');
        const hasHeight = img.includes('height=');
        if (!hasWidth || !hasHeight) {
            console.error(`  ❌ Image missing width or height: ${img}`);
            hasErrors = true;
        }
    });

    // JSON-LD Schema check
    const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    if (schemaMatch) {
        try {
            const parsed = JSON.parse(schemaMatch[1]);
            const types = parsed['@graph'] ? parsed['@graph'].map(g => g['@type']).join(', ') : parsed['@type'];
            console.log(`  Schema JSON-LD: Valid JSON ✅ Types: [${types}]`);
        } catch (e) {
            console.error(`  ❌ Schema JSON-LD Parse Error: ${e.message}`);
            hasErrors = true;
        }
    } else {
        console.warn(`  ⚠️ No JSON-LD schema found!`);
    }

    console.log('');
});

if (hasErrors) {
    console.error('Audit completed with ERRORS! ❌');
    process.exit(1);
} else {
    console.log('All 10 pages passed SEO and structure audit perfectly! ✅');
}
