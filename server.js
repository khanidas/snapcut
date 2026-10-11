const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const downloadsDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir);
}

function timeToSeconds(timeStr) {
    if (!timeStr) return 0;
    const parts = timeStr.split(':');
    if(parts.length === 2) {
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    } else if(parts.length === 3) {
        return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
    }
    return 0;
}

app.post('/api/process', (req, res) => {
    const { url, startTime, endTime, platform, mode } = req.body;
    
    if (!url) {
        return res.status(400).json({ error: 'Video URL eksik. / Missing video URL.' });
    }

    if (platform === 'youtube' || (platform === 'tiktok' && mode === 'cut')) {
        if (!startTime || !endTime) {
            return res.status(400).json({ error: 'Başlangıç ve bitiş süresi gereklidir. / Start and end time required.' });
        }
        
        const startSec = timeToSeconds(startTime);
        const endSec = timeToSeconds(endTime);
        
        if (endSec - startSec <= 0) {
            return res.status(400).json({ error: 'Bitiş süresi, başlangıç süresinden büyük olmalıdır. / End time must be greater than start time.' });
        }
    }
    
    let prefix = 'yt';
    if (platform === 'tiktok') prefix = 'tiktok';
    if (platform === 'spotify') prefix = 'spotify';
    
    const extension = platform === 'spotify' ? 'mp3' : 'mp4';
    const finalFileName = `${prefix}_${Date.now()}.${extension}`;
    const finalFilePath = path.join(downloadsDir, finalFileName);
    
    let command = '';
    
    // Güvenlik: URL'yi tırnak içine alarak komut enjeksiyonunu önlüyoruz
    const safeUrl = `"${url.replace(/"/g, '\\"')}"`;
    
    const ytDlpCmd = fs.existsSync(path.join(__dirname, 'yt-dlp.exe')) ? '.\\yt-dlp.exe' : 'yt-dlp';
    const ffmpegOption = fs.existsSync(path.join(__dirname, 'ffmpeg.exe')) ? '--ffmpeg-location .\\ffmpeg.exe' : '';

    if (platform === 'youtube') {
        command = `${ytDlpCmd} ${ffmpegOption} --download-sections "*${startTime}-${endTime}" ${safeUrl} -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4" -o "${finalFilePath}"`;
    } else if (platform === 'tiktok') {
        if (mode === 'cut') {
            command = `${ytDlpCmd} ${ffmpegOption} --download-sections "*${startTime}-${endTime}" ${safeUrl} -o "${finalFilePath}"`;
        } else {
            command = `${ytDlpCmd} ${ffmpegOption} ${safeUrl} -o "${finalFilePath}"`;
        }
    } else if (platform === 'spotify') {
        command = `${ytDlpCmd} ${ffmpegOption} ${safeUrl} -x --audio-format mp3 -o "${finalFilePath}"`;
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('İndirme hatası:', error);
            return res.status(500).json({ error: 'Server error during processing. Please try again.' });
        }
        
        res.json({
            message: 'Success',
            downloadUrl: `/download/${finalFileName}`,
            filename: finalFileName
        });
    });
});

app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const file = path.join(downloadsDir, filename);
    
    if (fs.existsSync(file)) {
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'application/octet-stream');
        
        const fileStream = fs.createReadStream(file);
        fileStream.pipe(res);
        
        // 5 dakika sonra sil
        setTimeout(() => {
            if (fs.existsSync(file)) {
                try { fs.unlinkSync(file); } catch(e) {}
            }
        }, 1000 * 60 * 5); 
    } else {
        res.status(404).send('Dosya bulunamadı.');
    }
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
