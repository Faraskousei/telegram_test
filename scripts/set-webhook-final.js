const https = require('https');

const BOT_TOKEN = '8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw';
const WEBHOOK_URL = 'https://farastele-cfog7guq4-frxadz-6046s-projects.vercel.app/api/telegram/webhook';

console.log('🔗 Telegram Bot - Set Webhook Final');
console.log('==================================');
console.log('');

// Function to make HTTPS request
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', reject);
    req.end();
  });
}

async function setWebhook() {
  try {
    console.log('🔗 Setting webhook...');
    console.log('📡 URL:', WEBHOOK_URL);
    
    const setWebhookUrl = `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`;
    const setResult = await makeRequest(setWebhookUrl, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, JSON.stringify({
      url: WEBHOOK_URL,
      allowed_updates: ['message', 'callback_query']
    }));
    
    console.log('📡 Set webhook response:', setResult.status);
    console.log('📋 Set webhook data:', JSON.stringify(setResult.data, null, 2));
    
    if (setResult.data.ok) {
      console.log('✅ Webhook set successfully');
      console.log('');
      console.log('🎉 Bot webhook configured!');
      console.log('📱 Bot should now work properly');
    } else {
      console.log('❌ Failed to set webhook:', setResult.data);
    }
    
  } catch (error) {
    console.error('❌ Error setting webhook:', error);
  }
}

// Run the function
setWebhook();
