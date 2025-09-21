// Temporary test file to check if external college API is working
// Run this in browser console or as a standalone test

const testExternalCollegeAPI = async () => {
  try {
    console.log('Testing external college API directly...');
    
    // Test 1: Direct fetch to external API
    const response = await fetch('https://collegeapi-mnni.onrender.com/api/colleges?district=Kalaburagi');
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ External College API is working!');
      console.log('Sample data:', data);
    } else {
      console.log('❌ External College API returned error:', response.status, response.statusText);
    }
  } catch (error) {
    console.log('❌ Failed to connect to external College API:', error);
  }
};

// Uncomment the line below to run the test
// testExternalCollegeAPI();

console.log('Test function ready. Run testExternalCollegeAPI() in console to test.');
