const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { exec, execSync } = require('child_process');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
    'https://snapcut.tech',
    'https://www.snapcut.tech',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5000'
];

app.use(cors({
    origin: function (origin, callback) {
        // Tarayıcı aynı siteden istek atınca origin undefined olabilir, izin ver
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('CORS Engeli: Bu API yalnızca snapcut.tech üzerinden kullanılabilir.'));
    }
}));

// www -> non-www 301 kalıcı yönlendirme (SEO link gücünü tek alanda toplar)
app.use((req, res, next) => {
    const host = req.headers['x-forwarded-host'] || req.headers.host || '';
    if (host.toLowerCase().startsWith('www.snapcut.tech')) {
        return res.redirect(301, `https://snapcut.tech${req.originalUrl}`);
    }
    next();
});

// Güvenlik ve SEO Başlıkları (HSTS, Referrer-Policy, X-Frame-Options, X-Content-Type-Options)
app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '7d',
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache');
        }
    }
}));

app.get('/youtube-cutter', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'youtube-cutter.html'));
});

app.get('/youtube-mp3-cutter', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'youtube-mp3-cutter.html'));
});

app.get('/tiktok-downloader', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tiktok-downloader.html'));
});

// Sitemap ve Robots.txt için kesin MIME türü garantisi
app.get('/sitemap.xml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

app.get('/robots.txt', (req, res) => {
    res.header('Content-Type', 'text/plain');
    res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

const downloadsDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
}

const isWindows = os.platform() === 'win32';

// yt-dlp komutunu bul
function getYtDlpCmd() {
    if (isWindows && fs.existsSync(path.join(__dirname, 'yt-dlp.exe'))) {
        return '.\\yt-dlp.exe';
    }
    return 'yt-dlp';
}

// ffmpeg seçeneğini bul (Windows ve Linux uyumlu)
function getFfmpegOption() {
    if (isWindows && fs.existsSync(path.join(__dirname, 'ffmpeg.exe'))) {
        return '--ffmpeg-location .\\ffmpeg.exe';
    }
    // Linux: sistem ffmpeg'ini kontrol et
    try {
        execSync('ffmpeg -version', { stdio: 'ignore' });
        return ''; // ffmpeg PATH'te mevcut, yt-dlp otomatik bulur
    } catch (e) {
        console.warn('UYARI: ffmpeg bulunamadi! Lutfen "apt install ffmpeg" ile yukleyin.');
        return '';
    }
}

function timeToSeconds(timeStr) {
    if (!timeStr) return 0;
    const parts = timeStr.split(':');
    if (parts.length === 2) {
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    } else if (parts.length === 3) {
        return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
    }
    return 0;
}

const ytDlpCmd = getYtDlpCmd();
const ffmpegOption = getFfmpegOption();

console.log('yt-dlp komutu:', ytDlpCmd);
console.log('ffmpeg secenegi:', ffmpegOption || '(sistem PATH kullaniliyor)');

// yt-dlp surumunu logla
try {
    const version = execSync(`${ytDlpCmd} --version`, { encoding: 'utf8' }).trim();
    console.log('yt-dlp surumu:', version);
} catch (e) {
    console.error('HATA: yt-dlp bulunamadi veya calismiyor!', e.message);
}

function formatTimeSegment(t) {
    if (!t) return '0000';
    const cleanTime = String(t).trim().split('.')[0];
    const parts = cleanTime.split(':').map(p => p.trim().padStart(2, '0'));
    return parts.join('');
}

function slugifyTitle(title) {
    if (!title) return 'video';
    const charMap = {
        'ç': 'c', 'Ç': 'c',
        'ğ': 'g', 'Ğ': 'g',
        'ı': 'i', 'I': 'i', 'İ': 'i',
        'ö': 'o', 'Ö': 'o',
        'ş': 's', 'Ş': 's',
        'ü': 'u', 'Ü': 'u'
    };
    let latinized = title.replace(/[çÇğĞıIİöÖşŞüÜ]/g, m => charMap[m] || m);
    let clean = latinized
        .trim()
        .replace(/[^\p{L}\p{N}]+/gu, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
    
    if (clean.length > 45) {
        clean = clean.substring(0, 45).replace(/-+$/, '');
    }
    return clean || 'video';
}

function getFormatOption(quality) {
    const q = String(quality || '1080');
    switch (q) {
        case '1080':
            return 'bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=1080]+bestaudio/best[height<=1080]/best';
        case '720':
            return '22/bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=720]+bestaudio/best[height<=720]/18/best';
        case '480':
            return 'bestvideo[height<=480][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=480]+bestaudio/best[height<=480]/18/best';
        case '360':
            return '18/bestvideo[height<=360][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=360]+bestaudio/best[height<=360]/best';
        default:
            return 'bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=1080]+bestaudio/best[height<=1080]/best';
    }
}

app.post('/api/process', (req, res) => {
    const { url, startTime, endTime, platform, mode, quality } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'Video URL eksik. / Missing video URL.' });
    }

    if (platform === 'youtube' || (platform === 'tiktok' && mode === 'cut')) {
        if (!startTime || !endTime) {
            return res.status(400).json({ error: 'Baslangic ve bitis suresi gereklidir. / Start and end time required.' });
        }

        const startSec = timeToSeconds(startTime);
        const endSec = timeToSeconds(endTime);

        if (endSec - startSec <= 0) {
            return res.status(400).json({ error: 'Bitis suresi, baslangic suresinden buyuk olmalidir. / End time must be greater than start time.' });
        }
    }

    const uniqueId = Date.now();
    let timeSegmentStr = '';
    if (startTime && endTime) {
        timeSegmentStr = `${formatTimeSegment(startTime)}-${formatTimeSegment(endTime)}`;
    }

    // Guvenlik: URL'yi tirnak icine alarak komut enjeksiyonunu onluyoruz
    const safeUrl = `"${url.replace(/"/g, '\\"')}"`;

    let command = '';

    // bgutil pot-provider ile YouTube bot korumasini asiyoruz (cookie gerektirmez)
    const potProviderOpt = '--extractor-args youtubepot-bgutilhttp:base_url=http://localhost:4416 --remote-components ejs:github';
    // Opsiyonel: cookies.txt varsa kullan (kisitli videolar icin)
    const cookiePath = path.join(__dirname, 'cookies.txt');
    const cookieOpt = fs.existsSync(cookiePath) ? `--cookies "${cookiePath}"` : '';

    if (platform === 'youtube') {
        const outTemplate = path.join(downloadsDir, `%(title).60s___${timeSegmentStr || 'full'}___${uniqueId}.%(ext)s`);
        if (quality === 'mp3') {
            command = `${ytDlpCmd} ${potProviderOpt} ${cookieOpt} ${ffmpegOption} --download-sections "*${startTime}-${endTime}" --no-part --windows-filenames -x --audio-format mp3 --audio-quality 0 --print after_move:filename ${safeUrl} -o "${outTemplate}"`;
        } else {
            const formatStr = getFormatOption(quality);
            command = `${ytDlpCmd} ${potProviderOpt} ${cookieOpt} ${ffmpegOption} --download-sections "*${startTime}-${endTime}" --no-part --windows-filenames --merge-output-format mp4 --print after_move:filename ${safeUrl} -f "${formatStr}" -o "${outTemplate}"`;
        }
    } else if (platform === 'tiktok') {
        const outTemplate = path.join(downloadsDir, `%(title).60s___${timeSegmentStr || 'full'}___${uniqueId}.%(ext)s`);
        if (quality === 'mp3') {
            const sectionOpt = mode === 'cut' ? `--download-sections "*${startTime}-${endTime}"` : '';
            command = `${ytDlpCmd} ${ffmpegOption} ${sectionOpt} --windows-filenames -x --audio-format mp3 --audio-quality 0 --print after_move:filename ${safeUrl} -o "${outTemplate}"`;
        } else if (mode === 'cut') {
            command = `${ytDlpCmd} ${ffmpegOption} --download-sections "*${startTime}-${endTime}" --force-keyframes-at-cuts --windows-filenames --merge-output-format mp4 --print after_move:filename ${safeUrl} -o "${outTemplate}"`;
        } else {
            command = `${ytDlpCmd} ${ffmpegOption} --windows-filenames --merge-output-format mp4 --print after_move:filename ${safeUrl} -o "${outTemplate}"`;
        }
    } else if (platform === 'spotify') {
        const outTemplate = path.join(downloadsDir, `%(title).60s___full___${uniqueId}.%(ext)s`);
        command = `${ytDlpCmd} ${ffmpegOption} --windows-filenames --print after_move:filename ${safeUrl} -x --audio-format mp3 -o "${outTemplate}"`;
    }

    console.log('Komut:', command);

    function executeYtDlp(cmdToRun, isRetry = false) {
        exec(cmdToRun, { timeout: 300000 }, (error, stdout, stderr) => {
            if (stdout) console.log('stdout:', stdout.slice(0, 500));
            if (stderr) console.log('stderr:', stderr.slice(0, 1000));

            if (error) {
                console.error('Indirme hatasi (exit code ' + error.code + '):', error.message);

                const errText = ((stderr || '') + error.message).toLowerCase();

                // Eğer cookie süresi dolmuşsa ve komutta cookie kullanılmışsa, otomatik çerezsiz fallback dene!
                if (!isRetry && cookieOpt && (errText.includes('no longer valid') || errText.includes('rotated in the browser')) && cmdToRun.includes(cookieOpt)) {
                    console.warn('UYARI: YouTube cookie oturumu dolmuş! Çerezsiz bgutil pot-provider ile tekrar deneniyor...');
                    const fallbackCmd = cmdToRun.replace(cookieOpt, '').replace(/\s+/g, ' ');
                    return executeYtDlp(fallbackCmd, true);
                }

                let userMessage = 'Indirme basarisiz oldu. Lutfen tekrar deneyin.';

                if (errText.includes('no longer valid') || errText.includes('rotated in the browser')) {
                    userMessage = 'YouTube oturumunun süresi dolmuş (cookies süresi bitti / yenilendi). Lütfen güncel cookies.txt yükleyin.';
                } else if (errText.includes('confirm you\'re not a bot') || (errText.includes('bot') && errText.includes('sign in'))) {
                    userMessage = 'YouTube bot koruması (Sign in to confirm you are not a bot) engeline takıldı. Sunucuya güncel cookies.txt eklenmelidir.';
                } else if (errText.includes('confirm your age') || errText.includes('age-restricted')) {
                    userMessage = 'Bu video yaş kısıtlamalıdır (+18) ve giriş (cookies.txt) gerektiriyor.';
                } else if (errText.includes('private')) {
                    userMessage = 'Bu video gizli (özel) bir videodur.';
                } else if (errText.includes('sign in')) {
                    userMessage = 'Bu video gizli veya giriş gerektiriyor.';
                } else if (errText.includes('not available') || errText.includes('unavailable')) {
                    userMessage = 'Video mevcut degil veya bolgenizde kullanilmiyor.';
                } else if (errText.includes('ffmpeg not found') || errText.includes('ffmpeg is not installed')) {
                    userMessage = 'Sunucuda ffmpeg eksik. Yonetici ile iletisime gecin.';
                } else if (errText.includes('ffmpeg exited')) {
                    userMessage = 'Video işleme / kesme sırasında dönüştürücü hatası oluştu. Lütfen tekrar deneyin.';
                } else if (errText.includes('429') || errText.includes('too many')) {
                    userMessage = 'Cok fazla istek. Lutfen birkac saniye bekleyin.';
                }

                return res.status(500).json({ error: userMessage });
            }

        // yt-dlp ciktisindan veya downloads klasorunden olusturulan dosyayi bul
        let generatedFilePath = null;
        if (stdout) {
            const lines = stdout.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
            for (let i = lines.length - 1; i >= 0; i--) {
                const line = lines[i];
                if (fs.existsSync(line)) {
                    generatedFilePath = line;
                    break;
                }
                const candidate = path.join(downloadsDir, path.basename(line));
                if (fs.existsSync(candidate)) {
                    generatedFilePath = candidate;
                    break;
                }
            }
        }

        if (!generatedFilePath || !fs.existsSync(generatedFilePath)) {
            try {
                const files = fs.readdirSync(downloadsDir);
                const match = files.find(f => f.includes(String(uniqueId)));
                if (match) {
                    generatedFilePath = path.join(downloadsDir, match);
                }
            } catch (e) {}
        }

        if (!generatedFilePath || !fs.existsSync(generatedFilePath)) {
            console.error('Dosya olusturulamadi (uniqueId: ' + uniqueId + ')');
            return res.status(500).json({ error: 'Dosya oluşturulamadı. Lütfen tekrar deneyin.' });
        }

        const rawDiskFilename = path.basename(generatedFilePath);
        const ext = path.extname(rawDiskFilename) || (platform === 'spotify' ? '.mp3' : '.mp4');
        const rawBaseWithoutExt = path.basename(rawDiskFilename, ext);

        // Şablon: %(title).60s___<timeSegmentStr|full>___<uniqueId>.<ext>
        const parts = rawBaseWithoutExt.split('___');
        let rawTitle = 'video';
        let timePart = '';

        if (parts.length >= 3) {
            rawTitle = parts[0].trim();
            timePart = (parts[1] === 'full') ? '' : parts[1].trim();
        } else {
            rawTitle = rawBaseWithoutExt.replace(new RegExp(`_${uniqueId}$`), '');
            if (timeSegmentStr) timePart = timeSegmentStr;
        }

        const cleanTitle = slugifyTitle(rawTitle);
        // Kullanıcının göreceği ve indireceği dosya adı (Örn: Elraen-oyun-1120-1130.mp4)
        const clientDownloadName = `${cleanTitle}${timePart ? '-' + timePart : ''}${ext}`;

        // Disk üzerindeki dosya adı
        const safeDiskFilename = `${cleanTitle}${timePart ? '-' + timePart : ''}_${uniqueId}${ext}`;
        const safeDiskPath = path.join(downloadsDir, safeDiskFilename);

        if (generatedFilePath !== safeDiskPath) {
            try {
                fs.renameSync(generatedFilePath, safeDiskPath);
            } catch (renameErr) {
                console.warn('Dosya yeniden adlandırılamadı:', renameErr.message);
            }
        }

        const finalServedDiskFilename = fs.existsSync(safeDiskPath) ? safeDiskFilename : rawDiskFilename;
        const finalServedPath = path.join(downloadsDir, finalServedDiskFilename);
        const fileSize = fs.statSync(finalServedPath).size;

        console.log('İndirme tamamlandı:', clientDownloadName, `(Disk: ${finalServedDiskFilename}, ${(fileSize / 1024 / 1024).toFixed(2)} MB)`);

        res.json({
            message: 'Success',
            downloadUrl: `/download/${encodeURIComponent(finalServedDiskFilename)}?name=${encodeURIComponent(clientDownloadName)}`,
            filename: clientDownloadName
        });
        });
    }

    executeYtDlp(command);
});

app.get('/download/:filename', (req, res) => {
    const diskFilename = path.basename(req.params.filename);
    const file = path.join(downloadsDir, diskFilename);

    if (fs.existsSync(file)) {
        let downloadName = req.query.name || req.query.title;
        if (!downloadName) {
            const ext = path.extname(diskFilename);
            const base = path.basename(diskFilename, ext).replace(/_\d+$/, '');
            downloadName = `${base}${ext}`;
        }
        downloadName = path.basename(downloadName);

        res.download(file, downloadName, (err) => {
            if (err && !res.headersSent) {
                console.error('Download transfer hatasi:', err.message);
            }
        });

        // 5 dakika sonra sil
        setTimeout(() => {
            if (fs.existsSync(file)) {
                try { fs.unlinkSync(file); } catch (e) {}
            }
        }, 1000 * 60 * 5);
    } else {
        res.status(404).send('Dosya bulunamadi.');
    }
});

// Baslangicta eski dosyalari temizle
function cleanOldFiles() {
    try {
        const files = fs.readdirSync(downloadsDir);
        const now = Date.now();
        files.forEach(file => {
            const filePath = path.join(downloadsDir, file);
            try {
                const stat = fs.statSync(filePath);
                if (now - stat.mtimeMs > 10 * 60 * 1000) {
                    fs.unlinkSync(filePath);
                    console.log('Silindi:', file);
                }
            } catch (e) {}
        });
    } catch (e) {}
}

cleanOldFiles();
setInterval(cleanOldFiles, 30 * 60 * 1000);

app.listen(PORT, () => {
    console.log('Sunucu http://localhost:' + PORT + ' adresinde calisiyor.');
});
