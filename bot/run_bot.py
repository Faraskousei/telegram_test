#!/usr/bin/env python3
"""
Script untuk menjalankan Telegram Multi-Function Bot
"""

import os
import sys
import asyncio
import logging
from pathlib import Path

# Tambahkan direktori bot ke Python path
bot_dir = Path(__file__).parent
sys.path.insert(0, str(bot_dir))

from telegram_bot import TelegramMultiBot

def setup_logging():
    """Setup logging configuration"""
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler('bot.log'),
            logging.StreamHandler(sys.stdout)
        ]
    )

def check_environment():
    """Check if all required environment variables are set"""
    required_vars = ['TELEGRAM_BOT_TOKEN']
    missing_vars = []
    
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        print(f"❌ Environment variables yang diperlukan: {', '.join(missing_vars)}")
        print("Silakan set environment variables atau buat file .env")
        return False
    
    return True

def create_directories():
    """Create necessary directories"""
    directories = ['temp', 'output', 'uploads']
    
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"✅ Direktori {directory} sudah siap")

def main():
    """Main function"""
    print("🤖 Starting Telegram Multi-Function Bot...")
    
    # Setup logging
    setup_logging()
    
    # Check environment
    if not check_environment():
        sys.exit(1)
    
    # Create directories
    create_directories()
    
    try:
        # Initialize and run bot
        bot = TelegramMultiBot()
        print("✅ Bot initialized successfully")
        print("🚀 Bot is running... Press Ctrl+C to stop")
        
        bot.run()
        
    except KeyboardInterrupt:
        print("\n👋 Bot stopped by user")
    except Exception as e:
        print(f"❌ Error running bot: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
