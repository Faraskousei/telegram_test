import os
import asyncio
import aiofiles
from typing import Optional
from PIL import Image
import fitz  # PyMuPDF
from docx import Document
from docx2pdf import convert
import io
import zipfile
from pathlib import Path

class FileProcessor:
    def __init__(self):
        self.temp_dir = "temp"
        self.output_dir = "output"
        os.makedirs(self.temp_dir, exist_ok=True)
        os.makedirs(self.output_dir, exist_ok=True)
    
    async def pdf_to_word(self, pdf_path: str) -> str:
        """Konversi PDF ke Word"""
        try:
            # Buka PDF
            pdf_document = fitz.open(pdf_path)
            doc = Document()
            
            for page_num in range(len(pdf_document)):
                page = pdf_document[page_num]
                text = page.get_text()
                
                if text.strip():
                    # Tambahkan paragraf ke dokumen Word
                    doc.add_paragraph(text)
                    doc.add_page_break()
            
            # Simpan dokumen Word
            output_path = os.path.join(self.output_dir, f"converted_{os.path.basename(pdf_path)}.docx")
            doc.save(output_path)
            pdf_document.close()
            
            return output_path
            
        except Exception as e:
            raise Exception(f"Error converting PDF to Word: {str(e)}")
    
    async def word_to_pdf(self, word_path: str) -> str:
        """Konversi Word ke PDF"""
        try:
            # Generate output path
            output_path = os.path.join(self.output_dir, f"converted_{os.path.basename(word_path)}.pdf")
            
            # Konversi menggunakan docx2pdf
            convert(word_path, output_path)
            
            return output_path
            
        except Exception as e:
            raise Exception(f"Error converting Word to PDF: {str(e)}")
    
    async def create_sticker_pack(self, image_path: str) -> str:
        """Buat sticker pack dari gambar"""
        try:
            # Buka gambar
            with Image.open(image_path) as img:
                # Resize ke ukuran sticker Telegram (512x512)
                img = img.resize((512, 512), Image.Resampling.LANCZOS)
                
                # Konversi ke RGBA jika belum
                if img.mode != 'RGBA':
                    img = img.convert('RGBA')
                
                # Simpan sebagai sticker
                sticker_path = os.path.join(self.output_dir, "sticker.webp")
                img.save(sticker_path, "WEBP", quality=95)
                
                return sticker_path
                
        except Exception as e:
            raise Exception(f"Error creating sticker: {str(e)}")
    
    async def image_to_pdf(self, image_path: str) -> str:
        """Konversi gambar ke PDF"""
        try:
            with Image.open(image_path) as img:
                # Konversi ke RGB jika perlu
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # Simpan sebagai PDF
                output_path = os.path.join(self.output_dir, f"converted_{os.path.basename(image_path)}.pdf")
                img.save(output_path, "PDF", quality=95)
                
                return output_path
                
        except Exception as e:
            raise Exception(f"Error converting image to PDF: {str(e)}")
    
    async def compress_file(self, file_path: str, quality: int = 85) -> str:
        """Kompres file"""
        try:
            file_ext = os.path.splitext(file_path)[1].lower()
            
            if file_ext in ['.jpg', '.jpeg', '.png']:
                # Kompres gambar
                with Image.open(file_path) as img:
                    output_path = os.path.join(self.output_dir, f"compressed_{os.path.basename(file_path)}")
                    
                    if img.mode in ('RGBA', 'LA'):
                        img = img.convert('RGB')
                    
                    img.save(output_path, quality=quality, optimize=True)
                    return output_path
            
            elif file_ext == '.pdf':
                # Kompres PDF
                pdf_document = fitz.open(file_path)
                output_path = os.path.join(self.output_dir, f"compressed_{os.path.basename(file_path)}")
                
                # Simpan dengan kompresi
                pdf_document.save(output_path, garbage=4, deflate=True)
                pdf_document.close()
                
                return output_path
            
            else:
                raise Exception("Format file tidak didukung untuk kompresi")
                
        except Exception as e:
            raise Exception(f"Error compressing file: {str(e)}")
    
    async def generate_qr_code(self, text: str) -> str:
        """Generate QR code dari text"""
        try:
            import qrcode
            
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_L,
                box_size=10,
                border=4,
            )
            qr.add_data(text)
            qr.make(fit=True)
            
            # Buat gambar QR code
            qr_image = qr.make_image(fill_color="black", back_color="white")
            
            # Simpan gambar
            output_path = os.path.join(self.output_dir, "qr_code.png")
            qr_image.save(output_path)
            
            return output_path
            
        except Exception as e:
            raise Exception(f"Error generating QR code: {str(e)}")
    
    async def text_to_speech(self, text: str, language: str = 'id') -> str:
        """Konversi text ke speech"""
        try:
            from gtts import gTTS
            import pygame
            
            # Generate TTS
            tts = gTTS(text=text, lang=language, slow=False)
            
            # Simpan sebagai MP3
            output_path = os.path.join(self.output_dir, "speech.mp3")
            tts.save(output_path)
            
            return output_path
            
        except Exception as e:
            raise Exception(f"Error generating speech: {str(e)}")
    
    def cleanup_temp_files(self):
        """Bersihkan file temporary"""
        try:
            for file in os.listdir(self.temp_dir):
                file_path = os.path.join(self.temp_dir, file)
                if os.path.isfile(file_path):
                    os.remove(file_path)
        except Exception as e:
            print(f"Error cleaning temp files: {e}")
    
    def get_file_info(self, file_path: str) -> dict:
        """Dapatkan informasi file"""
        try:
            stat = os.stat(file_path)
            return {
                'size': stat.st_size,
                'size_mb': round(stat.st_size / (1024 * 1024), 2),
                'modified': stat.st_mtime
            }
        except Exception as e:
            return {'error': str(e)}
