from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import json
from database import Database
from file_processor import FileProcessor
import asyncio
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Konfigurasi
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 20 * 1024 * 1024  # 20MB max

# Inisialisasi
db = Database()
file_processor = FileProcessor()

# Buat direktori upload jika belum ada
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Dapatkan statistik bot"""
    try:
        stats = db.get_bot_stats()
        return jsonify({
            'success': True,
            'data': stats
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/activity', methods=['GET'])
def get_activity():
    """Dapatkan aktivitas terbaru"""
    try:
        limit = request.args.get('limit', 10, type=int)
        activity = db.get_recent_activity(limit)
        return jsonify({
            'success': True,
            'data': activity
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/convert', methods=['POST'])
def convert_file():
    """Konversi file"""
    try:
        if 'file' not in request.files:
            return jsonify({
                'success': False,
                'error': 'Tidak ada file yang diupload'
            }), 400
        
        file = request.files['file']
        conversion_type = request.form.get('type', 'auto')
        
        if file.filename == '':
            return jsonify({
                'success': False,
                'error': 'File tidak dipilih'
            }), 400
        
        if not allowed_file(file.filename):
            return jsonify({
                'success': False,
                'error': 'Format file tidak didukung'
            }), 400
        
        # Simpan file
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Tentukan jenis konversi
        file_ext = filename.lower().split('.')[-1]
        
        if conversion_type == 'auto':
            if file_ext == 'pdf':
                conversion_type = 'pdf-to-word'
            elif file_ext in ['doc', 'docx']:
                conversion_type = 'word-to-pdf'
            elif file_ext in ['jpg', 'jpeg', 'png']:
                conversion_type = 'image-to-pdf'
        
        # Proses konversi
        result = asyncio.run(process_conversion(file_path, conversion_type))
        
        return jsonify({
            'success': True,
            'data': {
                'original_file': filename,
                'converted_file': result['filename'],
                'conversion_type': conversion_type,
                'download_url': f'/api/download/{result["filename"]}'
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

async def process_conversion(file_path: str, conversion_type: str):
    """Proses konversi file"""
    try:
        if conversion_type == 'pdf-to-word':
            result_path = await file_processor.pdf_to_word(file_path)
        elif conversion_type == 'word-to-pdf':
            result_path = await file_processor.word_to_pdf(file_path)
        elif conversion_type == 'image-to-pdf':
            result_path = await file_processor.image_to_pdf(file_path)
        elif conversion_type == 'jpg-to-sticker':
            result_path = await file_processor.create_sticker_pack(file_path)
        else:
            raise Exception('Jenis konversi tidak didukung')
        
        return {
            'filename': os.path.basename(result_path),
            'path': result_path
        }
        
    except Exception as e:
        raise Exception(f'Error processing conversion: {str(e)}')

@app.route('/api/download/<filename>')
def download_file(filename):
    """Download file hasil konversi"""
    try:
        file_path = os.path.join('output', filename)
        if os.path.exists(file_path):
            return send_file(file_path, as_attachment=True)
        else:
            return jsonify({
                'success': False,
                'error': 'File tidak ditemukan'
            }), 404
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/qr', methods=['POST'])
def generate_qr():
    """Generate QR code"""
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text:
            return jsonify({
                'success': False,
                'error': 'Text tidak boleh kosong'
            }), 400
        
        result_path = asyncio.run(file_processor.generate_qr_code(text))
        
        return jsonify({
            'success': True,
            'data': {
                'filename': os.path.basename(result_path),
                'download_url': f'/api/download/{os.path.basename(result_path)}'
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/tts', methods=['POST'])
def text_to_speech():
    """Text to Speech"""
    try:
        data = request.get_json()
        text = data.get('text', '')
        language = data.get('language', 'id')
        
        if not text:
            return jsonify({
                'success': False,
                'error': 'Text tidak boleh kosong'
            }), 400
        
        result_path = asyncio.run(file_processor.text_to_speech(text, language))
        
        return jsonify({
            'success': True,
            'data': {
                'filename': os.path.basename(result_path),
                'download_url': f'/api/download/{os.path.basename(result_path)}'
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/compress', methods=['POST'])
def compress_file():
    """Kompres file"""
    try:
        if 'file' not in request.files:
            return jsonify({
                'success': False,
                'error': 'Tidak ada file yang diupload'
            }), 400
        
        file = request.files['file']
        quality = int(request.form.get('quality', 85))
        
        if not allowed_file(file.filename):
            return jsonify({
                'success': False,
                'error': 'Format file tidak didukung'
            }), 400
        
        # Simpan file
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Kompres file
        result_path = asyncio.run(file_processor.compress_file(file_path, quality))
        
        return jsonify({
            'success': True,
            'data': {
                'original_file': filename,
                'compressed_file': os.path.basename(result_path),
                'download_url': f'/api/download/{os.path.basename(result_path)}'
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': str(datetime.now())
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
