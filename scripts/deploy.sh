#!/bin/bash

# Script deployment untuk production
echo "🚀 Deploying Telegram Multi-Function Bot to Production..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker tidak ditemukan!"
    echo "📥 Silakan install Docker dari https://docker.com/"
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose tidak ditemukan!"
    echo "📥 Silakan install Docker Compose"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ File .env tidak ditemukan!"
    echo "📝 Silakan buat file .env dengan konfigurasi production"
    exit 1
fi

# Build and start services
echo "🔨 Building Docker images..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

# Check if services are running
echo "🔍 Checking service status..."
sleep 10

# Check web service
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ Web dashboard is running"
else
    echo "❌ Web dashboard is not responding"
fi

# Check API service
if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ API server is running"
else
    echo "❌ API server is not responding"
fi

echo "🎉 Deployment completed!"
echo ""
echo "📋 Services:"
echo "🌐 Web Dashboard: http://localhost:3000"
echo "🔗 API Server: http://localhost:5000"
echo "🤖 Telegram Bot: Running in background"
echo ""
echo "📊 To view logs:"
echo "docker-compose logs -f"
echo ""
echo "🛑 To stop services:"
echo "docker-compose down"
