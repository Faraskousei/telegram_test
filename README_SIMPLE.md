# 🤖 Telegram Multi-Function Bot

Bot Telegram dengan UI modern dan siap deploy ke Vercel!

## 🚀 Quick Deploy (5 Menit)

### 1. Push ke GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/telegram-bot.git
git push -u origin main
```

### 2. Deploy via Vercel Web Dashboard
1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub
3. Klik "New Project"
4. Import repository Anda
5. Setup environment variables:
   - `TELEGRAM_BOT_TOKEN`: `8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw`
   - `FIREBASE_API_KEY`: `AIzaSyDO9QTPwSLc7YEyEu-vkAewptzRVcWdF78`
   - `FIREBASE_PROJECT_ID`: `telegram-bot-12345`
   - `FIREBASE_STORAGE_BUCKET`: `telegram-bot-12345.appspot.com`
   - `FIREBASE_MESSAGING_SENDER_ID`: `123456789`
   - `FIREBASE_APP_ID`: `1:123456789:web:abcdef123456`
6. Deploy!

### 3. Setup Webhook
```bash
# Set webhook URL (ganti dengan URL Vercel Anda)
export WEBHOOK_URL=https://your-app.vercel.app/api/telegram/webhook

# Setup webhook
node scripts/setup-webhook-simple.js
```

## ✨ Fitur

### 🤖 Bot Telegram
- **PDF → Word** - Konversi PDF ke Word
- **Word → PDF** - Konversi Word ke PDF  
- **JPG → Sticker** - Buat sticker dari gambar
- **Image → PDF** - Konversi gambar ke PDF

### 🌐 Web Dashboard
- **Modern UI** - UI dengan glass morphism
- **Real-time Stats** - Statistik real-time
- **File Upload** - Upload dengan drag & drop
- **Activity Feed** - Monitor aktivitas

### 🔥 Firebase Integration
- **Real-time Database** - Firestore
- **User Management** - Manajemen pengguna
- **Analytics** - Statistik dan analisis
- **File Storage** - Penyimpanan file

## 🎯 Cara Menggunakan

### Bot Telegram
1. Cari bot Anda di Telegram
2. Kirim `/start`
3. Kirim file untuk konversi otomatis

### Web Dashboard
1. Buka URL Vercel Anda
2. Upload file dengan drag & drop
3. Monitor statistik real-time

## 🔧 Troubleshooting

### Bot tidak merespon?
```bash
# Cek webhook status
curl "https://api.telegram.org/bot8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw/getWebhookInfo"
```

### Firebase error?
1. Buat project Firebase baru
2. Enable Firestore Database
3. Update environment variables

### Deploy error?
1. Cek environment variables
2. Pastikan semua dependencies terinstall
3. Cek Vercel logs

## 📱 Test Bot

1. **Test Commands**:
   - `/start` - Menu utama
   - `/help` - Bantuan
   - Kirim file PDF/Word/Gambar

2. **Test Web Dashboard**:
   - Buka URL Vercel
   - Upload file
   - Cek statistik

## 🎉 Selesai!

Bot Anda sudah live dan siap digunakan!

**Bot Token**: `8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw`
**Firebase API**: `AIzaSyDO9QTPwSLc7YEyEu-vkAewptzRVcWdF78`

---

**Selamat! Bot Telegram Multi-Function Anda siap digunakan!** 🚀
