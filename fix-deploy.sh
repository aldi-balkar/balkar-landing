#!/bin/bash

# Quick fix for deployment conflict
echo "🔧 Fixing deployment conflict..."

cd /var/www/balkar-landing

# Remove temporary files
rm -f deploy-prebuilt.sh cleanup-vps.sh deploy.sh

# Force pull latest
git fetch origin
git reset --hard origin/main

echo "✅ Fixed! Now run the deployment:"
echo "./deploy-prebuilt.sh"
