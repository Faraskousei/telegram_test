# 🤖 Telegram Multi-Function Bot

Bot Telegram yang sangat multi-fungsi dengan web dashboard untuk konversi file, pembuatan sticker, dan berbagai tools lainnya.

## ✨ Fitur Utama

### 📄 Konversi Dokumen
- **PDF → Word**: Konversi file PDF menjadi dokumen Word dengan kualitas tinggi
- **Word → PDF**: Ubah dokumen Word menjadi file PDF yang rapi
- **Image → PDF**: Konversi gambar menjadi file PDF

### 🎨 Sticker & Media
- **JPG → Sticker Pack**: Buat sticker pack dari gambar
- **Image Resize & Optimize**: Optimasi ukuran dan kualitas gambar
- **Format Converter**: Konversi berbagai format file

### 🔧 Tools Lainnya
- **Text to Speech**: Konversi text menjadi audio
- **QR Code Generator**: Buat QR code dari text
- **File Compressor**: Kompres file untuk menghemat ruang
- **AI Processing**: Pemrosesan file dengan teknologi AI

## 🚀 Teknologi yang Digunakan

### Frontend (Web Dashboard)
- **Next.js 14** - React framework dengan App Router
- **TypeScript** - Type safety dan developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Dropzone** - File upload dengan drag & drop
- **React Hot Toast** - Notifications

### Backend (Bot & API)
- **Python 3.8+** - Programming language
- **python-telegram-bot** - Telegram Bot API wrapper
- **Flask** - Web framework untuk API
- **SQLite** - Database untuk menyimpan data
- **Pillow (PIL)** - Image processing
- **PyMuPDF** - PDF processing
- **python-docx** - Word document processing
- **docx2pdf** - Word to PDF conversion

## 📦 Instalasi

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd telegram-multifunction-bot
```

### 2. Setup Environment Variables
```bash
cp env.example .env
```

Edit file `.env` dan isi dengan konfigurasi yang sesuai:
```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
WEBHOOK_URL=http://localhost:3000
```

### 3. Install Dependencies

#### Frontend (Next.js)
```bash
npm install
```

#### Backend (Python)
```bash
pip install -r requirements.txt
```

### 4. Setup Database
Database akan dibuat otomatis saat pertama kali menjalankan bot.

### 5. Buat Direktori yang Diperlukan
```bash
mkdir -p temp output uploads
```

## 🎯 Cara Menjalankan

### 1. Jalankan Web Dashboard
```bash
npm run dev
```
Dashboard akan tersedia di `http://localhost:3000`

### 2. Jalankan API Server
```bash
cd bot
python api_server.py
```
API server akan berjalan di `http://localhost:5000`

### 3. Jalankan Telegram Bot
```bash
cd bot
python telegram_bot.py
```

## 🤖 Cara Menggunakan Bot

### Perintah Dasar
- `/start` - Mulai bot dan lihat menu utama
- `/help` - Lihat daftar perintah dan cara penggunaan
- `/status` - Cek status bot
- `/stats` - Lihat statistik penggunaan

### Konversi File
1. Kirim file PDF → otomatis konversi ke Word
2. Kirim file Word → otomatis konversi ke PDF
3. Kirim gambar → buat sticker pack

### Tools Lainnya
- Kirim text untuk QR code generation
- Gunakan `/tts` untuk text to speech
- Gunakan `/compress` untuk kompres file

## 🌐 Web Dashboard

Dashboard web menyediakan:
- **Real-time Statistics**: Statistik penggunaan bot secara real-time
- **File Upload**: Upload dan konversi file melalui web interface
- **Activity Monitor**: Monitor aktivitas dan konversi file
- **User Management**: Kelola pengguna bot
- **Settings**: Konfigurasi bot dan sistem

### Fitur Dashboard
- 📊 **Analytics Dashboard** - Statistik lengkap
- 📁 **File Manager** - Kelola file upload dan hasil
- 👥 **User Management** - Data pengguna dan aktivitas
- ⚙️ **Settings** - Konfigurasi bot
- 🔄 **Real-time Updates** - Update data secara real-time

## 🔧 Konfigurasi

### Environment Variables
```env
# Telegram Bot
TELEGRAM_BOT_TOKEN=your_bot_token
WEBHOOK_URL=your_webhook_url

# Database
DATABASE_URL=sqlite:///bot_data.db

# API
API_HOST=0.0.0.0
API_PORT=5000

# File Upload
MAX_FILE_SIZE=20971520
UPLOAD_FOLDER=uploads
OUTPUT_FOLDER=output
```

### Bot Configuration
Edit file `bot/telegram_bot.py` untuk mengubah:
- Welcome message
- Command handlers
- File processing logic
- Error handling

## 📱 API Endpoints

### Statistics
- `GET /api/stats` - Dapatkan statistik bot
- `GET /api/activity` - Aktivitas terbaru

### File Processing
- `POST /api/convert` - Konversi file
- `GET /api/download/<filename>` - Download hasil konversi

### Tools
- `POST /api/qr` - Generate QR code
- `POST /api/tts` - Text to speech
- `POST /api/compress` - Kompres file

## 🛡️ Keamanan

- **File Validation**: Validasi tipe dan ukuran file
- **Rate Limiting**: Batasi penggunaan per user
- **Secure Upload**: Upload file dengan keamanan maksimal
- **Data Encryption**: Enkripsi data sensitif
- **Access Control**: Kontrol akses ke fitur admin

## 📈 Monitoring & Analytics

- **User Statistics**: Data pengguna dan aktivitas
- **File Processing**: Statistik konversi file
- **Performance Metrics**: Metrik performa bot
- **Error Tracking**: Pelacakan error dan debugging

## 🚀 Deployment

### Production Setup
1. Setup environment variables untuk production
2. Konfigurasi database production
3. Setup webhook untuk Telegram bot
4. Konfigurasi reverse proxy (Nginx)
5. Setup SSL certificate
6. Konfigurasi monitoring dan logging

### Docker Deployment
```bash
# Build image
docker build -t telegram-bot .

# Run container
docker run -d --name telegram-bot \
  -e TELEGRAM_BOT_TOKEN=your_token \
  -p 3000:3000 \
  -p 5000:5000 \
  telegram-bot
```

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

Jika mengalami masalah atau butuh bantuan:
- Buat issue di GitHub repository
- Hubungi developer melalui Telegram
- Baca dokumentasi lengkap

## 🔄 Changelog

### v1.0.0
- ✅ Initial release
- ✅ PDF to Word conversion
- ✅ Word to PDF conversion
- ✅ JPG to Sticker conversion
- ✅ Web dashboard
- ✅ API endpoints
- ✅ Database integration
- ✅ Real-time statistics

---

**Dibuat dengan ❤️ untuk kemudahan konversi file dan produktivitas**
