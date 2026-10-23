const https = require('https');

const paths = [
    '/',
    '/youtube-cutter',
    '/youtube-mp3-cutter',
    '/tiktok-downloader',
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
    for (const p of paths) {
        const res = await fetchUrl(p);
        console.log(`Path: ${p} -> HTTP ${res.statusCode} (${res.body.length} bytes)`);
        
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
            console.log(`  CSP Header present: ${hasCsp ? 'YES (Warning!)' : 'NO (Adsterra scripts unblocked!)'}`);
            console.log(`  HSTS: ${res.headers['strict-transport-security'] || 'NONE'}`);
        }
        console.log('');
    }
}

run().catch(console.error);
