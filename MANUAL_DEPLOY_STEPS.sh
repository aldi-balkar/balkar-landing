#!/bin/bash
# INSTRUKSI: Copy semua command di bawah ini dan paste langsung di terminal VPS

# 1. Setup Swap Memory (2GB)
echo "💾 Setting up 2GB swap..."
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
free -h

# 2. Masuk ke direktori project
cd /var/www/balkar-landing

# 3. Install dependencies dengan memory limit
echo "📦 Installing dependencies..."
NODE_OPTIONS="--max-old-space-size=512" npm ci --omit=dev --legacy-peer-deps

# 4. Stop PM2 yang lama
pm2 delete gagitualdi 2>/dev/null || true

# 5. Start dengan PM2
pm2 start npm --name gagitualdi -- start
pm2 save
pm2 startup systemd -u root --hp /root

# 6. Test
echo "🧪 Testing..."
sleep 5
curl -I http://localhost:3000

echo "✅ Done! Check http://202.155.95.166"
