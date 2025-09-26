# 🚀 Alternative Deployment Methods

Karena ada masalah dengan npm network, berikut adalah cara alternatif untuk deploy bot Telegram Anda:

## 🌐 Method 1: Deploy via Vercel Web Dashboard

### 1. Push ke GitHub
```bash
# Initialize git jika belum
git init
git add .
git commit -m "Initial commit"

# Push ke GitHub
git remote add origin https://github.com/yourusername/telegram-bot.git
git push -u origin main
```

### 2. Deploy via Vercel Dashboard
1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub
3. Klik "New Project"
4. Import repository Anda
5. Deploy otomatis

### 3. Setup Environment Variables
Di Vercel Dashboard:
- Go to Project Settings → Environment Variables
- Add variables:
  - `TELEGRAM_BOT_TOKEN`: `8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw`
  - `FIREBASE_API_KEY`: `AIzaSyDO9QTPwSLc7YEyEu-vkAewptzRVcWdF78`
  - `FIREBASE_PROJECT_ID`: `telegram-bot-12345`
  - `FIREBASE_STORAGE_BUCKET`: `telegram-bot-12345.appspot.com`
  - `FIREBASE_MESSAGING_SENDER_ID`: `123456789`
  - `FIREBASE_APP_ID`: `1:123456789:web:abcdef123456`

## 🐳 Method 2: Deploy via Docker

### 1. Build Docker Image
```bash
docker build -t telegram-bot .
```

### 2. Run Container
```bash
docker run -d \
  -p 3000:3000 \
  -e TELEGRAM_BOT_TOKEN=8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw \
  -e FIREBASE_API_KEY=AIzaSyDO9QTPwSLc7YEyEu-vkAewptzRVcWdF78 \
  telegram-bot
```

## ☁️ Method 3: Deploy via Railway

### 1. Install Railway CLI
```bash
npm install -g @railway/cli
```

### 2. Login & Deploy
```bash
railway login
railway init
railway up
```

## 🔧 Method 4: Manual Vercel CLI Fix

### 1. Try Different Registry
```bash
npm config set registry https://registry.npmmirror.com/
npm install -g vercel
```

### 2. Or Use Yarn
```bash
npm install -g yarn
yarn global add vercel
```

### 3. Or Use pnpm
```bash
npm install -g pnpm
pnpm add -g vercel
```

## 🌐 Method 5: Deploy via Netlify

### 1. Build Project
```bash
npm run build
```

### 2. Deploy to Netlify
1. Buka [netlify.com](https://netlify.com)
2. Drag & drop folder `out` ke Netlify
3. Setup environment variables
4. Deploy

## 🚀 Method 6: Deploy via Heroku

### 1. Create Heroku App
```bash
# Install Heroku CLI
# Download from heroku.com

# Login
heroku login

# Create app
heroku create telegram-bot-app
```

### 2. Deploy
```bash
git push heroku main
```

## 📱 Method 7: Deploy via Render

### 1. Connect GitHub
1. Buka [render.com](https://render.com)
2. Connect GitHub account
3. Select repository
4. Deploy

## 🔧 Troubleshooting Network Issues

### 1. Check Network
```bash
ping registry.npmjs.org
```

### 2. Use Different DNS
```bash
# Google DNS
nslookup registry.npmjs.org 8.8.8.8

# Cloudflare DNS
nslookup registry.npmjs.org 1.1.1.1
```

### 3. Use Proxy (if behind corporate firewall)
```bash
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

### 4. Use VPN
- Connect to VPN
- Try npm install again

## 🎯 Recommended: Vercel Web Dashboard

**Cara termudah adalah menggunakan Vercel Web Dashboard:**

1. **Push ke GitHub** ✅
2. **Connect ke Vercel** ✅
3. **Setup Environment Variables** ✅
4. **Deploy** ✅

Tidak perlu install Vercel CLI!

## 🚀 Quick Start

```bash
# 1. Push ke GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Buka vercel.com
# 3. Import project
# 4. Setup environment variables
# 5. Deploy!
```

---

**Pilih method yang paling mudah untuk Anda!** 🎉
