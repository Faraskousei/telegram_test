@echo off
REM Script untuk menjalankan Telegram Multi-Function Bot di Windows

echo 🤖 Starting Telegram Multi-Function Bot...

REM Check if .env file exists
if not exist .env (
    echo ❌ File .env tidak ditemukan!
    echo 📝 Silakan copy env.example ke .env dan isi konfigurasi yang diperlukan
    pause
    exit /b 1
)

REM Create necessary directories
mkdir temp 2>nul
mkdir output 2>nul
mkdir uploads 2>nul
mkdir logs 2>nul

REM Install Python dependencies if requirements.txt exists
if exist requirements.txt (
    echo 📦 Installing Python dependencies...
    pip install -r requirements.txt
)

REM Install Node.js dependencies if package.json exists
if exist package.json (
    echo 📦 Installing Node.js dependencies...
    npm install
)

REM Start API server in background
echo 🚀 Starting API server...
start "API Server" cmd /c "cd bot && python api_server.py"

REM Start Next.js development server in background
echo 🌐 Starting web dashboard...
start "Web Dashboard" cmd /c "npm run dev"

REM Start Telegram bot
echo 🤖 Starting Telegram bot...
cd bot
python run_bot.py

echo ✅ All services started successfully!
echo 🌐 Web Dashboard: http://localhost:3000
echo 🔗 API Server: http://localhost:5000
echo 🤖 Telegram Bot: Running...

pause
