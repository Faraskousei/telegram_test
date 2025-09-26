#!/bin/bash

echo "🚀 Starting Telegram Multi-Bot Development Server"
echo "================================================"

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔧 Setting up environment..."
if [ ! -f .env.local ]; then
    cp env.local .env.local
    echo "✅ Environment file created"
fi

echo ""
echo "🌐 Starting Next.js development server..."
echo "📱 Frontend will be available at: http://localhost:3000"
echo "🤖 Bot webhook will be set to: http://localhost:3000/api/telegram/webhook"
echo ""

npm run dev
