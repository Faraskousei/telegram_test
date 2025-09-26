# 🚀 Telegram Multi-Bot - Development Guide

## 📋 Prerequisites

- **Node.js** 18+ 
- **Python** 3.8+
- **Git**

## 🔧 Quick Start

### **Windows:**
```bash
# Clone repository
git clone https://github.com/Faraskousei/telegram_test.git
cd telegram_test

# Run development script
scripts\dev-start.bat
```

### **Linux/Mac:**
```bash
# Clone repository
git clone https://github.com/Faraskousei/telegram_test.git
cd telegram_test

# Make script executable
chmod +x scripts/dev-start.sh

# Run development script
./scripts/dev-start.sh
```

### **Manual Setup:**

#### **1. Install Dependencies:**
```bash
# Frontend dependencies
npm install

# Python dependencies (minimal)
pip install -r requirements-dev.txt
```

#### **2. Setup Environment:**
```bash
# Copy environment file
cp env.local .env.local

# Edit if needed
notepad .env.local  # Windows
nano .env.local     # Linux/Mac
```

#### **3. Start Development Server:**
```bash
# Start Next.js development server
npm run dev
```

## 🌐 Development URLs

- **Frontend**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Bot Page**: http://localhost:3000/bot
- **Webhook**: http://localhost:3000/api/telegram/webhook

## 🔧 Environment Variables

Edit `.env.local` file:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw
WEBHOOK_URL=http://localhost:3000

# Firebase Configuration
FIREBASE_API_KEY=AIzaSyDO9QTPwSLc7YEyEu-vkAewptzRVcWdF78
FIREBASE_PROJECT_ID=telegram-bot-12345
FIREBASE_STORAGE_BUCKET=telegram-bot-12345.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Development Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🤖 Bot Testing

### **1. Test Webhook:**
```bash
# Set webhook to localhost
node scripts/setup-webhook.js
```

### **2. Test Bot:**
1. Open: https://t.me/Backup_indBot
2. Send: `/start`
3. Test file upload

### **3. Test Web Dashboard:**
1. Open: http://localhost:3000/login
2. Login: `admin` / `telegram123`
3. Test file upload

## 📁 Project Structure

```
telegram_test/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── login/             # Login page
│   ├── bot/               # Public bot page
│   └── page.tsx           # Main dashboard
├── components/            # React components
├── lib/                   # Utility libraries
├── scripts/               # Development scripts
├── bot/                   # Python bot (optional)
└── requirements-dev.txt   # Python dependencies
```

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

## 🐛 Troubleshooting

### **Common Issues:**

#### **1. Port 3000 Already in Use:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

#### **2. Python Dependencies Error:**
```bash
# Use minimal dependencies
pip install -r requirements-dev.txt

# Or skip Python dependencies for frontend-only development
```

#### **3. Environment Variables Not Loading:**
```bash
# Check if .env.local exists
ls -la .env.local

# Copy from template
cp env.local .env.local
```

#### **4. Bot Not Responding:**
```bash
# Check webhook status
node scripts/setup-webhook.js

# Or disable webhook for polling
# Edit bot/telegram_bot.py and use polling instead
```

## 📱 Features Available in Development

### **✅ Web Dashboard:**
- 🔐 Login system
- 📁 File upload & conversion
- 📊 Real-time statistics
- 🎨 Modern UI

### **✅ Bot Telegram:**
- 🤖 Interactive commands
- 📄 File conversion
- 🎨 Sticker creation
- 📊 Status & stats

### **✅ Public Bot Page:**
- 🌐 Public access
- 🤖 Bot integration
- 📱 Quick message
- 📖 How to use guide

## 🚀 Production Deployment

For production deployment to Vercel:

```bash
# Push to GitHub
git add .
git commit -m "Development ready"
git push origin main

# Vercel will auto-deploy
# Check: https://vercel.com/frxadz-6046s-projects/faras_tele
```

## 📞 Support

If you encounter any issues:

1. Check console logs
2. Verify environment variables
3. Test webhook connection
4. Check Vercel deployment logs

**Happy Coding! 🎉**
