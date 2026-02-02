# 🌐 Setup Domain & SSL Certificate

## ✅ Status Deployment
- **VPS:** 202.155.95.166
- **Next.js:** Running on port 3000 ✅
- **Nginx:** Configured and running ✅
- **Certbot:** Installed ✅
- **Swap:** 2GB enabled ✅

## 📋 Langkah Setup Domain

### 1. Konfigurasi DNS di Domain Provider

Login ke control panel domain `gagitualdi.online` (Niagahoster/Cloudflare/Namecheap/dll) dan tambahkan DNS records:

**DNS A Records:**
```
Type: A
Name: @ (atau kosongkan untuk root domain)
Value: 202.155.95.166
TTL: Auto / 3600

Type: A
Name: www
Value: 202.155.95.166
TTL: Auto / 3600
```

**Tunggu DNS propagasi:** 5-30 menit

**Cek DNS propagasi:**
```bash
# Di macOS/lokal:
nslookup gagitualdi.online
nslookup www.gagitualdi.online

# Atau cek online:
# https://dnschecker.org
```

### 2. Install SSL Certificate (Setelah DNS Active)

Setelah DNS propagasi selesai, jalankan command ini di VPS:

```bash
# SSH ke VPS
ssh root@202.155.95.166

# Install SSL dengan certbot
certbot --nginx -d gagitualdi.online -d www.gagitualdi.online

# Ikuti prompt:
# - Enter email: teamgagitualdi@gmail.com
# - Agree to terms: Yes (Y)
# - Share email: No (N)
```

Certbot akan otomatis:
- Generate SSL certificate dari Let's Encrypt
- Update Nginx config untuk HTTPS
- Redirect HTTP ke HTTPS
- Setup auto-renewal

### 3. Verifikasi SSL

```bash
# Test SSL certificate
curl -I https://gagitualdi.online

# Cek status Nginx
systemctl status nginx

# Cek auto-renewal
certbot renew --dry-run
```

### 4. Akses Website

Setelah SSL terinstall:
- HTTP: http://gagitualdi.online → Auto redirect ke HTTPS
- HTTPS: https://gagitualdi.online ✅
- WWW: https://www.gagitualdi.online ✅

## 🔄 Update Code (Masa Depan)

Setiap kali ada perubahan kode:

**Di macOS (lokal):**
```bash
# 1. Build dengan Docker Linux
./build-linux.sh

# 2. Push ke GitHub
git add -A
git commit -m "Update: description"
git push origin main
```

**Di VPS:**
```bash
ssh root@202.155.95.166
cd /var/www/balkar-landing
git pull origin main
pm2 restart gagitualdi
```

## 🛠️ Troubleshooting

### DNS Tidak Resolve
```bash
# Cek DNS
dig gagitualdi.online
nslookup gagitualdi.online

# Tunggu lebih lama (hingga 24 jam untuk propagasi penuh)
```

### SSL Installation Gagal
```bash
# Cek DNS dulu apakah sudah pointing
curl -I http://gagitualdi.online

# Jika masih error "DNS resolution failed", tunggu DNS propagasi
# Jika DNS OK tapi certbot gagal, cek Nginx config:
nginx -t
systemctl restart nginx
```

### Website Down
```bash
# Cek PM2
pm2 status
pm2 logs gagitualdi --lines 50

# Restart PM2
pm2 restart gagitualdi

# Cek Nginx
systemctl status nginx
systemctl restart nginx
```

## 📊 Monitor

### Cek Status
```bash
# PM2 status
pm2 status

# PM2 logs
pm2 logs gagitualdi --lines 50

# Nginx status
systemctl status nginx

# Memory usage
free -h

# Disk usage
df -h
```

### Performance
```bash
# Cek response time
curl -w "@-" -o /dev/null -s https://gagitualdi.online <<'EOF'
    time_namelookup:  %{time_namelookup}\n
       time_connect:  %{time_connect}\n
    time_appconnect:  %{time_appconnect}\n
      time_redirect:  %{time_redirect}\n
   time_pretransfer:  %{time_pretransfer}\n
 time_starttransfer:  %{time_starttransfer}\n
                    ----------\n
         time_total:  %{time_total}\n
EOF
```

## 🔐 SSL Certificate Info

- **Provider:** Let's Encrypt (Free)
- **Validity:** 90 days
- **Auto-renewal:** Enabled via systemd timer
- **Renewal check:** `certbot renew --dry-run`
- **Certificate location:** `/etc/letsencrypt/live/gagitualdi.online/`

## 📞 Contact Info

- **WhatsApp:** 6285156049096
- **Email:** teamgagitualdi@gmail.com
- **GitHub:** https://github.com/aldi-balkar/balkar-landing

---

**Next Action:** Konfigurasi DNS A records di domain provider, lalu jalankan `certbot --nginx -d gagitualdi.online -d www.gagitualdi.online`
