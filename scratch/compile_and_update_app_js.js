const fs = require('fs');
const path = require('path');

// 1. Load base en and tr
const { en, tr } = require('./base_translations.js');

// 2. Load 13 base languages from build_languages.py
const pyContent = fs.readFileSync(path.join(__dirname, 'build_languages.py'), 'utf8');
const dictStr = pyContent.substring(pyContent.indexOf('languages = {') + 12, pyContent.indexOf('app_js_path =')).trim();
const base13 = JSON.parse(dictStr);

// 3. Load subpages
const part1 = require('./subpage_translations_part1.js');
const part2 = require('./subpage_translations_part2.js');
const subpages = Object.assign({}, part1, part2);

// Assemble all 15 languages
const allTranslations = {
    en: en,
    tr: tr
};

for (const langCode of Object.keys(base13)) {
    allTranslations[langCode] = Object.assign({}, base13[langCode], subpages[langCode] || {});
}

// 4. Audit keys
const requiredKeys = Object.keys(en);
console.log(`Total required keys per language: ${requiredKeys.length}`);

for (const [code, langObj] of Object.entries(allTranslations)) {
    const missing = [];
    for (const key of requiredKeys) {
        if (!langObj[key]) {
            missing.push(key);
            langObj[key] = en[key];
        }
    }
    if (missing.length > 0) {
        console.warn(`[WARN] Language ${code} was missing ${missing.length} keys:`, missing);
    } else {
        console.log(`[OK] Language ${code} has all ${requiredKeys.length} keys!`);
    }
}

// 5. Read current public/app.js
const appJsPath = path.join(__dirname, '../public/app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

// Find where `const translations = {` starts and where `let currentLang = 'en';` starts
const startIndex = appJs.indexOf('const translations = {');
const endIndex = appJs.indexOf('let currentLang =');

if (startIndex === -1 || endIndex === -1) {
    console.error('Could not find translation markers in app.js!');
    process.exit(1);
}

const translationsJs = `const translations = ${JSON.stringify(allTranslations, null, 4)};\n\n`;
let restOfAppJs = appJs.substring(endIndex);

const newApplyLanguageFn = `let currentLang = 'en';

function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    const t = translations[lang] || translations['en'];
    const tEn = translations['en'];

    // Update all text elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = (t && t[key]) || (tEn && tEn[key]);
        if (text !== undefined && text !== null) {
            if (text.includes('<') && text.includes('>')) {
                el.innerHTML = text;
            } else {
                el.textContent = text;
            }
        }
    });

    // Update input placeholders with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const text = (t && t[key]) || (tEn && tEn[key]);
        if (text) {
            el.setAttribute('placeholder', text);
        }
    });

    // Subpage initial button text
    if (typeof btnText !== 'undefined' && btnText) {
        if (window.location.pathname.includes('youtube-mp3-cutter')) {
            btnText.textContent = (t && t.submitBtnMp3) || '🎵 Cut & Download MP3';
        } else if (window.location.pathname.includes('youtube-cutter')) {
            btnText.textContent = (t && t.submitBtnYoutube) || 'Trim & Download MP4';
        } else if (window.location.pathname.includes('tiktok-downloader')) {
            btnText.textContent = (t && t.submitBtnTiktok) || 'Download TikTok HD';
        }
    }

    // Dynamically update document title based on current subpage
    const path = window.location.pathname;
    if (path.includes('youtube-mp3-cutter')) {
        const titleText = (t && t.mp3DocTitle) || (tEn && tEn.mp3DocTitle);
        if (titleText) document.title = titleText;
    } else if (path.includes('youtube-cutter')) {
        const titleText = (t && t.ytDocTitle) || (tEn && tEn.ytDocTitle);
        if (titleText) document.title = titleText;
    } else if (path.includes('tiktok-downloader')) {
        const titleText = (t && t.tkDocTitle) || (tEn && tEn.tkDocTitle);
        if (titleText) document.title = titleText;
    } else if (path === '/' || path === '') {
        const titleText = (t && t.indexDocTitle) || (tEn && tEn.indexDocTitle);
        if (titleText) document.title = titleText;
    }
    
    if (typeof urlInput !== 'undefined' && urlInput) {
        urlInput.dispatchEvent(new Event('input'));
    }
}`;

// Replace the old applyLanguage function
const oldApplyRegex = /let currentLang = 'en';[\s\S]+?function applyLanguage\(lang\) \{[\s\S]+?urlInput\.dispatchEvent\(new Event\('input'\)\);\s*\}\s*\}/;
if (oldApplyRegex.test(restOfAppJs)) {
    restOfAppJs = restOfAppJs.replace(oldApplyRegex, newApplyLanguageFn);
    console.log('Replaced applyLanguage function cleanly!');
}

// Enhance qualityDropdownEl listener to update button text on MP3 selection
restOfAppJs = restOfAppJs.replace(
    /const qualityDropdownEl = document\.getElementById\('quality'\);[\s\S]+?trackGA\('select_quality', \{ quality: e\.target\.value \}\);\s*\}\);\s*\}/,
    `const qualityDropdownEl = document.getElementById('quality');
if (qualityDropdownEl) {
    qualityDropdownEl.addEventListener('change', (e) => {
        const t = translations[currentLang] || translations['en'];
        if (btnText) {
            if (e.target.value === 'mp3') {
                btnText.textContent = t.submitBtnMp3;
            } else if (currentPlatform === 'youtube') {
                btnText.textContent = t.submitBtnYoutube;
            }
        }
        trackGA('select_quality', { quality: e.target.value });
    });
}`
);

// Enhance urlInput YouTube detection to respect MP3 subpage or format
restOfAppJs = restOfAppJs.replace(
    `platformBadge.textContent = t.badgeYoutube;
        platformBadge.className = 'badge youtube';
        btnText.textContent = t.submitBtnYoutube;`,
    `platformBadge.textContent = t.badgeYoutube;
        platformBadge.className = 'badge youtube';
        const qVal = document.getElementById('quality') ? document.getElementById('quality').value : '';
        if (window.location.pathname.includes('youtube-mp3-cutter') || qVal === 'mp3') {
            btnText.textContent = t.submitBtnMp3;
        } else {
            btnText.textContent = t.submitBtnYoutube;
        }`
);

const newAppJs = appJs.substring(0, startIndex) + translationsJs + restOfAppJs;
fs.writeFileSync(appJsPath, newAppJs, 'utf8');
console.log('Successfully recompiled app.js!');
