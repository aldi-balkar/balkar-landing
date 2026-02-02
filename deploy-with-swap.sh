#!/bin/bash

echo "🔧 Setting up VPS for deployment..."

# Enable swap to handle low RAM (if not already enabled)
echo "💾 Setting up swap memory..."
if [ ! -f /swapfile ]; then
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab
    echo "✅ Swap enabled (2GB)"
else
    echo "✅ Swap already exists"
fi

# Navigate to project directory
cd /var/www/balkar-landing

# Clean install with memory optimization
echo "📦 Installing dependencies with memory limits..."
NODE_OPTIONS="--max-old-space-size=512" npm ci --omit=dev --prefer-offline 2>&1 | tee install.log

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
    
    # Stop existing PM2 process
    pm2 delete gagitualdi 2>/dev/null
    
    # Start with direct node command using next standalone
    echo "🚀 Starting Next.js server..."
    pm2 start npm --name gagitualdi -- start
    pm2 save
    pm2 startup systemd -u root --hp /root
    
    echo "✅ Deployment complete!"
    echo "🌐 Website should be accessible at http://202.155.95.166"
else
    echo "❌ Installation failed. Check install.log for details"
    tail -50 install.log
fi
