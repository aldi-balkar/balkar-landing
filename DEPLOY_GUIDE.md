# 🚀 Cara Deploy Next.js ke VPS Low RAM (512MB-1GB)

## 🎯 Ringkasan Project

**Website:** https://gagitualdi.online  
**VPS:** 202.155.95.166 (Ubuntu, 1GB RAM)  
**Tech Stack:** Next.js 15.5.11, React 19, Tailwind CSS  
**Repository:** https://github.com/aldi-balkar/balkar-landing

---

## ❌ Masalah yang Dihadapi

VPS dengan RAM **512MB-1GB** terlalu kecil untuk:

1. **npm install** - Butuh ~2GB RAM
   - Error: `SIGKILL` (process killed by OS karena out of memory)
   - npm mencoba install 400+ packages sekaligus
   
2. **npm run build** - Butuh ~1.5GB RAM
   - Next.js webpack compilation sangat memory-intensive
   - Error: `JavaScript heap out of memory`

3. **Node modules macOS ≠ Linux**
   - Binary files tidak compatible cross-platform
   - Symlink di `.bin/` folder tidak ter-commit ke Git
   - File metadata macOS (`LIBARCHIVE.xattr.com.apple.provenance`) error di Linux

---

## ✅ Solusi yang Diterapkan

### Strategi 3 Langkah:

#### 1️⃣ Build dengan Docker Linux Container (di macOS)
Menggunakan Docker untuk build di environment Linux yang sama dengan VPS:

```bash
# File: Dockerfile.build
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production=false
COPY . .
RUN npm run build
```

**Kenapa Docker?**
- ✅ Build di Linux environment (Alpine)
- ✅ Binary compatible dengan VPS
- ✅ node_modules/.bin/ symlink benar
- ✅ Tidak ada macOS metadata
- ✅ Build di laptop yang punya RAM cukup

#### 2️⃣ Setup Swap Memory di VPS
Menambah virtual memory 2GB untuk handle npm install:

```bash
# Buat swap file 2GB
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

**Kenapa Swap?**
- ✅ Physical RAM: 1GB
- ✅ Swap: 2GB
- ✅ **Total available: 3GB**
- ✅ Cukup untuk npm install (butuh ~2GB)
- ✅ Gratis, hanya pakai disk space

**Trade-off:**
- ⚠️ Swap lebih lambat dari RAM (pakai disk)
- ⚠️ npm install jadi 5-10 menit (normal: 30 detik)
- ✅ Tapi **berhasil tanpa crash!**

#### 3️⃣ Install Dependencies dengan Memory Limit
Membatasi Node.js heap size agar tidak over-allocate:

```bash
NODE_OPTIONS="--max-old-space-size=512" npm install --legacy-peer-deps --omit=dev
```

**Parameter explanation:**
- `--max-old-space-size=512` = Max heap 512MB (default: 4GB)
- `--legacy-peer-deps` = Skip peer dependency conflicts
- `--omit=dev` = Install production only (skip devDependencies)

---

## 📝 Langkah Deploy Lengkap

### Persiapan Lokal (macOS)

#### 1. Build dengan Docker Linux
```bash
cd /Users/macbook/Documents/Projects/balkar-landing

# Build di Linux container
./build-linux.sh

# Output:
# - node_modules/ (549MB, Linux-compatible)
# - .next/ (53MB, production build)
```

#### 2. Push ke GitHub
```bash
git add -A
git commit -m "Update: your changes"
git push origin main
```

### Setup VPS (Pertama Kali)

#### 1. Login ke VPS
```bash
ssh root@202.155.95.166
```

#### 2. Install Prerequisites
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2 (process manager)
npm install -g pm2

# Install Nginx (reverse proxy)
apt install -y nginx

# Install Certbot (SSL)
apt install -y certbot python3-certbot-nginx
```

#### 3. Setup Swap Memory (PENTING!)
```bash
# Buat 2GB swap
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Verify
free -h
# Output harus:
# Swap: 2.0Gi
```

#### 4. Clone Repository
```bash
cd /var/www
git clone https://github.com/aldi-balkar/balkar-landing.git
cd balkar-landing
```

#### 5. Install Dependencies
```bash
# Dengan memory limit
NODE_OPTIONS="--max-old-space-size=512" npm install --legacy-peer-deps --omit=dev

# Tunggu 5-10 menit (swap lebih lambat dari RAM)
```

#### 6. Start dengan PM2
```bash
pm2 start npm --name gagitualdi -- start
pm2 save
pm2 startup systemd -u root --hp /root
```

#### 7. Configure Nginx
```bash
cat > /etc/nginx/sites-available/gagitualdi << 'EOF'
server {
    listen 80;
    server_name gagitualdi.online www.gagitualdi.online;

    location ^~ /.well-known/acme-challenge/ {
        root /var/www/html;
        allow all;
    }

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

# Enable site
ln -sf /etc/nginx/sites-available/gagitualdi /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

#### 8. Setup SSL (HTTPS)
```bash
# Install SSL certificate
certbot --nginx -d gagitualdi.online -d www.gagitualdi.online \
  --email teamgagitualdi@gmail.com \
  --agree-tos \
  --no-eff-email

# Auto-renewal sudah aktif via systemd timer
```

#### 9. Firewall
```bash
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable
```

---

## 🔄 Update Code (Setelah Deploy Pertama)

### Di Lokal (macOS)
```bash
# 1. Edit code
# 2. Build ulang dengan Docker
./build-linux.sh

# 3. Push ke GitHub
git add -A
git commit -m "Update: your description"
git push origin main
```

### Di VPS
```bash
ssh root@202.155.95.166
cd /var/www/balkar-landing

# Pull update
git pull origin main

# Restart app
pm2 restart gagitualdi

# Check logs
pm2 logs gagitualdi --lines 50
```

---

## 🔍 Monitoring & Troubleshooting

### Cek Status Services
```bash
# PM2 (Next.js)
pm2 status
pm2 logs gagitualdi --lines 50

# Nginx
systemctl status nginx
nginx -t

# Memory usage
free -h

# Disk usage
df -h
```

### Common Issues

#### 1. Website Down
```bash
pm2 restart gagitualdi
systemctl restart nginx
```

#### 2. Out of Memory saat npm install
```bash
# Cek swap
free -h

# Jika swap 0, setup lagi:
sudo swapon /swapfile

# Install ulang dengan limit
NODE_OPTIONS="--max-old-space-size=512" npm install --legacy-peer-deps --omit=dev
```

#### 3. SSL Certificate Expired
```bash
# Test renewal
certbot renew --dry-run

# Force renew
certbot renew --force-renewal
```

---

## 📊 Perbandingan: Sebelum vs Sesudah

### ❌ Tanpa Swap (Gagal)
```
RAM Available: 1GB
npm install: SIGKILL (killed after 200MB allocated)
Build: Cannot run (npm install failed)
Status: ❌ FAILED
```

### ✅ Dengan Swap + Docker Build (Berhasil)
```
Physical RAM: 1GB
Swap: 2GB
Total: 3GB

Build (local Docker): ✅ Success (3 minutes)
npm install (VPS): ✅ Success (8 minutes, using swap)
Runtime: ✅ Stable (PM2 uses ~120MB RAM)
Status: ✅ RUNNING at https://gagitualdi.online
```

---

## 💡 Kenapa Metode Ini Berhasil?

### 1. **Docker Build** (Solve: Binary Compatibility)
- Build di Linux Alpine (sama architecture dengan VPS)
- node_modules binary compatible
- Tidak ada macOS metadata errors

### 2. **Swap Memory** (Solve: RAM Limitation)
- 1GB RAM + 2GB Swap = 3GB total
- npm install butuh ~2GB peak memory
- Swap pakai disk (lambat tapi cukup)

### 3. **Memory Limit Flag** (Solve: Over-allocation)
- Node.js default: allocate 4GB heap (VPS tidak punya)
- `--max-old-space-size=512`: limit to 512MB
- Prevent crash dari over-allocation

### 4. **Production Only** (Solve: Unnecessary Packages)
- `--omit=dev`: skip devDependencies
- Install cuma ~400 packages (bukan 600+)
- Save ~200MB disk & memory

---

## 🎓 Lessons Learned

1. **VPS < 2GB RAM tidak bisa direct build Next.js**
   - Solution: Build di lokal/Docker
   
2. **Swap memory adalah penyelamat untuk budget VPS**
   - Trade-off: Speed vs Cost
   - 2GB swap cukup untuk most cases

3. **Cross-platform builds butuh Docker**
   - macOS → Linux: incompatible binaries
   - Docker: consistent environment

4. **PM2 lebih stable dari npm start langsung**
   - Auto-restart on crash
   - Process management
   - Log management

5. **DNS propagation butuh waktu**
   - 5-30 menit normal
   - Flush cache: `sudo dscacheutil -flushcache`

---

## 📈 Resource Usage (Production)

```
CPU: 2-5% idle, 50-80% saat traffic
RAM: 120MB (PM2) + 400MB (Node.js) = ~520MB
Disk: 1.2GB total (node_modules + build)
Swap: ~300MB used during peak
Network: ~50KB/s average
```

**VPS Minimum Requirement:**
- RAM: 1GB (with 2GB swap)
- CPU: 1 core
- Disk: 10GB
- Bandwidth: 1TB/month

---

## 🔗 Links & Resources

- **Live Site:** https://gagitualdi.online
- **Repository:** https://github.com/aldi-balkar/balkar-landing
- **VPS:** 202.155.95.166
- **Contact:** teamgagitualdi@gmail.com
- **WhatsApp:** 6285156049096

---

## ⚡ Quick Commands Reference

```bash
# Build locally
./build-linux.sh

# Deploy to VPS
ssh root@202.155.95.166
cd /var/www/balkar-landing
git pull
pm2 restart gagitualdi

# Check status
pm2 status
pm2 logs gagitualdi

# Restart everything
pm2 restart gagitualdi
systemctl restart nginx

# SSL renew
certbot renew

# Memory check
free -h
```

---

**🎉 Deploy berhasil dengan VPS 1GB RAM + 2GB Swap!**

Metode ini terbukti berhasil untuk Next.js production deployment di VPS budget dengan RAM terbatas.
