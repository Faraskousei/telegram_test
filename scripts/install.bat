@echo off
REM Script instalasi untuk Telegram Multi-Function Bot di Windows

echo 🚀 Installing Telegram Multi-Function Bot...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js tidak ditemukan!
    echo 📥 Silakan install Node.js 18+ dari https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python tidak ditemukan!
    echo 📥 Silakan install Python 3.8+ dari https://python.org/
    pause
    exit /b 1
)

REM Check if pip is installed
pip --version >nul 2>&1
if errorlevel 1 (
    echo ❌ pip tidak ditemukan!
    echo 📥 Silakan install pip untuk Python
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed!

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file...
    copy env.example .env
    echo ⚠️  Silakan edit file .env dan isi TELEGRAM_BOT_TOKEN
)

REM Create necessary directories
echo 📁 Creating directories...
mkdir temp 2>nul
mkdir output 2>nul
mkdir uploads 2>nul
mkdir logs 2>nul

REM Install Node.js dependencies
echo 📦 Installing Node.js dependencies...
npm install

REM Install Python dependencies
echo 📦 Installing Python dependencies...
pip install -r requirements.txt

echo ✅ Installation completed!
echo.
echo 📋 Next steps:
echo 1. Edit file .env dan isi TELEGRAM_BOT_TOKEN
echo 2. Jalankan: scripts\start.bat
echo 3. Buka http://localhost:3000 untuk dashboard
echo.
echo 🤖 Bot siap digunakan!
pause
