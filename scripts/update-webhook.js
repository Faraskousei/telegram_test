#!/usr/bin/env node

const https = require('https');

// Configuration
const BOT_TOKEN = '8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw';
const WEBHOOK_URL = 'https://farastele.vercel.app/api/telegram/webhook';

console.log('🤖 Updating Telegram Bot Webhook');
console.log('================================');
console.log(`Bot Token: ${BOT_TOKEN.substring(0, 10)}...`);
console.log(`Webhook URL: ${WEBHOOK_URL}`);
console.log('');

// Function to make HTTP requests
function makeRequest(url, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      method: data ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'TelegramBot/1.0'
      }
    };

    const req = https.request(url, options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          resolve(result);
        } catch (error) {
          reject(new Error(`Invalid JSON response: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Set webhook
async function setWebhook() {
  try {
    console.log('📡 Setting webhook...');
    
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`;
    const data = {
      url: WEBHOOK_URL,
      allowed_updates: ['message', 'callback_query'],
      drop_pending_updates: true
    };

    const result = await makeRequest(url, data);
    
    if (result.ok) {
      console.log('✅ Webhook updated successfully!');
      console.log(`📊 Description: ${result.description}`);
      return true;
    } else {
      console.error('❌ Failed to update webhook:', result.description);
      return false;
    }
  } catch (error) {
    console.error('❌ Error updating webhook:', error.message);
    return false;
  }
}

// Get webhook info
async function getWebhookInfo() {
  try {
    console.log('\n📋 Getting webhook information...');
    
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`;
    const result = await makeRequest(url);
    
    if (result.ok) {
      const info = result.result;
      console.log('📊 Webhook Information:');
      console.log(`🔗 URL: ${info.url || 'Not set'}`);
      console.log(`✅ Has custom certificate: ${info.has_custom_certificate}`);
      console.log(`📊 Pending update count: ${info.pending_update_count}`);
      console.log(`🕐 Last error date: ${info.last_error_date ? new Date(info.last_error_date * 1000).toLocaleString() : 'None'}`);
      console.log(`❌ Last error message: ${info.last_error_message || 'None'}`);
      console.log(`🔄 Max connections: ${info.max_connections}`);
      console.log(`📝 Allowed updates: ${info.allowed_updates?.join(', ') || 'All'}`);
      
      return info;
    } else {
      console.error('❌ Failed to get webhook info:', result.description);
      return null;
    }
  } catch (error) {
    console.error('❌ Error getting webhook info:', error.message);
    return null;
  }
}

// Test webhook endpoint
async function testWebhook() {
  try {
    console.log('\n🧪 Testing webhook endpoint...');
    
    const testData = {
      message: {
        from: { id: 123, first_name: 'Test' },
        chat: { id: 123 },
        text: '/start'
      }
    };

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    if (response.ok) {
      console.log('✅ Webhook endpoint is working!');
      return true;
    } else {
      console.log(`⚠️  Webhook endpoint returned status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`⚠️  Webhook endpoint test failed: ${error.message}`);
    return false;
  }
}

// Main function
async function main() {
  console.log('🚀 Starting webhook update...\n');
  
  try {
    // Test webhook endpoint first
    await testWebhook();
    
    // Update webhook
    const webhookSet = await setWebhook();
    if (!webhookSet) {
      console.log('\n❌ Failed to update webhook.');
      process.exit(1);
    }
    
    // Get webhook info
    await getWebhookInfo();
    
    console.log('\n🎉 Webhook update completed successfully!');
    console.log('📱 Your bot is now connected to Vercel!');
    console.log('🔗 Bot link: https://t.me/Backup_indBot');
    console.log('🌐 Dashboard: https://farastele.vercel.app');
    
  } catch (error) {
    console.error('\n❌ Update failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { setWebhook, getWebhookInfo, testWebhook };
