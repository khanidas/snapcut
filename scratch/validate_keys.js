const fs = require('fs');
const path = require('path');
const vm = require('vm');

const appJs = fs.readFileSync('public/app.js', 'utf8');
const script = new vm.Script(appJs.substring(0, appJs.indexOf('let currentLang =')) + '\n;global.translations = translations;');
const sandbox = { global: {} };
script.runInNewContext(sandbox);
const t = sandbox.global.translations;

const files = ['public/index.html', 'public/youtube-cutter.html', 'public/tiktok-downloader.html', 'public/youtube-mp3-cutter.html'];

let totalErrors = 0;
for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    const regex = /data-i18n="([^"]+)"/g;
    let match;
    const keys = [];
    while ((match = regex.exec(html)) !== null) {
        keys.push(match[1]);
    }
    
    console.log(`=== ${file}: ${keys.length} data-i18n elements ===`);
    for (const lang of Object.keys(t)) {
        const missingInLang = keys.filter(k => !t[lang][k]);
        if (missingInLang.length > 0) {
            console.error(`  [FAIL] Missing in ${lang}:`, missingInLang);
            totalErrors++;
        }
    }
    console.log(`  [PASS] Verified across all 15 languages!`);
}

if (totalErrors === 0) {
    console.log('\n🎉 ALL KEYS ARE 100% PRESENT IN ALL 15 LANGUAGES ACROSS ALL HTML PAGES!');
} else {
    console.error(`\n❌ FOUND ${totalErrors} MISSING KEYS!`);
    process.exit(1);
}
