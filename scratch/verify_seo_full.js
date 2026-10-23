const fs = require('fs');

const files = [
    { file: 'index.html', path: '/' },
    { file: 'youtube-cutter.html', path: '/youtube-cutter' },
    { file: 'youtube-mp3-cutter.html', path: '/youtube-mp3-cutter' },
    { file: 'tiktok-downloader.html', path: '/tiktok-downloader' }
];

console.log('=== COMPREHENSIVE SEO AUDIT REPORT ===\n');

files.forEach(({ file, path }) => {
    const html = fs.readFileSync('public/' + file, 'utf8');
    console.log(`=================== ${file} (${path}) ===================`);
    
    // Title
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1] : '';
    console.log(`Title (${title.length} chars) [Ideal: 50-60]: "${title}"`);
    if (title.length > 60) console.log('  ⚠️ WARNING: Title exceeds 60 characters and will be truncated on Google SERPs.');

    // Meta Description
    const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
    const desc = descMatch ? descMatch[1] : '';
    console.log(`Meta Description (${desc.length} chars) [Ideal: 140-160]: "${desc}"`);
    if (desc.length > 160) console.log('  ⚠️ WARNING: Description exceeds 160 characters and will be truncated on Google.');
    if (desc.length < 120) console.log('  ⚠️ WARNING: Description is too short (<120 chars).');

    // Canonical
    const canonMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
    const canon = canonMatch ? canonMatch[1] : '';
    console.log(`Canonical URL: ${canon}`);

    // Hreflang
    const hreflangs = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
    console.log(`Hreflang Tags count: ${hreflangs.length}`);
    hreflangs.forEach(h => console.log(`  hreflang="${h[1]}" -> ${h[2]}`));

    // OG Tags
    const ogTitle = (html.match(/<meta property="og:title" content="([^"]+)"/) || [])[1];
    const ogDesc = (html.match(/<meta property="og:description" content="([^"]+)"/) || [])[1];
    const ogImage = (html.match(/<meta property="og:image" content="([^"]+)"/) || [])[1];
    const ogUrl = (html.match(/<meta property="og:url" content="([^"]+)"/) || [])[1];
    console.log(`Open Graph:`);
    console.log(`  og:title: "${ogTitle}"`);
    console.log(`  og:desc: "${ogDesc}"`);
    console.log(`  og:image: "${ogImage}"`);
    console.log(`  og:url: "${ogUrl}"`);

    // Images
    const imgs = [...html.matchAll(/<img([^>]+)>/g)];
    console.log(`Images (${imgs.length}):`);
    imgs.forEach(m => {
        const full = m[0];
        const hasAlt = /alt="[^"]+"/.test(full);
        const hasWidth = /width="[^"]+"/.test(full);
        const hasHeight = /height="[^"]+"/.test(full);
        console.log(`  ${full}`);
        if (!hasAlt) console.log('    ❌ Missing alt tag!');
        if (!hasWidth || !hasHeight) console.log('    ⚠️ Missing explicit width/height (causes CLS)!');
    });

    // JSON-LD Schema
    const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    if (ldMatch) {
        try {
            const data = JSON.parse(ldMatch[1]);
            console.log(`JSON-LD Schema parsed: SUCCESS`);
            if (Array.isArray(data)) {
                console.log(`  Root type: Array (${data.length} items)`);
                data.forEach((item, idx) => {
                    console.log(`    Item ${idx + 1}: @type=${item['@type']}, name="${item.name || ''}"`);
                    if (item.aggregateRating) {
                        console.log(`      aggregateRating: value=${item.aggregateRating.ratingValue}, count=${item.aggregateRating.ratingCount}, best=${item.aggregateRating.bestRating || 'MISSING'}, worst=${item.aggregateRating.worstRating || 'MISSING'}`);
                    }
                });
            } else if (data['@graph']) {
                console.log(`  Root type: @graph (${data['@graph'].length} items)`);
            } else {
                console.log(`  Root type: Object (@type=${data['@type']})`);
            }
        } catch (err) {
            console.error(`❌ JSON-LD Schema ERROR: ${err.message}`);
        }
    } else {
        console.log(`❌ Missing JSON-LD schema!`);
    }

    console.log('\n');
});
