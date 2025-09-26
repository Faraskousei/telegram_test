const https = require('https');

console.log('🎵 Test Music Player');
console.log('===================');
console.log('');

const BASE_URL = 'https://farastele-cfog7guq4-frxadz-6046s-projects.vercel.app';

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

async function testMusicPlayer() {
  try {
    console.log('🔍 Testing music player functionality...');
    console.log('');
    
    // 1. Test music search API
    console.log('1️⃣ Testing music search API...');
    const searchUrl = `${BASE_URL}/api/music/search?q=lofi`;
    const searchResult = await makeRequest(searchUrl);
    
    console.log('📡 Search API response status:', searchResult.status);
    if (searchResult.status === 200) {
      console.log('✅ Music search API is working');
      if (searchResult.data.success) {
        console.log('📊 Found results:', searchResult.data.data.results.length);
        console.log('🎵 Sample result:', searchResult.data.data.results[0]?.title || 'No results');
      }
    } else if (searchResult.status === 401) {
      console.log('❌ Music search API requires authentication');
      console.log('🔧 Solution: Disable Vercel Protection');
    } else {
      console.log('❌ Music search API has issues:', searchResult.status);
    }
    
    console.log('');
    
    // 2. Test music duration API
    console.log('2️⃣ Testing music duration API...');
    const durationUrl = `${BASE_URL}/api/music/duration?videoId=jfKfPfyJRdk`;
    const durationResult = await makeRequest(durationUrl);
    
    console.log('📡 Duration API response status:', durationResult.status);
    if (durationResult.status === 200) {
      console.log('✅ Music duration API is working');
      if (durationResult.data.success) {
        console.log('⏱️ Duration:', durationResult.data.data.duration);
      }
    } else if (durationResult.status === 401) {
      console.log('❌ Music duration API requires authentication');
      console.log('🔧 Solution: Disable Vercel Protection');
    } else {
      console.log('❌ Music duration API has issues:', durationResult.status);
    }
    
    console.log('');
    
    // 3. Test web dashboard
    console.log('3️⃣ Testing web dashboard...');
    const dashboardUrl = `${BASE_URL}/bot`;
    const dashboardResult = await makeRequest(dashboardUrl);
    
    console.log('📡 Dashboard response status:', dashboardResult.status);
    if (dashboardResult.status === 200) {
      console.log('✅ Web dashboard is accessible');
    } else if (dashboardResult.status === 401) {
      console.log('❌ Web dashboard requires authentication');
      console.log('🔧 Solution: Disable Vercel Protection');
    } else {
      console.log('❌ Web dashboard has issues:', dashboardResult.status);
    }
    
    console.log('');
    
    // 4. Summary
    console.log('📋 Music Player Test Summary:');
    console.log('============================');
    
    if (searchResult.status === 200) {
      console.log('✅ Music search API is working');
    } else {
      console.log('❌ Music search API has issues');
    }
    
    if (durationResult.status === 200) {
      console.log('✅ Music duration API is working');
    } else {
      console.log('❌ Music duration API has issues');
    }
    
    if (dashboardResult.status === 200) {
      console.log('✅ Web dashboard is accessible');
    } else {
      console.log('❌ Web dashboard has issues');
    }
    
    console.log('');
    console.log('🎯 Next Steps:');
    console.log('1. If APIs have issues, disable Vercel Protection');
    console.log('2. If dashboard has issues, check environment variables');
    console.log('3. Test music player in web browser');
    console.log('4. Test bot functionality with /start command');
    
  } catch (error) {
    console.error('❌ Error testing music player:', error);
  }
}

// Run the test
testMusicPlayer();
