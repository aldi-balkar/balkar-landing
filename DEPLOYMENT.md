# Panduan Deploy GagituAldi Landing Page ke VPS

## Informasi
- VPS IP: 202.155.95.166
- Domain: gagitualdi.online
- Repository: https://github.com/aldi-balkar/balkar-landing.git

## Langkah 1: Setup Domain ke VPS

1. Login ke provider domain kamu (Niagahoster/Cloudflare/dll)
2. Tambahkan DNS Record:
   - Type: A
   - Name: @ (atau kosongkan)
   - Value: 202.155.95.166
   - TTL: Auto atau 3600

3. Tambahkan DNS Record untuk www:
   - Type: A
   - Name: www
   - Value: 202.155.95.166
   - TTL: Auto atau 3600

*Catatan: DNS propagation butuh 5-30 menit*

## Langkah 2: Connect ke VPS

```bash
ssh root@202.155.95.166
```

## Langkah 3: Install Dependencies di VPS

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install Nginx
apt install -y nginx

# Install PM2
npm install -g pm2

# Install Git
apt install -y git
```

## Langkah 4: Clone & Setup Project

```bash
# Create directory
mkdir -p /var/www
cd /var/www

# Clone repository
git clone https://github.com/aldi-balkar/balkar-landing.git
cd balkar-landing

# Install dependencies
npm install

# Build project
npm run build
```

## Langkah 5: Setup PM2

```bash
# Start with PM2
pm2 start npm --name "gagitualdi" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
```

## Langkah 6: Setup Nginx

```bash
# Create nginx config
nano /etc/nginx/sites-available/gagitualdi.online
```

Paste konfigurasi ini:

```nginx
server {
    listen 80;
    server_name gagitualdi.online www.gagitualdi.online;

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
```

Kemudian:

```bash
# Enable site
ln -s /etc/nginx/sites-available/gagitualdi.online /etc/nginx/sites-enabled/

# Test nginx config
nginx -t

# Restart nginx
systemctl restart nginx
```

## Langkah 7: Setup SSL (HTTPS)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d gagitualdi.online -d www.gagitualdi.online
```

## Langkah 8: Setup Firewall

```bash
# Allow ports
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```

## Update Website (Jika ada perubahan)

```bash
cd /var/www/balkar-landing
git pull origin main
npm install
npm run build
pm2 restart gagitualdi
```

## Troubleshooting

### Cek status PM2
```bash
pm2 status
pm2 logs gagitualdi
```

### Cek status Nginx
```bash
systemctl status nginx
nginx -t
```

### Cek port 3000
```bash
netstat -tulpn | grep 3000
```

### Restart semua
```bash
pm2 restart gagitualdi
systemctl restart nginx
```

## Website akan live di:
- http://gagitualdi.online (setelah DNS propagation)
- http://202.155.95.166 (langsung)
