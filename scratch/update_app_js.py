import re

APP_JS = r"c:\androidprojeler\youtubetiktokindirici\public\app.js"

with open(APP_JS, "r", encoding="utf-8") as f:
    content = f.read()

# Add translation keys for each language
trans_additions = {
    "en": {
        "navMp3": "🎵 MP3 Cutter",
        "optMp3": "🎵 MP3 Audio (Ultra Fast & Lightweight)",
        "shareClipBtn": "🔗 Share Clip Link",
        "shareCopied": "✅ Clip link copied to clipboard!"
    },
    "tr": {
        "navMp3": "🎵 MP3 Kesici",
        "optMp3": "🎵 MP3 Ses (Ultra Hızlı & Zil Sesi)",
        "shareClipBtn": "🔗 Bu Kesiti Paylaş",
        "shareCopied": "✅ Kesit linki kopyalandı!"
    },
    "es": {
        "navMp3": "🎵 Cortador MP3",
        "optMp3": "🎵 Audio MP3 (Ultra Rápido y Ligero)",
        "shareClipBtn": "🔗 Compartir Clip",
        "shareCopied": "✅ ¡Enlace copiado al portapapeles!"
    },
    "fr": {
        "navMp3": "🎵 Découpeur MP3",
        "optMp3": "🎵 Audio MP3 (Ultra Rapide & Léger)",
        "shareClipBtn": "🔗 Partager le Clip",
        "shareCopied": "✅ Lien copié dans le presse-papiers !"
    },
    "de": {
        "navMp3": "🎵 MP3 Schneider",
        "optMp3": "🎵 MP3 Audio (Ultra Schnell & Leicht)",
        "shareClipBtn": "🔗 Clip-Link Teilen",
        "shareCopied": "✅ Clip-Link in Zwischenablage kopiert!"
    },
    "ar": {
        "navMp3": "🎵 قاطع MP3",
        "optMp3": "🎵 صوت MP3 (فائق السرعة وخفيف)",
        "shareClipBtn": "🔗 مشاركة رابط المقطع",
        "shareCopied": "✅ تم نسخ الرابط إلى الحافظة!"
    },
    "hi": {
        "navMp3": "🎵 MP3 कटर",
        "optMp3": "🎵 MP3 ऑडियो (अत्यंत तेज़ और हल्का)",
        "shareClipBtn": "🔗 क्लिप लिंक शेयर करें",
        "shareCopied": "✅ क्लिप लिंक कॉपी हो गया!"
    },
    "zh": {
        "navMp3": "🎵 MP3 剪辑器",
        "optMp3": "🎵 MP3 音频（超快且轻巧）",
        "shareClipBtn": "🔗 分享剪辑链接",
        "shareCopied": "✅ 剪辑链接已复制到剪贴板！"
    }
}

for lang, kvs in trans_additions.items():
    # Find lang: { ... }
    pattern = rf'({lang}\s*:\s*\{{)'
    add_lines = "".join([f'\n        {k}: "{v}",' for k, v in kvs.items()])
    content = re.sub(pattern, rf'\1{add_lines}', content, count=1)

# Add share button and url prefill logic
share_handler_code = """
    // Viral Clip Sharing Handler
    const shareBtn = document.getElementById('share-clip-btn');
    const shareToast = document.getElementById('share-toast');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const url = urlInput.value.trim();
            if (!url) {
                alert(currentLang === 'tr' ? 'Lütfen önce bir video linki yapıştırın.' : 'Please paste a video link first.');
                return;
            }
            const start = startTimeInput.value.trim();
            const end = endTimeInput.value.trim();
            const qEl = document.getElementById('quality');
            const q = qEl ? qEl.value : '1080';
            
            let shareUrl = `${window.location.origin}${window.location.pathname}?url=${encodeURIComponent(url)}`;
            if (start) shareUrl += `&start=${encodeURIComponent(start)}`;
            if (end) shareUrl += `&end=${encodeURIComponent(end)}`;
            if (q) shareUrl += `&quality=${encodeURIComponent(q)}`;
            
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(shareUrl);
                } else {
                    const tempInput = document.createElement('input');
                    tempInput.value = shareUrl;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                }
                
                trackGA('share_clip_click', {
                    platform: currentPlatform,
                    has_start: !!start,
                    has_end: !!end,
                    quality: q
                });
                
                if (shareToast) {
                    shareToast.classList.remove('hidden');
                    setTimeout(() => {
                        shareToast.classList.add('hidden');
                    }, 2500);
                }
            } catch (err) {
                console.error('Clipboard error:', err);
                prompt(currentLang === 'tr' ? 'Klip linkinizi kopyalayın:' : 'Copy your clip link:', shareUrl);
            }
        });
    }

    const params = new URLSearchParams(window.location.search);
    const prefillUrl = params.get('url') || params.get('link');
    const prefillStart = params.get('start');
    const prefillEnd = params.get('end');
    const prefillQuality = params.get('quality');
    if (prefillUrl) {
        urlInput.value = decodeURIComponent(prefillUrl);
        urlInput.dispatchEvent(new Event('input'));
        if (prefillStart && startTimeInput) startTimeInput.value = decodeURIComponent(prefillStart);
        if (prefillEnd && endTimeInput) endTimeInput.value = decodeURIComponent(prefillEnd);
        if (prefillQuality) {
            const qualityEl = document.getElementById('quality');
            if (qualityEl) qualityEl.value = prefillQuality;
        }
    }
"""

# Replace existing DOMContentLoaded prefill
old_prefill = """    const params = new URLSearchParams(window.location.search);
    const prefillUrl = params.get('url') || params.get('link');
    if (prefillUrl) {
        urlInput.value = decodeURIComponent(prefillUrl);
        urlInput.dispatchEvent(new Event('input'));
    }"""

if old_prefill in content:
    content = content.replace(old_prefill, share_handler_code.strip())
    print("Replaced prefill and added share handler!")
else:
    print("WARNING: old_prefill not matched exactly, looking for alternate pattern")
    content = re.sub(
        r'const params = new URLSearchParams\(window\.location\.search\);.*?urlInput\.dispatchEvent\(new Event\(\'input\'\)\);\s*\}',
        share_handler_code.strip(),
        content,
        flags=re.DOTALL
    )

with open(APP_JS, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated app.js successfully!")
