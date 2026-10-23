import subprocess
import os
import time

AZ_CMD = r"C:\Program Files\Microsoft SDKs\Azure\CLI2\wbin\az.cmd"
RG = "YtSlip-swedencentral"
VM = "ytslip-server"

b64_file = r"c:\androidprojeler\youtubetiktokindirici\scratch\deploy_b64.txt"
with open(b64_file, "r") as f:
    full_b64 = f.read().strip()

chunk_size = 50000
chunks = [full_b64[i:i+chunk_size] for i in range(0, len(full_b64), chunk_size)]
print(f"Total chunks to send: {len(chunks)} (chunk size: {chunk_size} chars)")

# Step 0: Remove old tmp file
print("Preparing /tmp/snapcut_deploy.b64 on VM...")
clean_cmd = [
    AZ_CMD, "vm", "run-command", "invoke",
    "-g", RG, "-n", VM,
    "--command-id", "RunShellScript",
    "--scripts", "rm -f /tmp/snapcut_deploy.b64"
]
subprocess.run(clean_cmd, check=True, capture_output=True)

# Send each chunk
for idx, chunk in enumerate(chunks):
    print(f"Uploading chunk {idx+1}/{len(chunks)} ({len(chunk)} chars)...")
    op = ">" if idx == 0 else ">>"
    script = f"cat << 'EOF' {op} /tmp/snapcut_deploy.b64\n{chunk}\nEOF"
    
    script_path = os.path.join(r"c:\androidprojeler\youtubetiktokindirici\scratch", f"chunk_{idx}.sh")
    with open(script_path, "w", newline="\n", encoding="utf-8") as sf:
        sf.write(script)
    
    cmd = [
        AZ_CMD, "vm", "run-command", "invoke",
        "-g", RG, "-n", VM,
        "--command-id", "RunShellScript",
        "--scripts", f"@{script_path}"
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"Error on chunk {idx+1}: {res.stderr}")
        exit(1)
    else:
        print(f"Chunk {idx+1} uploaded successfully.")

# Final Step: Unpack and Restart PM2
print("Unpacking files and restarting PM2 on Azure VM...")
unpack_script = """#!/bin/bash
set -e
echo "Decoding and extracting..."
base64 -d /tmp/snapcut_deploy.b64 | tar -xzf - -C /var/www/snapcut
chown -R azureuser:azureuser /var/www/snapcut
chmod -R 755 /var/www/snapcut/public
rm -f /tmp/snapcut_deploy.b64
echo "Restarting PM2 snapcut..."
pm2 restart snapcut
echo "ALL_DONE_SUCCESSFULLY"
"""

final_script_path = os.path.join(r"c:\androidprojeler\youtubetiktokindirici\scratch", "unpack.sh")
with open(final_script_path, "w", newline="\n", encoding="utf-8") as ff:
    ff.write(unpack_script)

final_cmd = [
    AZ_CMD, "vm", "run-command", "invoke",
    "-g", RG, "-n", VM,
    "--command-id", "RunShellScript",
    "--scripts", f"@{final_script_path}"
]
final_res = subprocess.run(final_cmd, capture_output=True, text=True)
print("Final result:")
print(final_res.stdout)
if "ALL_DONE_SUCCESSFULLY" in final_res.stdout or final_res.returncode == 0:
    print("DEPLOYMENT TO AZURE COMPLETED SUCCESSFULLY!")
else:
    print("Stderr:", final_res.stderr)
