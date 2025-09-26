const https = require('https');

const BOT_TOKEN = '8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw';
const WEBHOOK_URL = 'https://farastele-cfog7guq4-frxadz-6046s-projects.vercel.app/api/telegram/webhook';

console.log('🧪 Test Bot After Deployment');
console.log('===========================');
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

async function testBot() {
  try {
    console.log('🔍 Testing bot functionality...');
    console.log('');
    
    // 1. Check webhook status
    console.log('1️⃣ Checking webhook status...');
    const webhookUrl = `https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`;
    const webhookResult = await makeRequest(webhookUrl);
    
    if (webhookResult.data.ok) {
      console.log('✅ Webhook status:', webhookResult.data.result.url);
      console.log('📊 Pending updates:', webhookResult.data.result.pending_update_count);
      console.log('❌ Last error:', webhookResult.data.result.last_error_message);
    } else {
      console.log('❌ Failed to get webhook info:', webhookResult.data);
    }
    
    console.log('');
    
    // 2. Test webhook endpoint
    console.log('2️⃣ Testing webhook endpoint...');
    const testWebhookUrl = `${WEBHOOK_URL}?test=true`;
    const testResult = await makeRequest(testWebhookUrl);
    
    console.log('📡 Webhook response status:', testResult.status);
    if (testResult.status === 200) {
      console.log('✅ Webhook endpoint is accessible');
    } else if (testResult.status === 401) {
      console.log('❌ Webhook endpoint requires authentication');
      console.log('🔧 Solution: Disable Vercel Protection in dashboard');
    } else {
      console.log('❌ Webhook endpoint has issues:', testResult.status);
    }
    
    console.log('');
    
    // 3. Test music API
    console.log('3️⃣ Testing music API...');
    const musicApiUrl = `${WEBHOOK_URL.replace('/api/telegram/webhook', '/api/music/search')}?q=test`;
    const musicResult = await makeRequest(musicApiUrl);
    
    console.log('📡 Music API response status:', musicResult.status);
    if (musicResult.status === 200) {
      console.log('✅ Music API is working');
    } else {
      console.log('❌ Music API has issues:', musicResult.status);
    }
    
    console.log('');
    
    // 4. Summary
    console.log('📋 Test Summary:');
    console.log('================');
    
    if (webhookResult.data.ok && webhookResult.data.result.pending_update_count === 0) {
      console.log('✅ Bot webhook is working properly');
    } else {
      console.log('❌ Bot webhook has issues');
    }
    
    if (testResult.status === 200) {
      console.log('✅ Webhook endpoint is accessible');
    } else {
      console.log('❌ Webhook endpoint requires authentication');
    }
    
    if (musicResult.status === 200) {
      console.log('✅ Music API is working');
    } else {
      console.log('❌ Music API has issues');
    }
    
    console.log('');
    console.log('🎯 Next Steps:');
    console.log('1. If webhook has issues, disable Vercel Protection');
    console.log('2. If music API has issues, check environment variables');
    console.log('3. Test bot by sending /start command');
    console.log('4. Test music player in web dashboard');
    
  } catch (error) {
    console.error('❌ Error testing bot:', error);
  }
}

// Run the test
testBot();
