#!/bin/bash

# Script untuk menjalankan tests
echo "🧪 Running Telegram Bot Tests..."

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 tidak ditemukan!"
    exit 1
fi

# Install test dependencies if needed
echo "📦 Installing test dependencies..."
pip install pytest pytest-cov

# Run tests
echo "🚀 Running tests..."
python3 -m pytest tests/ -v --cov=bot --cov-report=html

# Check test results
if [ $? -eq 0 ]; then
    echo "✅ All tests passed!"
    echo "📊 Coverage report generated in htmlcov/"
else
    echo "❌ Some tests failed!"
    exit 1
fi
