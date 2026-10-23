import subprocess

AZ_CMD = r"C:\Program Files\Microsoft SDKs\Azure\CLI2\wbin\az.cmd"
RG = "YtSlip-swedencentral"
VM = "ytslip-server"

cmd = [
    AZ_CMD, "vm", "run-command", "invoke",
    "-g", RG, "-n", VM,
    "--command-id", "RunShellScript",
    "--scripts", "grep -rn 'Content-Security-Policy' /var/www/snapcut/ || echo 'NOT_FOUND_IN_SNAPCUT'"
]
res = subprocess.run(cmd, capture_output=True, text=True)
print(res.stdout)
