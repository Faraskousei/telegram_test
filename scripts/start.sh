#!/bin/bash

# Script untuk menjalankan Telegram Multi-Function Bot
echo "🤖 Starting Telegram Multi-Function Bot..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ File .env tidak ditemukan!"
    echo "📝 Silakan copy env.example ke .env dan isi konfigurasi yang diperlukan"
    exit 1
fi

# Load environment variables
export $(cat .env | grep -v '^#' | xargs)

# Check if TELEGRAM_BOT_TOKEN is set
if [ -z "$TELEGRAM_BOT_TOKEN" ]; then
    echo "❌ TELEGRAM_BOT_TOKEN tidak ditemukan di .env"
    exit 1
fi

# Create necessary directories
mkdir -p temp output uploads logs

# Install Python dependencies if requirements.txt exists
if [ -f requirements.txt ]; then
    echo "📦 Installing Python dependencies..."
    pip install -r requirements.txt
fi

# Install Node.js dependencies if package.json exists
if [ -f package.json ]; then
    echo "📦 Installing Node.js dependencies..."
    npm install
fi

# Start API server in background
echo "🚀 Starting API server..."
cd bot
python api_server.py &
API_PID=$!

# Go back to root directory
cd ..

# Start Next.js development server in background
echo "🌐 Starting web dashboard..."
npm run dev &
WEB_PID=$!

# Start Telegram bot
echo "🤖 Starting Telegram bot..."
cd bot
python run_bot.py &
BOT_PID=$!

# Function to cleanup processes
cleanup() {
    echo "🛑 Stopping all processes..."
    kill $API_PID $WEB_PID $BOT_PID 2>/dev/null
    exit 0
}

# Trap Ctrl+C
trap cleanup INT

echo "✅ All services started successfully!"
echo "🌐 Web Dashboard: http://localhost:3000"
echo "🔗 API Server: http://localhost:5000"
echo "🤖 Telegram Bot: Running..."
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for all processes
wait
