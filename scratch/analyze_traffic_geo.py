import subprocess
import base64

AZ_CMD = r"C:\Program Files\Microsoft SDKs\Azure\CLI2\wbin\az.cmd"
RG = "YtSlip-swedencentral"
VM = "ytslip-server"

remote_code = r'''
import glob, gzip, re
from collections import Counter

logs = sorted(glob.glob("/var/log/nginx/access.log*"))

pages = Counter()
referrers = Counter()
user_agents = Counter()

for log in logs:
    open_fn = gzip.open if log.endswith(".gz") else open
    try:
        with open_fn(log, "rt", errors="ignore") as f:
            for line in f:
                if "/api/process" in line or "GET / " in line or "GET /youtube" in line or "GET /tiktok" in line:
                    req_m = re.search(r'"(GET|POST)\s+([^ \?]+)', line)
                    if req_m:
                        pages[req_m.group(2)] += 1
                ref_m = re.search(r'"(https?://[^"]+)"', line)
                if ref_m:
                    ref = ref_m.group(1)
                    if "snapcut" not in ref:
                        referrers[ref[:80]] += 1
    except:
        pass

print("=== TOP REQUESTED PAGES ===")
for p, c in pages.most_common(10):
    print(f"{c:6d} : {p}")

print("\n=== TOP EXTERNAL REFERRERS (Arama Motorları & Siteler) ===")
for r, c in referrers.most_common(10):
    print(f"{c:6d} : {r}")
'''

b64 = base64.b64encode(remote_code.encode("utf-8")).decode("ascii")
cmd = [
    AZ_CMD, "vm", "run-command", "invoke",
    "-g", RG, "-n", VM,
    "--command-id", "RunShellScript",
    "--scripts", f"python3 -c \"import base64; exec(base64.b64decode('{b64}').decode())\""
]
res = subprocess.run(cmd, capture_output=True, text=True)
import json
try:
    val = json.loads(res.stdout)
    print(val["value"][0]["message"])
except Exception as e:
    print(res.stdout)

