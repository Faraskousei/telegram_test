# 🚀 Deployment Guide - Vercel

Panduan lengkap untuk deploy Telegram Multi-Function Bot ke Vercel.

## 📋 Prerequisites

- Akun Vercel (gratis)
- Akun Firebase (gratis)
- Bot Token Telegram (sudah ada)
- Git repository

## 🔧 Setup Firebase

### 1. Buat Project Firebase
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Create a project"
3. Nama project: `telegram-bot-12345`
4. Enable Google Analytics (opsional)

### 2. Setup Firestore Database
1. Di Firebase Console, pilih "Firestore Database"
2. Klik "Create database"
3. Pilih "Start in test mode"
4. Pilih lokasi terdekat (asia-southeast1)

### 3. Setup Authentication
1. Pilih "Authentication" di sidebar
2. Klik "Get started"
3. Pilih "Email/Password" provider
4. Enable jika diperlukan

### 4. Setup Storage
1. Pilih "Storage" di sidebar
2. Klik "Get started"
3. Pilih "Start in test mode"
4. Pilih lokasi terdekat

### 5. Dapatkan Firebase Config
1. Pilih "Project settings" (gear icon)
2. Scroll ke "Your apps"
3. Klik "Add app" → Web app
4. Nama app: `telegram-bot-web`
5. Copy config object

## 🚀 Deploy ke Vercel

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login ke Vercel
```bash
vercel login
```

### 3. Deploy Project
```bash
# Di root directory project
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (pilih akun Anda)
# - Link to existing project? N
# - Project name? telegram-multifunction-bot
# - Directory? ./
# - Override settings? N
```

### 4. Setup Environment Variables
```bash
# Set environment variables di Vercel
vercel env add TELEGRAM_BOT_TOKEN
# Masukkan: 8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw

vercel env add FIREBASE_API_KEY
# Masukkan: AIzaSyDO9QTPwSLc7YEyEu-vkAewptzRVcWdF78

vercel env add FIREBASE_PROJECT_ID
# Masukkan: telegram-bot-12345

vercel env add FIREBASE_STORAGE_BUCKET
# Masukkan: telegram-bot-12345.appspot.com

vercel env add FIREBASE_MESSAGING_SENDER_ID
# Masukkan: 123456789

vercel env add FIREBASE_APP_ID
# Masukkan: 1:123456789:web:abcdef123456
```

### 5. Redeploy dengan Environment Variables
```bash
vercel --prod
```

## 🔗 Setup Webhook Telegram

### 1. Jalankan Script Setup Webhook
```bash
# Set environment variable
export WEBHOOK_URL=https://your-app.vercel.app/api/telegram/webhook

# Jalankan script
node scripts/setup-webhook.js
```

### 2. Manual Setup (Alternatif)
```bash
curl -X POST "https://api.telegram.org/bot8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-app.vercel.app/api/telegram/webhook",
    "allowed_updates": ["message", "callback_query"]
  }'
```

## 🧪 Testing Deployment

### 1. Test Webhook
```bash
# Cek webhook info
curl "https://api.telegram.org/bot8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw/getWebhookInfo"
```

### 2. Test Bot
1. Buka Telegram
2. Cari bot Anda
3. Kirim `/start`
4. Test dengan mengirim file

### 3. Test Web Dashboard
1. Buka `https://your-app.vercel.app`
2. Cek apakah dashboard load
3. Test upload file
4. Cek Firebase data

## 🔧 Troubleshooting

### Bot tidak merespon
```bash
# Cek webhook status
curl "https://api.telegram.org/bot8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw/getWebhookInfo"

# Reset webhook
curl -X POST "https://api.telegram.org/bot8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw/deleteWebhook"
```

### Firebase connection error
1. Cek Firebase config di `lib/firebase.ts`
2. Pastikan project ID benar
3. Cek Firestore rules

### Vercel deployment error
```bash
# Cek logs
vercel logs

# Redeploy
vercel --prod --force
```

## 📊 Monitoring

### 1. Vercel Analytics
- Buka Vercel Dashboard
- Pilih project
- Lihat "Analytics" tab

### 2. Firebase Analytics
- Buka Firebase Console
- Pilih "Analytics"
- Lihat real-time data

### 3. Bot Analytics
- Buka web dashboard
- Lihat statistics
- Monitor user activity

## 🔄 Updates & Maintenance

### 1. Update Code
```bash
# Push ke Git
git add .
git commit -m "Update features"
git push

# Auto deploy ke Vercel
```

### 2. Update Environment Variables
```bash
vercel env add NEW_VARIABLE
vercel --prod
```

### 3. Database Backup
```bash
# Export Firestore data
gcloud firestore export gs://your-bucket/backup
```

## 🎯 Production Checklist

- [ ] Environment variables set
- [ ] Firebase project configured
- [ ] Webhook URL set
- [ ] Bot responding to commands
- [ ] File upload working
- [ ] Database storing data
- [ ] Web dashboard accessible
- [ ] Error handling working
- [ ] Security rules configured
- [ ] Monitoring setup

## 🆘 Support

### Common Issues
1. **Webhook not working**: Cek URL dan SSL certificate
2. **Firebase permission denied**: Cek Firestore rules
3. **File upload failed**: Cek Vercel function timeout
4. **Bot not responding**: Cek webhook status

### Debug Commands
```bash
# Test webhook locally
curl -X POST http://localhost:3000/api/telegram/webhook \
  -H "Content-Type: application/json" \
  -d '{"message":{"from":{"id":123,"first_name":"Test"},"chat":{"id":123},"text":"/start"}}'

# Check Vercel function logs
vercel logs --follow
```

---

**🎉 Selamat! Bot Telegram Multi-Function Anda sudah live di Vercel!**

Bot URL: `https://your-app.vercel.app`
Webhook: `https://your-app.vercel.app/api/telegram/webhook`
Dashboard: `https://your-app.vercel.app`
