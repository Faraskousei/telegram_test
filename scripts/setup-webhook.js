#!/usr/bin/env node

const https = require('https');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw';
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://your-app.vercel.app/api/telegram/webhook';

async function setWebhook() {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`;
  const data = JSON.stringify({
    url: WEBHOOK_URL,
    allowed_updates: ['message', 'callback_query']
  });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  return new Promise((resolve, reject) => {
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
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

async function getWebhookInfo() {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`;

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

async function main() {
  try {
    console.log('🤖 Setting up Telegram webhook...');
    console.log(`📡 Webhook URL: ${WEBHOOK_URL}`);
    
    // Set webhook
    const result = await setWebhook();
    
    if (result.ok) {
      console.log('✅ Webhook set successfully!');
      console.log(`📊 Description: ${result.description}`);
    } else {
      console.error('❌ Failed to set webhook:', result.description);
      return;
    }
    
    // Get webhook info
    console.log('\n📋 Webhook Information:');
    const info = await getWebhookInfo();
    
    if (info.ok) {
      const webhookInfo = info.result;
      console.log(`🔗 URL: ${webhookInfo.url}`);
      console.log(`✅ Has custom certificate: ${webhookInfo.has_custom_certificate}`);
      console.log(`📊 Pending update count: ${webhookInfo.pending_update_count}`);
      console.log(`🕐 Last error date: ${webhookInfo.last_error_date ? new Date(webhookInfo.last_error_date * 1000) : 'None'}`);
      console.log(`❌ Last error message: ${webhookInfo.last_error_message || 'None'}`);
      console.log(`🔄 Max connections: ${webhookInfo.max_connections}`);
      console.log(`📝 Allowed updates: ${webhookInfo.allowed_updates?.join(', ') || 'All'}`);
    }
    
    console.log('\n🎉 Webhook setup completed!');
    console.log('🚀 Your bot is now ready to receive updates.');
    
  } catch (error) {
    console.error('❌ Error setting up webhook:', error.message);
    process.exit(1);
  }
}

main();
