import subprocess
import base64

AZ_CMD = r"C:\Program Files\Microsoft SDKs\Azure\CLI2\wbin\az.cmd"
RG = "YtSlip-swedencentral"
VM = "ytslip-server"

remote_code = r'''
import glob, gzip, re
from collections import Counter

c_404 = Counter()
c_google = Counter()
c_user_agents = Counter()

for f in glob.glob("/var/log/nginx/access.log*"):
    op = gzip.open if f.endswith(".gz") else open
    try:
        with op(f, "rt", errors="ignore") as fp:
            for l in fp:
                status_m = re.search(r'\s([45]\d\d)\s', l)
                if status_m:
                    path_m = re.search(r'"[A-Z]+\s+([^ \?]+)', l)
                    if path_m:
                        c_404[f"{status_m.group(1)} {path_m.group(1)}"] += 1
                if "google" in l.lower():
                    path_m = re.search(r'"[A-Z]+\s+([^ \?]+)', l)
                    if path_m:
                        c_google[path_m.group(1)] += 1
                ua_m = re.search(r'"[^"]*"\s+"([^"]+)"$', l)
                if ua_m:
                    ua = ua_m.group(1)
                    if "bot" in ua.lower() or "spider" in ua.lower() or "crawl" in ua.lower():
                        c_user_agents[ua[:60]] += 1
    except Exception as e:
        pass

print("=== TOP 4xx / 5xx HATALARI ===")
for item, count in c_404.most_common(15):
    print(f"{count:6d} : {item}")

print("\n=== GOOGLE'DAN / GOOGLEBOT'TAN EN ÇOK İSTENEN SAYFALAR ===")
for item, count in c_google.most_common(10):
    print(f"{count:6d} : {item}")

print("\n=== BOT / CRAWLER DAĞILIMI ===")
for item, count in c_user_agents.most_common(10):
    print(f"{count:6d} : {item}")
'''

b64 = base64.b64encode(remote_code.encode("utf-8")).decode("ascii")
bash_cmd = f"echo '{b64}' | base64 -d > /tmp/check_errors.py && python3 /tmp/check_errors.py"

cmd = [
    AZ_CMD, "vm", "run-command", "invoke",
    "-g", RG, "-n", VM,
    "--command-id", "RunShellScript",
    "--scripts", bash_cmd
]
res = subprocess.run(cmd, capture_output=True, text=True)
print(res.stdout)
