#!/bin/bash

# Simple deployment script without Vercel CLI
echo "🚀 Simple Deployment Script"
echo "=========================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Telegram Multi-Function Bot"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  No remote origin found."
    echo "📝 Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/yourusername/telegram-bot.git"
    echo "   git push -u origin main"
    echo ""
    echo "Then deploy via Vercel Web Dashboard:"
    echo "   1. Go to https://vercel.com"
    echo "   2. Login with GitHub"
    echo "   3. Click 'New Project'"
    echo "   4. Import your repository"
    echo "   5. Setup environment variables"
    echo "   6. Deploy!"
    exit 1
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git add .
git commit -m "Update: $(date)"
git push origin main

echo "✅ Code pushed to GitHub!"
echo ""
echo "🌐 Next steps:"
echo "1. Go to https://vercel.com"
echo "2. Login with GitHub"
echo "3. Click 'New Project'"
echo "4. Import your repository"
echo "5. Setup environment variables:"
echo "   - TELEGRAM_BOT_TOKEN: 8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw"
echo "   - FIREBASE_API_KEY: AIzaSyDO9QTPwSLc7YEyEu-vkAewptzRVcWdF78"
echo "   - FIREBASE_PROJECT_ID: telegram-bot-12345"
echo "   - FIREBASE_STORAGE_BUCKET: telegram-bot-12345.appspot.com"
echo "   - FIREBASE_MESSAGING_SENDER_ID: 123456789"
echo "   - FIREBASE_APP_ID: 1:123456789:web:abcdef123456"
echo "6. Deploy!"
echo ""
echo "🔗 After deployment, run:"
echo "   node scripts/setup-webhook-simple.js"
