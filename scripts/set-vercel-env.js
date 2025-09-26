const https = require('https');

const ENV_VARS = {
  'TELEGRAM_BOT_TOKEN': '8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw',
  'FIREBASE_API_KEY': 'AIzaSyDO9QTPwSLc7YEyEu-vkAewptzRVcWdF78',
  'FIREBASE_PROJECT_ID': 'db-ind-b9d1c',
  'FIREBASE_STORAGE_BUCKET': 'db-ind-b9d1c.appspot.com',
  'FIREBASE_MESSAGING_SENDER_ID': '142941537714',
  'FIREBASE_APP_ID': '1:142941537714:web:fbb4f4d18715688e8550ab',
  'YOUTUBE_API_KEY': 'AIzaSyDyrS8Hj0P4IDXw5llepPcEcWEAWEMhYuk',
  'NODE_ENV': 'production',
  'NEXT_PUBLIC_APP_URL': 'https://farastele-cfog7guq4-frxadz-6046s-projects.vercel.app'
};

console.log('🔧 Vercel Environment Variables Setup');
console.log('=====================================');
console.log('');
console.log('📋 Environment Variables yang perlu dikonfigurasi di Vercel:');
console.log('');

Object.entries(ENV_VARS).forEach(([key, value]) => {
  console.log(`✅ ${key} = ${value}`);
});

console.log('');
console.log('📝 Cara mengkonfigurasi di Vercel Dashboard:');
console.log('1. Buka: https://vercel.com/dashboard');
console.log('2. Pilih project "farastele" atau "faras_tele"');
console.log('3. Klik "Settings" → "Environment Variables"');
console.log('4. Klik "Add New" untuk setiap variable');
console.log('5. Set Environment: Production, Preview, Development');
console.log('6. Klik "Save"');
console.log('');
console.log('🚀 Setelah environment variables dikonfigurasi:');
console.log('1. Klik "Deployments" tab');
console.log('2. Klik "Redeploy" pada deployment terbaru');
console.log('3. Atau push commit baru ke GitHub');
console.log('');
console.log('✅ Bot akan berfungsi setelah redeploy!');
