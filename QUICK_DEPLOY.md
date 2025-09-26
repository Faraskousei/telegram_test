# ⚡ Quick Deploy ke Vercel

Panduan cepat untuk deploy bot Telegram Anda ke Vercel dalam 5 menit!

## 🚀 Langkah 1: Install Vercel CLI
```bash
npm install -g vercel
```

## 🔑 Langkah 2: Login Vercel
```bash
vercel login
```

## 📦 Langkah 3: Deploy Project
```bash
# Di root directory project
vercel

# Pilih:
# - Set up and deploy? Y
# - Link to existing project? N
# - Project name? telegram-multifunction-bot
# - Directory? ./
```

## 🔧 Langkah 4: Setup Environment Variables
```bash
# Set bot token
vercel env add TELEGRAM_BOT_TOKEN
# Masukkan: 8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw

# Set Firebase API key
vercel env add FIREBASE_API_KEY
# Masukkan: AIzaSyDO9QTPwSLc7YEyEu-vkAewptzRVcWdF78

# Set Firebase project ID
vercel env add FIREBASE_PROJECT_ID
# Masukkan: telegram-bot-12345

# Set Firebase storage bucket
vercel env add FIREBASE_STORAGE_BUCKET
# Masukkan: telegram-bot-12345.appspot.com

# Set Firebase messaging sender ID
vercel env add FIREBASE_MESSAGING_SENDER_ID
# Masukkan: 123456789

# Set Firebase app ID
vercel env add FIREBASE_APP_ID
# Masukkan: 1:123456789:web:abcdef123456
```

## 🔄 Langkah 5: Redeploy
```bash
vercel --prod
```

## 🔗 Langkah 6: Setup Webhook
```bash
# Ganti YOUR_APP_URL dengan URL Vercel Anda
export WEBHOOK_URL=https://your-app.vercel.app/api/telegram/webhook

# Setup webhook
node scripts/setup-webhook.js
```

## ✅ Langkah 7: Test Bot
1. Buka Telegram
2. Cari bot Anda
3. Kirim `/start`
4. Test dengan mengirim file

## 🎉 Selesai!
Bot Anda sudah live di Vercel!

**URL Bot**: `https://your-app.vercel.app`
**Dashboard**: `https://your-app.vercel.app`
**Webhook**: `https://your-app.vercel.app/api/telegram/webhook`

## 🆘 Troubleshooting

### Bot tidak merespon?
```bash
# Cek webhook status
curl "https://api.telegram.org/bot8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw/getWebhookInfo"
```

### Webhook error?
```bash
# Reset webhook
curl -X POST "https://api.telegram.org/bot8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw/deleteWebhook"

# Set ulang webhook
node scripts/setup-webhook.js
```

### Firebase error?
1. Cek Firebase project ID
2. Pastikan Firestore database aktif
3. Cek environment variables

---

**🎊 Bot Telegram Multi-Function Anda siap digunakan!**
