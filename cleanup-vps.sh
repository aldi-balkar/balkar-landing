#!/bin/bash

# VPS Cleanup Script - Remove existing web installations
# Run this BEFORE deploying new website

set -e

echo "🧹 Starting VPS cleanup..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root (use sudo)${NC}"
    exit 1
fi

echo -e "${YELLOW}This will remove:${NC}"
echo "  - All PM2 processes"
echo "  - Web directories in /var/www"
echo "  - Nginx configurations"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Cancelled."
    exit 1
fi

echo -e "${RED}Step 1: Stopping and removing PM2 processes...${NC}"
if command -v pm2 &> /dev/null; then
    pm2 delete all 2>/dev/null || true
    pm2 save --force
    echo "✓ PM2 processes cleared"
else
    echo "PM2 not installed, skipping..."
fi

echo -e "${RED}Step 2: Removing web directories...${NC}"
if [ -d "/var/www" ]; then
    rm -rf /var/www/*
    echo "✓ /var/www cleaned"
else
    echo "/var/www not found, skipping..."
fi

echo -e "${RED}Step 3: Removing Nginx site configurations...${NC}"
rm -f /etc/nginx/sites-enabled/* 2>/dev/null || true
rm -f /etc/nginx/sites-available/* 2>/dev/null || true
echo "✓ Nginx sites cleared"

echo -e "${RED}Step 4: Restarting Nginx...${NC}"
if systemctl is-active --quiet nginx; then
    systemctl restart nginx
    echo "✓ Nginx restarted"
else
    echo "Nginx not running, skipping..."
fi

echo -e "${RED}Step 5: Cleaning up processes on port 3000...${NC}"
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
echo "✓ Port 3000 cleared"

echo ""
echo -e "${GREEN}✅ VPS cleanup completed!${NC}"
echo ""
echo -e "${GREEN}Now you can run the deployment script:${NC}"
echo "  curl -o deploy.sh https://raw.githubusercontent.com/aldi-balkar/balkar-landing/main/deploy.sh"
echo "  chmod +x deploy.sh"
echo "  ./deploy.sh"
