import subprocess
import base64

AZ_CMD = r"C:\Program Files\Microsoft SDKs\Azure\CLI2\wbin\az.cmd"
RG = "YtSlip-swedencentral"
VM = "ytslip-server"

remote_code = r'''
import glob, gzip, os, re
from collections import defaultdict

logs = sorted(glob.glob("/var/log/nginx/access.log*"))
stats = defaultdict(lambda: {
    "total": 0, 
    "ips": set(), 
    "googlebot": 0, 
    "bingbot": 0,
    "api_calls": 0, 
    "status_5xx": 0, 
    "status_2xx": 0,
    "status_4xx": 0,
    "referrers": defaultdict(int), 
    "pages": defaultdict(int)
})

for log in logs:
    open_fn = gzip.open if log.endswith(".gz") else open
    try:
        with open_fn(log, "rt", errors="ignore") as f:
            for line in f:
                parts = line.split()
                if len(parts) < 9:
                    continue
                ip = parts[0]
                m = re.search(r"\[(\d{2}/[A-Za-z]{3}/\d{4})", line)
                if not m:
                    continue
                day = m.group(1)
                
                status = parts[8] if len(parts) > 8 else "0"
                
                stats[day]["total"] += 1
                stats[day]["ips"].add(ip)
                
                lower = line.lower()
                if "googlebot" in lower:
                    stats[day]["googlebot"] += 1
                elif "bingbot" in lower:
                    stats[day]["bingbot"] += 1
                    
                if "/api/process" in line:
                    stats[day]["api_calls"] += 1
                    
                if status.startswith("5"):
                    stats[day]["status_5xx"] += 1
                elif status.startswith("4"):
                    stats[day]["status_4xx"] += 1
                elif status.startswith("2"):
                    stats[day]["status_2xx"] += 1
                
                # Check referrer
                ref_match = re.search(r'"https?://([^"/]+)', line)
                if ref_match:
                    domain = ref_match.group(1)
                    if "snapcut.tech" not in domain:
                        stats[day]["referrers"][domain] += 1
                        
                # Check requested resource
                res_match = re.search(r'"[A-Z]+\s+([^ \?]+)', line)
                if res_match:
                    p = res_match.group(1)
                    if not p.endswith((".js", ".css", ".png", ".jpg", ".ico", ".svg")):
                        stats[day]["pages"][p] += 1
    except Exception as e:
        print("Log read error:", e)

print("=" * 95)
print(f"| {'Tarih':11} | {'Toplam İstek':12} | {'Tekil Ziyaretçi':15} | {'Googlebot':10} | {'İndirme İşlemi':14} | {'200 OK':8} | {'4xx/5xx':8} |")
print("=" * 95)
for day in sorted(stats.keys(), key=lambda d: (d.split("/")[2], d.split("/")[1], d.split("/")[0])):
    d = stats[day]
    errs = f"{d['status_4xx']}/{d['status_5xx']}"
    print(f"| {day:11} | {d['total']:12} | {len(d['ips']):15} | {d['googlebot']:10} | {d['api_calls']:14} | {d['status_2xx']:8} | {errs:8} |")
print("=" * 95)

print("\n--- EN ÇOK ZİYARET EDİLEN SAYFALAR ---")
for day in sorted(stats.keys(), key=lambda d: (d.split("/")[2], d.split("/")[1], d.split("/")[0])):
    top_p = sorted(stats[day]["pages"].items(), key=lambda x: x[1], reverse=True)[:4]
    print(f"{day}: {top_p}")

print("\n--- DIŞ REFERRER (NEREDEN GELMİŞLER?) ---")
for day in sorted(stats.keys(), key=lambda d: (d.split("/")[2], d.split("/")[1], d.split("/")[0])):
    top_r = sorted(stats[day]["referrers"].items(), key=lambda x: x[1], reverse=True)[:4]
    print(f"{day}: {top_r}")
'''

b64 = base64.b64encode(remote_code.encode("utf-8")).decode("ascii")
bash_cmd = f"echo '{b64}' | base64 -d > /tmp/analyze.py && python3 /tmp/analyze.py"

cmd = [
    AZ_CMD, "vm", "run-command", "invoke",
    "-g", RG, "-n", VM,
    "--command-id", "RunShellScript",
    "--scripts", bash_cmd
]
print("Running traffic analysis on Azure VM...")
res = subprocess.run(cmd, capture_output=True, text=True)
print(res.stdout)
if res.stderr:
    print("STDERR:", res.stderr)
