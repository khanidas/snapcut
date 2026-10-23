python3 -c '
import glob, gzip, os, re
from collections import defaultdict

logs = sorted(glob.glob("/var/log/nginx/access.log*"))
stats = defaultdict(lambda: {"total": 0, "ips": set(), "googlebot": 0, "api": 0, "status_5xx": 0, "status_2xx": 0, "referrers": defaultdict(int), "top_pages": defaultdict(int)})

for log in logs:
    open_fn = gzip.open if log.endswith(".gz") else open
    try:
        with open_fn(log, "rt", errors="ignore") as f:
            for line in f:
                parts = line.split()
                if len(parts) < 10:
                    continue
                ip = parts[0]
                m = re.search(r"\[(\d{2}/[A-Za-z]{3}/\d{4})", line)
                if not m:
                    continue
                day = m.group(1)
                
                status = parts[8] if len(parts) > 8 else "0"
                
                # Request path
                path_m = re.search(r""(?:GET|POST|HEAD)\s+([^\s\?]+)", line)
                req_path = path_m.group(1) if path_m else ""
                
                stats[day]["total"] += 1
                stats[day]["ips"].add(ip)
                if "Googlebot" in line or "googlebot" in line:
                    stats[day]["googlebot"] += 1
                if "/api/process" in line:
                    stats[day]["api"] += 1
                if status.startswith("5"):
                    stats[day]["status_5xx"] += 1
                elif status.startswith("2"):
                    stats[day]["status_2xx"] += 1
                
                if req_path and not req_path.endswith((".js", ".css", ".png", ".jpg", ".ico", ".svg")):
                    stats[day]["top_pages"][req_path] += 1
                
                ref_m = re.search(r""https?://([^"/]+)", line)
                if ref_m:
                    ref = ref_m.group(1)
                    if "snapcut.tech" not in ref:
                        stats[day]["referrers"][ref] += 1
    except Exception as e:
        print(f"Error reading {log}: {e}")

print("=" * 80)
print(f"| {'Tarih':11} | {'Toplam İstek':12} | {'Tekil IP':9} | {'Googlebot':9} | {'İndirme/Kesme':13} | {'2xx OK':8} | {'5xx Hata':8} |")
print("=" * 80)
for day in sorted(stats.keys(), key=lambda d: (d.split("/")[2], d.split("/")[1], d.split("/")[0])):
    d = stats[day]
    print(f"| {day:11} | {d['total']:12} | {len(d['ips']):9} | {d['googlebot']:9} | {d['api']:13} | {d['status_2xx']:8} | {d['status_5xx']:8} |")
print("=" * 80)

print("
--- EN ÇOK ZİYARET EDİLEN SAYFALAR (GÜNLÜK) ---")
for day in sorted(stats.keys(), key=lambda d: (d.split("/")[2], d.split("/")[1], d.split("/")[0])):
    top_p = sorted(stats[day]["top_pages"].items(), key=lambda x: x[1], reverse=True)[:5]
    print(f"{day}: {top_p}")

print("
--- DIŞ REFERRER KAYNAKLARI (GÜNLÜK) ---")
for day in sorted(stats.keys(), key=lambda d: (d.split("/")[2], d.split("/")[1], d.split("/")[0])):
    top_r = sorted(stats[day]["referrers"].items(), key=lambda x: x[1], reverse=True)[:5]
    print(f"{day}: {top_r}")
'