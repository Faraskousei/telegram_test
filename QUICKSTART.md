# 🚀 Quick Start Guide

Panduan cepat untuk menjalankan Telegram Multi-Function Bot dalam 5 menit!

## ⚡ Instalasi Cepat

### 1. Prerequisites
Pastikan sudah terinstall:
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Python 3.8+** - [Download](https://python.org/)
- **Git** - [Download](https://git-scm.com/)

### 2. Clone & Setup
```bash
# Clone repository
git clone <repository-url>
cd telegram-multifunction-bot

# Install dependencies (Windows)
scripts\install.bat

# Install dependencies (Linux/Mac)
./scripts/install.sh
```

### 3. Konfigurasi Bot
```bash
# Edit file .env
TELEGRAM_BOT_TOKEN=your_bot_token_here
WEBHOOK_URL=http://localhost:3000
```

**Cara mendapatkan Bot Token:**
1. Buka [@BotFather](https://t.me/botfather) di Telegram
2. Ketik `/newbot`
3. Ikuti instruksi untuk membuat bot
4. Copy token yang diberikan
5. Paste ke file `.env`

### 4. Jalankan Bot
```bash
# Windows
scripts\start.bat

# Linux/Mac
./scripts/start.sh
```

### 5. Akses Dashboard
Buka browser dan kunjungi:
- **Web Dashboard**: http://localhost:3000
- **API Server**: http://localhost:5000

## 🤖 Cara Menggunakan Bot

### Perintah Dasar
- `/start` - Mulai bot
- `/help` - Bantuan
- `/status` - Status bot

### Konversi File
1. **PDF → Word**: Kirim file PDF
2. **Word → PDF**: Kirim file Word (.doc/.docx)
3. **JPG → Sticker**: Kirim gambar JPG/PNG
4. **Image → PDF**: Kirim gambar untuk konversi PDF

### Web Dashboard
- Upload file dengan drag & drop
- Lihat statistik real-time
- Monitor aktivitas pengguna
- Download hasil konversi

## 🔧 Troubleshooting

### Bot tidak merespon
```bash
# Cek apakah bot token benar
echo $TELEGRAM_BOT_TOKEN

# Restart bot
# Tekan Ctrl+C untuk stop, lalu jalankan ulang
```

### Port sudah digunakan
```bash
# Cek port yang digunakan
netstat -an | findstr :3000
netstat -an | findstr :5000

# Kill process yang menggunakan port
taskkill /PID <process_id> /F
```

### Dependencies error
```bash
# Reinstall dependencies
npm install
pip install -r requirements.txt
```

### File upload gagal
- Pastikan file < 20MB
- Cek format file yang didukung
- Pastikan direktori `uploads/` ada

## 📱 Testing Bot

### Test Konversi
1. Kirim file PDF ke bot
2. Tunggu proses konversi
3. Download file Word hasil
4. Cek kualitas konversi

### Test Web Dashboard
1. Buka http://localhost:3000
2. Upload file melalui web
3. Cek hasil di dashboard
4. Download file hasil

## 🚀 Production Deployment

### Docker Deployment
```bash
# Build dan run dengan Docker
docker-compose up --build -d

# Cek status
docker-compose ps

# View logs
docker-compose logs -f
```

### Manual Deployment
```bash
# Install PM2 untuk process management
npm install -g pm2

# Start services
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 📊 Monitoring

### Health Check
- **Web**: http://localhost:3000/api/health
- **API**: http://localhost:5000/api/health

### Logs
```bash
# View bot logs
tail -f bot.log

# View web logs
npm run dev

# View API logs
python bot/api_server.py
```

## 🆘 Support

### Dokumentasi Lengkap
- [README.md](README.md) - Dokumentasi lengkap
- [CONTRIBUTING.md](CONTRIBUTING.md) - Panduan kontribusi
- [CHANGELOG.md](CHANGELOG.md) - Riwayat perubahan

### Bantuan
- **GitHub Issues**: Laporkan bug atau request fitur
- **Telegram**: [Bot Support](https://t.me/your_bot_support)
- **Email**: support@yourdomain.com

## 🎯 Next Steps

Setelah bot berjalan dengan sukses:

1. **Customize Bot**: Edit pesan dan fitur sesuai kebutuhan
2. **Add Features**: Implementasi fitur tambahan
3. **Scale Up**: Deploy ke production server
4. **Monitor**: Setup monitoring dan alerting
5. **Backup**: Implementasi backup strategy

## 🔥 Tips & Tricks

### Optimasi Performance
- Gunakan SSD untuk storage
- Setup Redis untuk caching
- Implementasi CDN untuk static files
- Monitor memory usage

### Security
- Gunakan HTTPS di production
- Setup firewall rules
- Implementasi rate limiting
- Regular security updates

### Maintenance
- Backup database reguler
- Monitor disk space
- Update dependencies
- Review logs untuk error

---

**Selamat! Bot Telegram Multi-Function Anda sudah siap digunakan! 🎉**

Jika mengalami masalah, jangan ragu untuk bertanya di GitHub Issues atau Telegram support.
