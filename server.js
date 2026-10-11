const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { exec, execSync } = require('child_process');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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

app.post('/api/process', (req, res) => {
    const { url, startTime, endTime, platform, mode } = req.body;

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

    let prefix = 'yt';
    if (platform === 'tiktok') prefix = 'tiktok';
    if (platform === 'spotify') prefix = 'spotify';

    const extension = platform === 'spotify' ? 'mp3' : 'mp4';
    const finalFileName = `${prefix}_${Date.now()}.${extension}`;
    const finalFilePath = path.join(downloadsDir, finalFileName);

    // Guvenlik: URL'yi tirnak icine alarak komut enjeksiyonunu onluyoruz
    const safeUrl = `"${url.replace(/"/g, '\\"')}"`;

    let command = '';

    const cookiePath = path.join(__dirname, 'cookies.txt');
    const cookieOpt = fs.existsSync(cookiePath) ? `--cookies "${cookiePath}"` : '';

    if (platform === 'youtube') {
        command = `${ytDlpCmd} ${cookieOpt} ${ffmpegOption} --download-sections "*${startTime}-${endTime}" --force-keyframes-at-cuts ${safeUrl} -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/mp4" -o "${finalFilePath}"`;
    } else if (platform === 'tiktok') {
        if (mode === 'cut') {
            command = `${ytDlpCmd} ${ffmpegOption} --download-sections "*${startTime}-${endTime}" --force-keyframes-at-cuts ${safeUrl} -o "${finalFilePath}"`;
        } else {
            command = `${ytDlpCmd} ${ffmpegOption} ${safeUrl} -o "${finalFilePath}"`;
        }
    } else if (platform === 'spotify') {
        command = `${ytDlpCmd} ${ffmpegOption} ${safeUrl} -x --audio-format mp3 -o "${finalFilePath}"`;
    }

    console.log('Komut:', command);

    exec(command, { timeout: 300000 }, (error, stdout, stderr) => {
        if (stdout) console.log('stdout:', stdout.slice(0, 500));
        if (stderr) console.log('stderr:', stderr.slice(0, 1000));

        if (error) {
            console.error('Indirme hatasi (exit code ' + error.code + '):', error.message);

            let userMessage = 'Indirme basarisiz oldu. Lutfen tekrar deneyin.';
            const errText = ((stderr || '') + error.message).toLowerCase();

            if (errText.includes('private') || errText.includes('sign in')) {
                userMessage = 'Bu video gizli veya giris gerektiriyor.';
            } else if (errText.includes('not available') || errText.includes('unavailable')) {
                userMessage = 'Video mevcut degil veya bolgenizde kullanilmiyor.';
            } else if (errText.includes('ffmpeg')) {
                userMessage = 'Sunucuda ffmpeg eksik. Yonetici ile iletisime gecin.';
            } else if (errText.includes('429') || errText.includes('too many')) {
                userMessage = 'Cok fazla istek. Lutfen birkac saniye bekleyin.';
            }

            return res.status(500).json({ error: userMessage });
        }

        // Dosya olusturuldu mu kontrol et
        if (!fs.existsSync(finalFilePath)) {
            console.error('Dosya olusturulamadi:', finalFilePath);
            return res.status(500).json({ error: 'Dosya olusturulamadi. Lutfen tekrar deneyin.' });
        }

        const fileSize = fs.statSync(finalFilePath).size;
        console.log('Indirme tamamlandi:', finalFileName, '(' + (fileSize / 1024 / 1024).toFixed(2) + ' MB)');

        res.json({
            message: 'Success',
            downloadUrl: `/download/${finalFileName}`,
            filename: finalFileName
        });
    });
});

app.get('/download/:filename', (req, res) => {
    const filename = path.basename(req.params.filename);
    const file = path.join(downloadsDir, filename);

    if (fs.existsSync(file)) {
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'application/octet-stream');

        const fileStream = fs.createReadStream(file);
        fileStream.pipe(res);

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
