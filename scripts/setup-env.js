const fs = require('fs');
const path = require('path');

console.log('🔧 Environment Variables Setup');
console.log('==============================');
console.log('');

// Create .env.local file
const envLocalContent = `# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw
WEBHOOK_URL=http://localhost:3000

# Firebase Configuration (Server-side)
FIREBASE_API_KEY=AIzaSyDO9QTPwSLc7YEyEu-vkAewptzRVcWdF78
FIREBASE_PROJECT_ID=db-ind-b9d1c
FIREBASE_STORAGE_BUCKET=db-ind-b9d1c.appspot.com
FIREBASE_MESSAGING_SENDER_ID=142941537714
FIREBASE_APP_ID=1:142941537714:web:fbb4f4d18715688e8550ab

# Firebase Public Configuration (Client-side)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDO9QTPwSLc7YEyEu-vkAewptzRVcWdF78
NEXT_PUBLIC_FIREBASE_PROJECT_ID=db-ind-b9d1c
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=db-ind-b9d1c.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=142941537714
NEXT_PUBLIC_FIREBASE_APP_ID=1:142941537714:web:fbb4f4d18715688e8550ab

# Development Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# YouTube API Configuration
YOUTUBE_API_KEY=AIzaSyDyrS8Hj0P4IDXw5llepPcEcWEAWEMhYuk`;

try {
  fs.writeFileSync('.env.local', envLocalContent);
  console.log('✅ .env.local file created successfully');
} catch (error) {
  console.error('❌ Error creating .env.local:', error.message);
}

console.log('');
console.log('📋 Environment Variables Summary:');
console.log('');

const envVars = {
  'TELEGRAM_BOT_TOKEN': '8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw',
  'FIREBASE_API_KEY': 'AIzaSyDO9QTPwSLc7YEyEu-vkAewptzRVcWdF78',
  'FIREBASE_PROJECT_ID': 'db-ind-b9d1c',
  'FIREBASE_STORAGE_BUCKET': 'db-ind-b9d1c.appspot.com',
  'FIREBASE_MESSAGING_SENDER_ID': '142941537714',
  'FIREBASE_APP_ID': '1:142941537714:web:fbb4f4d18715688e8550ab',
  'NEXT_PUBLIC_FIREBASE_API_KEY': 'AIzaSyDO9QTPwSLc7YEyEu-vkAewptzRVcWdF78',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID': 'db-ind-b9d1c',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': 'db-ind-b9d1c.appspot.com',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': '142941537714',
  'NEXT_PUBLIC_FIREBASE_APP_ID': '1:142941537714:web:fbb4f4d18715688e8550ab',
  'YOUTUBE_API_KEY': 'AIzaSyDyrS8Hj0P4IDXw5llepPcEcWEAWEMhYuk',
  'NODE_ENV': 'development',
  'NEXT_PUBLIC_APP_URL': 'http://localhost:3000'
};

console.log('🔑 SERVER-SIDE VARIABLES:');
Object.entries(envVars).forEach(([key, value]) => {
  if (!key.startsWith('NEXT_PUBLIC_')) {
    console.log(`  ${key} = ${value}`);
  }
});

console.log('');
console.log('🌐 CLIENT-SIDE VARIABLES:');
Object.entries(envVars).forEach(([key, value]) => {
  if (key.startsWith('NEXT_PUBLIC_')) {
    console.log(`  ${key} = ${value}`);
  }
});

console.log('');
console.log('📝 Next Steps:');
console.log('1. Copy all variables to Vercel Dashboard');
console.log('2. Set Environment: Production, Preview, Development');
console.log('3. Redeploy project');
console.log('4. Test bot functionality');
console.log('');
console.log('✅ Environment setup completed!');
