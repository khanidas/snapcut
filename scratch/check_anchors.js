const fs = require('fs');

const files = ['index.html', 'youtube-cutter.html', 'youtube-mp3-cutter.html', 'tiktok-downloader.html'];

files.forEach(f => {
    const html = fs.readFileSync('public/' + f, 'utf8');
    const links = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
    const ids = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
    
    console.log(`=== ${f} ===`);
    links.forEach(link => {
        if (link.startsWith('#')) {
            const anchor = link.substring(1);
            if (!ids.includes(anchor)) {
                console.log(`  ❌ BROKEN ANCHOR: href="${link}" but no element with id="${anchor}" in ${f}!`);
            }
        }
    });
});
console.log('\nAnchor check completed!');
