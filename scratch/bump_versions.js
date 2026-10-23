const fs = require('fs');

const files = [
    'public/index.html',
    'public/youtube-cutter.html',
    'public/youtube-mp3-cutter.html',
    'public/tiktok-downloader.html',
    'public/youtube-ringtone-maker.html',
    'public/youtube-shorts-cutter.html',
    'public/tiktok-sound-downloader.html',
    'public/de/index.html',
    'public/fr/index.html',
    'public/es/index.html'
];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/href=["']\/?style\.css(\?v=\d+)?["']/g, 'href="/style.css?v=25"');
    content = content.replace(/src=["']\/?app\.js(\?v=\d+)?["']/g, 'src="/app.js?v=25"');
    fs.writeFileSync(f, content, 'utf8');
    console.log('Bumped asset versions in', f);
});
