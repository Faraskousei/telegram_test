const https = require('https');

const BOT_TOKEN = '8311046872:AAFJz-zTPe4X49YWyibejV4-ydDYl_jPdMw';
const WEBHOOK_URL = 'https://farastele-cfog7guq4-frxadz-6046s-projects.vercel.app/api/telegram/webhook';

async function clearPendingUpdates() {
  try {
    console.log('🧹 Clearing pending updates...');
    
    // Delete webhook to clear pending updates
    const deleteResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/deleteWebhook`);
    const deleteData = await deleteResponse.json();
    
    if (deleteData.ok) {
      console.log('✅ Webhook deleted successfully');
      console.log(`📊 Pending updates cleared: ${deleteData.result.pending_update_count || 0}`);
    } else {
      console.log('❌ Failed to delete webhook:', deleteData.description);
    }
    
    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Set webhook again
    console.log('🔄 Setting webhook again...');
    const setResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `url=${encodeURIComponent(WEBHOOK_URL)}`
    });
    
    const setData = await setResponse.json();
    
    if (setData.ok) {
      console.log('✅ Webhook set successfully');
    } else {
      console.log('❌ Failed to set webhook:', setData.description);
    }
    
    // Check final status
    console.log('\n🔍 Checking final webhook status...');
    const statusResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`);
    const statusData = await statusResponse.json();
    
    if (statusData.ok) {
      console.log('📊 Final Status:');
      console.log(`- URL: ${statusData.result.url}`);
      console.log(`- Pending Updates: ${statusData.result.pending_update_count}`);
      console.log(`- Last Error: ${statusData.result.last_error_message || 'None'}`);
      
      if (statusData.result.pending_update_count === 0) {
        console.log('🎉 SUCCESS: No pending updates! Bot should work now.');
      } else {
        console.log('⚠️  WARNING: Still have pending updates. Check Vercel environment variables.');
      }
    }
    
  } catch (error) {
    console.error('❌ Error clearing pending updates:', error);
  }
}

async function main() {
  console.log('🤖 Telegram Bot Pending Updates Cleaner');
  console.log('=======================================');
  console.log('');
  console.log('⚠️  IMPORTANT: Make sure environment variables are configured in Vercel first!');
  console.log('');
  
  await clearPendingUpdates();
  
  console.log('\n📋 Next Steps:');
  console.log('1. Configure environment variables in Vercel Dashboard');
  console.log('2. Redeploy the project');
  console.log('3. Test bot with /start command');
  console.log('4. Check Vercel logs for any errors');
}

main().catch(console.error);
