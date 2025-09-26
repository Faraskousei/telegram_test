import os
import logging
import asyncio
from typing import Dict, Any
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, CallbackQueryHandler, filters, ContextTypes
from telegram.constants import ParseMode
import requests
from dotenv import load_dotenv
from file_processor import FileProcessor
from database import Database

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

class TelegramMultiBot:
    def __init__(self):
        self.token = os.getenv('TELEGRAM_BOT_TOKEN', '8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw')
        self.webhook_url = os.getenv('WEBHOOK_URL', 'https://your-app.vercel.app')
        self.file_processor = FileProcessor()
        self.db = Database()
        
        if not self.token:
            raise ValueError("TELEGRAM_BOT_TOKEN tidak ditemukan di environment variables")
    
    async def start(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handler untuk command /start"""
        user = update.effective_user
        welcome_message = f"""
🤖 **Selamat datang di Multi-Function Bot!**

Halo {user.first_name}! 👋

Saya adalah bot yang dapat membantu Anda dengan berbagai tugas:

📄 **Konversi Dokumen:**
• PDF → Word
• Word → PDF
• Image → PDF

🎨 **Sticker & Media:**
• JPG → Sticker Pack
• Image Resize & Optimize
• Format Converter

🔧 **Tools Lainnya:**
• Text to Speech
• QR Code Generator
• File Compressor

Ketik /help untuk melihat semua perintah yang tersedia!
        """
        
        keyboard = [
            [InlineKeyboardButton("📄 Konversi Dokumen", callback_data="convert_docs")],
            [InlineKeyboardButton("🎨 Buat Sticker", callback_data="create_sticker")],
            [InlineKeyboardButton("🔧 Tools Lainnya", callback_data="other_tools")],
            [InlineKeyboardButton("ℹ️ Bantuan", callback_data="help")]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(
            welcome_message,
            parse_mode=ParseMode.MARKDOWN,
            reply_markup=reply_markup
        )
    
    async def help_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handler untuk command /help"""
        help_text = """
📋 **Daftar Perintah:**

**Konversi Dokumen:**
• Kirim file PDF → otomatis konversi ke Word
• Kirim file Word → otomatis konversi ke PDF
• Kirim gambar → buat sticker pack

**Perintah Khusus:**
• /convert - Menu konversi file
• /sticker - Buat sticker dari gambar
• /compress - Kompres file
• /qr - Generate QR code dari text
• /tts - Text to Speech

**Informasi:**
• /status - Status bot
• /stats - Statistik penggunaan
• /help - Bantuan ini

**Cara Penggunaan:**
1. Kirim file yang ingin dikonversi
2. Bot akan memproses secara otomatis
3. Download hasil konversi
        """
        
        await update.message.reply_text(help_text, parse_mode=ParseMode.MARKDOWN)
    
    async def handle_document(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handler untuk file dokumen"""
        document = update.message.document
        file_id = document.file_id
        file_name = document.file_name
        file_size = document.file_size
        
        # Cek ukuran file (max 20MB)
        if file_size > 20 * 1024 * 1024:
            await update.message.reply_text("❌ File terlalu besar! Maksimal 20MB.")
            return
        
        # Tampilkan status processing
        processing_msg = await update.message.reply_text(
            f"⏳ Memproses file: {file_name}\n"
            f"📊 Ukuran: {(file_size / 1024 / 1024):.2f} MB\n"
            f"🔄 Mohon tunggu..."
        )
        
        try:
            # Download file
            file = await context.bot.get_file(file_id)
            file_path = f"temp/{file_name}"
            
            # Buat direktori temp jika belum ada
            os.makedirs("temp", exist_ok=True)
            
            # Download file
            await file.download_to_drive(file_path)
            
            # Tentukan jenis konversi berdasarkan ekstensi
            file_extension = file_name.lower().split('.')[-1]
            
            if file_extension == 'pdf':
                # PDF to Word
                result_path = await self.file_processor.pdf_to_word(file_path)
                await self.send_converted_file(update, context, result_path, "Word", processing_msg)
                
            elif file_extension in ['doc', 'docx']:
                # Word to PDF
                result_path = await self.file_processor.word_to_pdf(file_path)
                await self.send_converted_file(update, context, result_path, "PDF", processing_msg)
                
            else:
                await processing_msg.edit_text("❌ Format file tidak didukung!")
                
        except Exception as e:
            logger.error(f"Error processing document: {e}")
            await processing_msg.edit_text("❌ Error saat memproses file!")
    
    async def handle_photo(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handler untuk foto/gambar"""
        photo = update.message.photo[-1]  # Ambil foto dengan resolusi tertinggi
        file_id = photo.file_id
        
        processing_msg = await update.message.reply_text(
            "⏳ Memproses gambar untuk sticker...\n🔄 Mohon tunggu..."
        )
        
        try:
            # Download foto
            file = await context.bot.get_file(file_id)
            file_path = "temp/sticker_image.jpg"
            
            os.makedirs("temp", exist_ok=True)
            await file.download_to_drive(file_path)
            
            # Buat sticker pack
            sticker_path = await self.file_processor.create_sticker_pack(file_path)
            
            # Kirim sticker
            with open(sticker_path, 'rb') as sticker_file:
                await context.bot.send_sticker(
                    chat_id=update.effective_chat.id,
                    sticker=sticker_file
                )
            
            await processing_msg.edit_text("✅ Sticker berhasil dibuat!")
            
        except Exception as e:
            logger.error(f"Error processing photo: {e}")
            await processing_msg.edit_text("❌ Error saat membuat sticker!")
    
    async def send_converted_file(self, update: Update, context: ContextTypes.DEFAULT_TYPE, 
                                file_path: str, file_type: str, processing_msg):
        """Kirim file yang sudah dikonversi"""
        try:
            with open(file_path, 'rb') as converted_file:
                await context.bot.send_document(
                    chat_id=update.effective_chat.id,
                    document=converted_file,
                    caption=f"✅ File berhasil dikonversi ke {file_type}!"
                )
            
            await processing_msg.edit_text("✅ Konversi berhasil!")
            
            # Hapus file temporary
            os.remove(file_path)
            
        except Exception as e:
            logger.error(f"Error sending converted file: {e}")
            await processing_msg.edit_text("❌ Error saat mengirim file!")
    
    async def button_callback(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handler untuk button callback"""
        query = update.callback_query
        await query.answer()
        
        if query.data == "convert_docs":
            await query.edit_message_text(
                "📄 **Konversi Dokumen**\n\n"
                "Kirim file yang ingin dikonversi:\n"
                "• PDF → Word\n"
                "• Word → PDF\n"
                "• Image → PDF"
            )
            
        elif query.data == "create_sticker":
            await query.edit_message_text(
                "🎨 **Buat Sticker**\n\n"
                "Kirim gambar yang ingin dijadikan sticker.\n"
                "Format yang didukung: JPG, PNG"
            )
            
        elif query.data == "other_tools":
            keyboard = [
                [InlineKeyboardButton("🔊 Text to Speech", callback_data="tts")],
                [InlineKeyboardButton("📱 QR Code Generator", callback_data="qr")],
                [InlineKeyboardButton("🗜️ File Compressor", callback_data="compress")],
                [InlineKeyboardButton("🔙 Kembali", callback_data="back_main")]
            ]
            reply_markup = InlineKeyboardMarkup(keyboard)
            await query.edit_message_text(
                "🔧 **Tools Lainnya**\n\nPilih tool yang ingin digunakan:",
                reply_markup=reply_markup
            )
            
        elif query.data == "help":
            await self.help_command(update, context)
            
        elif query.data == "back_main":
            await self.start(update, context)
    
    async def error_handler(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handler untuk error"""
        logger.error(f"Update {update} caused error {context.error}")
    
    def run(self):
        """Jalankan bot"""
        # Buat application
        application = Application.builder().token(self.token).build()
        
        # Tambahkan handlers
        application.add_handler(CommandHandler("start", self.start))
        application.add_handler(CommandHandler("help", self.help_command))
        application.add_handler(MessageHandler(filters.Document.ALL, self.handle_document))
        application.add_handler(MessageHandler(filters.PHOTO, self.handle_photo))
        application.add_handler(CallbackQueryHandler(self.button_callback))
        
        # Error handler
        application.add_error_handler(self.error_handler)
        
        # Jalankan bot
        logger.info("Bot starting...")
        application.run_polling()

if __name__ == "__main__":
    bot = TelegramMultiBot()
    bot.run()
