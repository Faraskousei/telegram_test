# 🤝 Contributing to Telegram Multi-Function Bot

Terima kasih telah tertarik untuk berkontribusi pada project ini! Kami sangat menghargai kontribusi dari komunitas.

## 📋 Cara Berkontribusi

### 1. Fork Repository
- Klik tombol "Fork" di halaman repository
- Clone repository yang sudah di-fork ke komputer Anda

### 2. Setup Development Environment
```bash
# Clone repository
git clone https://github.com/your-username/telegram-multifunction-bot.git
cd telegram-multifunction-bot

# Install dependencies
npm install
pip install -r requirements.txt

# Setup environment
cp env.example .env
# Edit .env dengan konfigurasi yang sesuai
```

### 3. Buat Branch Baru
```bash
git checkout -b feature/your-feature-name
# atau
git checkout -b fix/your-bug-fix
```

### 4. Development Guidelines

#### Code Style
- **Python**: Gunakan PEP 8 style guide
- **TypeScript/JavaScript**: Gunakan ESLint dan Prettier
- **CSS**: Gunakan Tailwind CSS classes

#### Testing
```bash
# Run tests
npm test
python -m pytest tests/

# Run linting
npm run lint
```

#### Commit Messages
Gunakan format commit message yang jelas:
```
feat: add new conversion feature
fix: resolve PDF processing bug
docs: update README
style: format code with prettier
refactor: improve file processor
test: add unit tests for database
```

### 5. Pull Request Process

1. **Update Documentation**: Update README.md jika diperlukan
2. **Add Tests**: Tambahkan test untuk fitur baru
3. **Update CHANGELOG**: Update changelog dengan perubahan
4. **Test Thoroughly**: Pastikan semua test pass
5. **Submit PR**: Buat Pull Request dengan deskripsi yang jelas

## 🐛 Melaporkan Bug

### Sebelum Melaporkan
- Cek apakah bug sudah dilaporkan di Issues
- Pastikan menggunakan versi terbaru
- Coba reproduce bug dengan langkah yang jelas

### Template Bug Report
```markdown
**Deskripsi Bug**
Penjelasan singkat tentang bug

**Langkah Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
Apa yang seharusnya terjadi

**Screenshots**
Jika ada, tambahkan screenshot

**Environment**
- OS: [e.g. Windows 10, macOS, Linux]
- Node.js version: [e.g. 18.17.0]
- Python version: [e.g. 3.11.0]
- Browser: [e.g. Chrome, Firefox]

**Additional Context**
Informasi tambahan yang relevan
```

## ✨ Mengusulkan Fitur

### Template Feature Request
```markdown
**Fitur yang Diinginkan**
Deskripsi singkat tentang fitur

**Masalah yang Diselesaikan**
Masalah apa yang akan diselesaikan oleh fitur ini

**Solusi yang Diusulkan**
Deskripsi detail tentang solusi

**Alternatif**
Solusi alternatif yang sudah dipertimbangkan

**Additional Context**
Informasi tambahan tentang fitur request
```

## 🏗️ Development Setup

### Prerequisites
- Node.js 18+
- Python 3.8+
- Git
- Docker (optional)

### Local Development
```bash
# Start development servers
npm run dev          # Next.js development server
python bot/api_server.py  # Flask API server
python bot/telegram_bot.py  # Telegram bot
```

### Docker Development
```bash
# Build and run with Docker
docker-compose up --build
```

## 📝 Code Review Process

### Untuk Maintainers
1. **Review Code**: Periksa kualitas kode dan logic
2. **Test Changes**: Pastikan semua test pass
3. **Check Documentation**: Pastikan dokumentasi terupdate
4. **Merge**: Merge PR jika sudah memenuhi kriteria

### Kriteria PR yang Diterima
- ✅ Kode mengikuti style guide
- ✅ Test coverage memadai
- ✅ Dokumentasi terupdate
- ✅ Tidak ada breaking changes (kecuali major version)
- ✅ Performance tidak menurun

## 🎯 Roadmap

### Fitur yang Sedang Dikembangkan
- [ ] AI-powered file processing
- [ ] Advanced image editing
- [ ] Multi-language support
- [ ] Plugin system
- [ ] Mobile app

### Prioritas Kontribusi
1. **Bug Fixes**: Perbaikan bug yang dilaporkan
2. **Documentation**: Peningkatan dokumentasi
3. **Tests**: Menambah test coverage
4. **Performance**: Optimasi performa
5. **New Features**: Fitur baru yang bermanfaat

## 📞 Komunikasi

### Channels
- **GitHub Issues**: Untuk bug reports dan feature requests
- **GitHub Discussions**: Untuk diskusi umum
- **Telegram**: [Bot Support Group](https://t.me/your_bot_support)

### Code of Conduct
- Bersikap sopan dan menghormati
- Fokus pada kontribusi yang konstruktif
- Menghormati perbedaan pendapat
- Tidak melakukan harassment atau spam

## 🏆 Recognition

Kontributor yang aktif akan mendapat:
- 🏅 Mention di README
- 🎖️ Badge kontributor
- 📜 Certificate of appreciation
- 🎁 Special rewards

## 📚 Resources

### Dokumentasi
- [Next.js Documentation](https://nextjs.org/docs)
- [Python Telegram Bot](https://python-telegram-bot.readthedocs.io/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Tools
- [GitHub Desktop](https://desktop.github.com/)
- [VS Code](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/) (untuk API testing)

---

**Terima kasih telah berkontribusi! 🙏**

Setiap kontribusi, sekecil apapun, sangat berarti untuk project ini. Mari bersama-sama membuat bot Telegram yang lebih baik!
