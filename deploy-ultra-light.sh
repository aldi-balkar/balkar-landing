#!/bin/bash

# Ultra Lightweight Deploy - No build, no npm install on VPS
# Everything built locally, just copy and run

set -e

echo "🚀 Ultra lightweight deployment..."

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root"
    exit 1
fi

echo -e "${BLUE}Step 1: Installing minimal requirements...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi

npm install -g pm2 2>/dev/null || true

if ! command -v nginx &> /dev/null; then
    apt install -y nginx
fi

echo -e "${BLUE}Step 2: Pulling pre-built code...${NC}"
mkdir -p /var/www
cd /var/www

if [ -d "balkar-landing" ]; then
    cd balkar-landing
    git fetch origin
    git reset --hard origin/main
else
    git clone https://github.com/aldi-balkar/balkar-landing.git
    cd balkar-landing
fi

echo -e "${BLUE}Step 3: Starting app with PM2...${NC}"
pm2 delete gagitualdi 2>/dev/null || true

# Create start script that doesn't need node_modules
cat > start.js << 'ENDOFFILE'
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = false;
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
ENDOFFILE

pm2 start start.js --name "gagitualdi"
pm2 save
pm2 startup

echo -e "${BLUE}Step 4: Configuring Nginx...${NC}"
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
    }
}
EOF

ln -sf /etc/nginx/sites-available/gagitualdi.online /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl restart nginx

ufw --force enable
ufw allow 22
ufw allow 80
ufw allow 443

echo -e "${GREEN}✅ Deployment completed!${NC}"
echo "Website: http://202.155.95.166"
