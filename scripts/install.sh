#!/bin/bash

# Script instalasi untuk Telegram Multi-Function Bot
echo "🚀 Installing Telegram Multi-Function Bot..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js tidak ditemukan!"
    echo "📥 Silakan install Node.js 18+ dari https://nodejs.org/"
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 tidak ditemukan!"
    echo "📥 Silakan install Python 3.8+ dari https://python.org/"
    exit 1
fi

# Check if pip is installed
if ! command -v pip &> /dev/null; then
    echo "❌ pip tidak ditemukan!"
    echo "📥 Silakan install pip untuk Python"
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "⚠️  Silakan edit file .env dan isi TELEGRAM_BOT_TOKEN"
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p temp output uploads logs

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Make scripts executable
echo "🔧 Making scripts executable..."
chmod +x scripts/start.sh
chmod +x scripts/install.sh

echo "✅ Installation completed!"
echo ""
echo "📋 Next steps:"
echo "1. Edit file .env dan isi TELEGRAM_BOT_TOKEN"
echo "2. Jalankan: ./scripts/start.sh"
echo "3. Buka http://localhost:3000 untuk dashboard"
echo ""
echo "🤖 Bot siap digunakan!"
