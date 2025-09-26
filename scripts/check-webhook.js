const https = require('https');

const BOT_TOKEN = '8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw';
const WEBHOOK_URL = 'https://farastele-cfog7guq4-frxadz-6046s-projects.vercel.app/api/telegram/webhook';

async function checkWebhook() {
  try {
    console.log('🔍 Checking webhook status...');
    
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`);
    const data = await response.json();
    
    console.log('\n📊 Webhook Status:');
    console.log('==================');
    console.log(`✅ OK: ${data.ok}`);
    console.log(`🔗 URL: ${data.result.url}`);
    console.log(`🔒 Custom Certificate: ${data.result.has_custom_certificate}`);
    console.log(`⏳ Pending Updates: ${data.result.pending_update_count}`);
    console.log(`❌ Last Error Date: ${data.result.last_error_date ? new Date(data.result.last_error_date * 1000).toLocaleString() : 'None'}`);
    console.log(`💬 Last Error Message: ${data.result.last_error_message || 'None'}`);
    console.log(`🌐 IP Address: ${data.result.ip_address}`);
    console.log(`📡 Max Connections: ${data.result.max_connections}`);
    console.log(`📝 Allowed Updates: ${data.result.allowed_updates.join(', ')}`);
    
    if (data.result.pending_update_count > 0) {
      console.log('\n⚠️  WARNING: There are pending updates that failed to be delivered!');
    }
    
    if (data.result.last_error_message) {
      console.log('\n❌ ERROR: ' + data.result.last_error_message);
    }
    
    return data;
  } catch (error) {
    console.error('❌ Error checking webhook:', error);
  }
}

async function testWebhook() {
  try {
    console.log('\n🧪 Testing webhook endpoint...');
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        test: true,
        message: {
          message_id: 1,
          from: { id: 123456789, first_name: 'Test', username: 'testuser' },
          chat: { id: 123456789, type: 'private' },
          date: Math.floor(Date.now() / 1000),
          text: '/start'
        }
      })
    });
    
    console.log(`📡 Webhook Response: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      console.log('✅ Webhook endpoint is working!');
    } else {
      console.log('❌ Webhook endpoint has issues!');
      const errorText = await response.text();
      console.log('Error details:', errorText);
    }
  } catch (error) {
    console.error('❌ Error testing webhook:', error);
  }
}

async function main() {
  console.log('🤖 Telegram Bot Webhook Checker');
  console.log('================================');
  
  await checkWebhook();
  await testWebhook();
  
  console.log('\n📋 Next Steps:');
  console.log('1. If there are pending updates, clear them by setting webhook again');
  console.log('2. If there are errors, check Vercel logs');
  console.log('3. Make sure environment variables are set in Vercel');
}

main().catch(console.error);
