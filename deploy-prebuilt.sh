#!/bin/bash

# Deploy Pre-built Next.js to VPS
# Build di local, deploy hasil build saja

set -e

echo "🚀 Deploying pre-built Next.js app..."

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root${NC}"
    exit 1
fi

echo -e "${BLUE}Step 1: Installing Node.js 20.x...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi

echo -e "${BLUE}Step 2: Installing PM2...${NC}"
npm install -g pm2

echo -e "${BLUE}Step 3: Installing Nginx...${NC}"
apt install -y nginx

echo -e "${BLUE}Step 4: Cloning repository...${NC}"
mkdir -p /var/www
cd /var/www

if [ -d "balkar-landing" ]; then
    cd balkar-landing
    git pull origin main
else
    git clone https://github.com/aldi-balkar/balkar-landing.git
    cd balkar-landing
fi

echo -e "${BLUE}Step 5: Installing production dependencies only...${NC}"
npm ci --only=production

echo -e "${BLUE}Step 6: Setting up PM2...${NC}"
pm2 delete gagitualdi 2>/dev/null || true
pm2 start npm --name "gagitualdi" -- start
pm2 save
pm2 startup

echo -e "${BLUE}Step 7: Configuring Nginx...${NC}"
cat > /etc/nginx/sites-available/gagitualdi.online << 'EOF'
server {
    listen 80;
    server_name gagitualdi.online www.gagitualdi.online 202.155.95.166;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

ln -sf /etc/nginx/sites-available/gagitualdi.online /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl restart nginx
systemctl enable nginx

echo -e "${BLUE}Step 8: Setting up firewall...${NC}"
ufw --force enable
ufw allow 22
ufw allow 80
ufw allow 443

echo -e "${GREEN}✅ Deployment completed!${NC}"
echo ""
echo -e "${GREEN}Website accessible at:${NC}"
echo "  - http://202.155.95.166"
echo "  - http://gagitualdi.online"
