# 🚀 Deployment Final - Solusi VPS Low RAM

## Masalah yang Dihadapi
VPS memiliki RAM terbatas (~512MB-1GB) yang tidak cukup untuk:
- `npm install` (keluar dengan SIGKILL)
- `npm run build` (keluar dengan SIGKILL)

## Solusi yang Diterapkan
Build menggunakan **Docker Linux container** di macOS, lalu deploy ke VPS dengan **swap memory**.

## ✅ Yang Sudah Dilakukan

### 1. Build di Docker (Linux-compatible)
```bash
./build-linux.sh
```
Hasil:
- ✅ 549MB node_modules (Linux-compatible)
- ✅ 53MB .next build
- ✅ Semua binary Linux-compatible

### 2. Push ke GitHub
```bash
git add -A && git commit -m "Add Linux-built files" && git push
```
- ✅ Kode sudah di GitHub
- ⚠️ node_modules tidak full ter-push (symlink dan file besar di-ignore Git)

## 🎯 Langkah Deploy ke VPS

### Cara 1: Manual Setup (RECOMMENDED)

1. **SSH ke VPS:**
   ```bash
   ssh root@202.155.95.166
   ```

2. **Setup Swap Memory (2GB):**
   ```bash
   sudo fallocate -l 2G /swapfile
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile
   echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
   free -h  # Cek swap sudah aktif
   ```

3. **Masuk ke direktori project:**
   ```bash
   cd /var/www/balkar-landing
   git pull origin main
   ```

4. **Install dependencies dengan memory limit:**
   ```bash
   NODE_OPTIONS="--max-old-space-size=512" npm ci --omit=dev --legacy-peer-deps
   ```
   
   Ini akan memakan waktu 5-10 menit. Tunggu sampai selesai.

5. **Stop PM2 lama dan start yang baru:**
   ```bash
   pm2 delete gagitualdi 2>/dev/null || true
   pm2 start npm --name gagitualdi -- start
   pm2 save
   pm2 startup systemd -u root --hp /root
   ```

6. **Test:**
   ```bash
   pm2 logs gagitualdi --lines 20
   curl -I http://localhost:3000
   ```

7. **Akses dari browser:**
   ```
   http://202.155.95.166
   ```

### Cara 2: Upload node_modules via rsync (Alternatif)

Jika Cara 1 masih gagal karena RAM, upload node_modules dari lokal:

```bash
# Di macOS:
cd /Users/macbook/Documents/Projects/balkar-landing
tar -czf node_modules.tar.gz node_modules
scp node_modules.tar.gz root@202.155.95.166:/tmp/

# Di VPS:
cd /var/www/balkar-landing
tar -xzf /tmp/node_modules.tar.gz
pm2 restart gagitualdi
```

## 📋 Troubleshooting

### Cek status PM2:
```bash
pm2 status
pm2 logs gagitualdi --lines 50
```

### Cek port 3000:
```bash
netstat -tulpn | grep 3000
curl http://localhost:3000
```

### Cek Nginx:
```bash
systemctl status nginx
curl -I http://localhost
```

### Restart semua:
```bash
pm2 restart gagitualdi
systemctl restart nginx
```

## 🌐 Setup Domain (Setelah Deploy Berhasil)

1. **Konfigurasi DNS di domain provider:**
   - Tambah A Record: `gagitualdi.online` → `202.155.95.166`
   - Tambah A Record: `www.gagitualdi.online` → `202.155.95.166`
   
2. **Tunggu propagasi DNS (5-30 menit)**

3. **Install SSL Certificate:**
   ```bash
   apt install -y certbot python3-certbot-nginx
   certbot --nginx -d gagitualdi.online -d www.gagitualdi.online
   ```

4. **Auto-renewal SSL:**
   ```bash
   certbot renew --dry-run
   ```

## 📝 Update Code di Masa Depan

Setiap kali ada perubahan kode:

### Di MacOS (lokal):
```bash
# 1. Build ulang dengan Docker Linux
./build-linux.sh

# 2. Push ke GitHub
git add -A
git commit -m "Update: description"
git push origin main
```

### Di VPS:
```bash
cd /var/www/balkar-landing
git pull origin main
pm2 restart gagitualdi
```

## ⚡ Spesifikasi Build

- **Build Tool:** Docker (node:20-alpine)
- **Node.js:** 20.x
- **Next.js:** 15.5.11
- **Build Size:** 
  - node_modules: 549MB
  - .next: 53MB
- **Memory Requirement:** 
  - Minimum: 512MB RAM + 2GB Swap
  - Recommended: 2GB RAM

## 🔗 Links

- Repository: https://github.com/aldi-balkar/balkar-landing
- VPS IP: 202.155.95.166
- Domain: gagitualdi.online (pending DNS setup)

---

**Status Deployment:** ⏳ Menunggu eksekusi manual di VPS

**Next Action:** Jalankan command di MANUAL_DEPLOY_STEPS.sh di VPS
