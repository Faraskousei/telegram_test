import { NextRequest, NextResponse } from 'next/server'
import { addUser, addConversion, updateUser } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Handle different types of updates
    if (body.message) {
      await handleMessage(body.message)
    } else if (body.callback_query) {
      await handleCallbackQuery(body.callback_query)
    }
    
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error handling webhook:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function handleMessage(message: any) {
  const user = message.from
  const chatId = message.chat.id
  const text = message.text
  
  // Add or update user
  await addUser({
    telegramId: user.id,
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name
  })
  
  // Handle commands
  if (text?.startsWith('/start')) {
    await sendMessage(chatId, getWelcomeMessage(user.first_name))
  } else if (text?.startsWith('/help')) {
    await sendMessage(chatId, getHelpMessage())
  } else if (message.document) {
    await handleDocument(message.document, chatId, user.id)
  } else if (message.photo) {
    await handlePhoto(message.photo, chatId, user.id)
  }
}

async function handleCallbackQuery(callbackQuery: any) {
  const chatId = callbackQuery.message.chat.id
  const data = callbackQuery.data
  
  // Handle different callback data
  switch (data) {
    case 'convert_docs':
      await sendMessage(chatId, '📄 Kirim file yang ingin dikonversi:\n• PDF → Word\n• Word → PDF\n• Image → PDF')
      break
    case 'create_sticker':
      await sendMessage(chatId, '🎨 Kirim gambar yang ingin dijadikan sticker.\nFormat yang didukung: JPG, PNG')
      break
    case 'help':
      await sendMessage(chatId, getHelpMessage())
      break
  }
}

async function handleDocument(document: any, chatId: number, userId: number) {
  const fileName = document.file_name
  const fileSize = document.file_size
  
  // Check file size (max 20MB)
  if (fileSize > 20 * 1024 * 1024) {
    await sendMessage(chatId, '❌ File terlalu besar! Maksimal 20MB.')
    return
  }
  
  // Determine conversion type
  const fileExtension = fileName.toLowerCase().split('.').pop()
  let conversionType = 'unknown'
  
  if (fileExtension === 'pdf') {
    conversionType = 'pdf-to-word'
  } else if (['doc', 'docx'].includes(fileExtension)) {
    conversionType = 'word-to-pdf'
  } else if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
    conversionType = 'image-to-pdf'
  }
  
  if (conversionType === 'unknown') {
    await sendMessage(chatId, '❌ Format file tidak didukung!')
    return
  }
  
  // Add conversion record
  await addConversion({
    userId,
    originalFile: fileName,
    convertedFile: `converted_${fileName}`,
    conversionType,
    fileSize,
    status: 'processing'
  })
  
  await sendMessage(chatId, `⏳ Memproses file: ${fileName}\n📊 Ukuran: ${(fileSize / 1024 / 1024).toFixed(2)} MB\n🔄 Mohon tunggu...`)
  
  // Simulate processing
  setTimeout(async () => {
    await sendMessage(chatId, `✅ File ${fileName} berhasil dikonversi!\n📥 Download hasil konversi di web dashboard.`)
  }, 3000)
}

async function handlePhoto(photos: any[], chatId: number, userId: number) {
  const photo = photos[photos.length - 1] // Get highest resolution
  
  await sendMessage(chatId, '⏳ Memproses gambar untuk sticker...\n🔄 Mohon tunggu...')
  
  // Add conversion record
  await addConversion({
    userId,
    originalFile: 'sticker_image.jpg',
    convertedFile: 'sticker.webp',
    conversionType: 'jpg-to-sticker',
    fileSize: photo.file_size || 0,
    status: 'processing'
  })
  
  // Simulate processing
  setTimeout(async () => {
    await sendMessage(chatId, '✅ Sticker berhasil dibuat!\n🎨 Sticker pack tersedia di web dashboard.')
  }, 2000)
}

async function sendMessage(chatId: number, text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN || '8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw'
  
  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown'
      })
    })
    
    if (!response.ok) {
      console.error('Failed to send message:', await response.text())
    }
  } catch (error) {
    console.error('Error sending message:', error)
  }
}

function getWelcomeMessage(firstName: string): string {
  return `🤖 **Selamat datang di Multi-Function Bot!**

Halo ${firstName}! 👋

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

Ketik /help untuk melihat semua perintah yang tersedia!`
}

function getHelpMessage(): string {
  return `📋 **Daftar Perintah:**

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
3. Download hasil konversi`
}
