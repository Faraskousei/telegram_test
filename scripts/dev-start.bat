@echo off
echo 🚀 Starting Telegram Multi-Bot Development Server
echo ================================================

echo.
echo 📦 Installing dependencies...
call npm install

echo.
echo 🔧 Setting up environment...
if not exist .env.local (
    copy env.local .env.local
    echo ✅ Environment file created
)

echo.
echo 🌐 Starting Next.js development server...
echo 📱 Frontend will be available at: http://localhost:3000
echo 🤖 Bot webhook will be set to: http://localhost:3000/api/telegram/webhook
echo.

start "Next.js Dev Server" cmd /k "npm run dev"

echo.
echo ✅ Development server started!
echo.
echo 📋 Available URLs:
echo    🌐 Frontend: http://localhost:3000
echo    🔐 Login: http://localhost:3000/login
echo    🤖 Bot Page: http://localhost:3000/bot
echo    📡 Webhook: http://localhost:3000/api/telegram/webhook
echo.
echo 💡 Tips:
echo    - Use Ctrl+C to stop the server
echo    - Check console for any errors
echo    - Bot will work with webhook on localhost
echo.
pause
