import tarfile
import os
import base64

ROOT = r"c:\androidprojeler\youtubetiktokindirici"
TAR_PATH = os.path.join(ROOT, "scratch", "deploy_snapcut.tar.gz")

files_to_pack = [
    "server.js",
    "public/index.html",
    "public/youtube-cutter.html",
    "public/youtube-mp3-cutter.html",
    "public/tiktok-downloader.html",
    "public/style.css",
    "public/app.js",
    "public/logo.png",
    "public/logo-icon.png",
    "public/logo-icon.webp",
    "public/apple-touch-icon.png",
    "public/favicon-192x192.png",
    "public/favicon-96x96.png",
    "public/favicon-48x48.png",
    "public/favicon-32x32.png",
    "public/favicon-16x16.png",
    "public/favicon.ico",
    "public/site.webmanifest",
    "public/og-image.jpg",
    "public/sitemap.xml",
    "public/robots.txt",
]

with tarfile.open(TAR_PATH, "w:gz") as tar:
    for rel_path in files_to_pack:
        abs_path = os.path.join(ROOT, rel_path.replace("/", os.sep))
        if os.path.exists(abs_path):
            tar.add(abs_path, arcname=rel_path)
            print(f"Added {rel_path} ({os.path.getsize(abs_path)} bytes)")

tar_size = os.path.getsize(TAR_PATH)
print(f"\nTotal tar.gz size: {tar_size} bytes ({tar_size / 1024:.1f} KB)")

with open(TAR_PATH, "rb") as f:
    b64 = base64.b64encode(f.read()).decode("ascii")

b64_path = os.path.join(ROOT, "scratch", "deploy_b64.txt")
with open(b64_path, "w") as f:
    f.write(b64)

print(f"Base64 length: {len(b64)} chars")
