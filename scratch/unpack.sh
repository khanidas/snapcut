#!/bin/bash
set -e
echo "Decoding and extracting..."
base64 -d /tmp/snapcut_deploy.b64 | tar -xzf - -C /var/www/snapcut
chown -R azureuser:azureuser /var/www/snapcut
chmod -R 755 /var/www/snapcut/public
rm -f /tmp/snapcut_deploy.b64
echo "Restarting PM2 snapcut..."
pm2 restart snapcut
echo "ALL_DONE_SUCCESSFULLY"
