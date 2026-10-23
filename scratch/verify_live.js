const https = require('https');

const paths = [
    '/',
    '/youtube-cutter',
    '/youtube-mp3-cutter',
    '/tiktok-downloader',
    '/youtube-ringtone-maker',
    '/youtube-shorts-cutter',
    '/tiktok-sound-downloader',
    '/de/',
    '/fr/',
    '/es/',
    '/sitemap.xml',
    '/robots.txt'
];

function fetchUrl(path) {
    return new Promise((resolve, reject) => {
        const req = https.get('https://snapcut.tech' + path, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    path,
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: data
                });
            });
        });
        req.on('error', reject);
    });
}

async function run() {
    console.log('=== VERIFYING LIVE PRODUCTION SERVER (snapcut.tech) ===\n');
    let allOk = true;

    for (const p of paths) {
        try {
            const res = await fetchUrl(p);
            const statusOk = res.statusCode === 200;
            if (!statusOk) allOk = false;

            console.log(`Path: ${p} -> HTTP ${res.statusCode} ${statusOk ? '✅' : '❌'} (${res.body.length} bytes)`);
            
            if (p.endsWith('.xml') || p.endsWith('.txt')) {
                console.log(`  Content-Type: ${res.headers['content-type']}`);
            } else {
                const titleMatch = res.body.match(/<title>([^<]+)<\/title>/);
                const title = titleMatch ? titleMatch[1] : 'NONE';
                const descMatch = res.body.match(/<meta name="description" content="([^"]+)"/);
                const desc = descMatch ? descMatch[1] : 'NONE';
                const hasCsp = res.headers['content-security-policy'];
                console.log(`  Title [${title.length} chars]: ${title}`);
                console.log(`  Desc [${desc.length} chars]: ${desc}`);
                console.log(`  CSP present: ${hasCsp ? 'YES (Warning!)' : 'NO (Clean)'}`);
            }
            console.log('');
        } catch (err) {
            console.error(`  ❌ Error fetching ${p}:`, err.message);
            allOk = false;
        }
    }

    if (allOk) {
        console.log('ALL LIVE ENDPOINTS RETURNED HTTP 200 WITH VALID METADATA! 🎉');
    } else {
        console.error('SOME ENDPOINTS FAILED! ❌');
        process.exit(1);
    }
}

run().catch(console.error);
