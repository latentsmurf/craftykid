// Test Supabase connection
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zcldjvbejigmqycfsjzb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjbGRqdmJlamlnbXF5Y2ZzanpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3NTI4NDMsImV4cCI6MjA3MTMyODg0M30.E8KaSsF4SjEcRX38oKmR78WBXqoBrb0HwIlSHlQWKhM';

console.log('Testing Supabase connection...');
console.log('Project URL:', supabaseUrl);

// Check if we can connect to the Supabase API
fetch(supabaseUrl + '/rest/v1/', {
  headers: {
    'apikey': supabaseKey,
  }
})
.then(response => {
  console.log('API Response Status:', response.status);
  if (response.ok) {
    console.log('✅ Successfully connected to Supabase API!');
  } else {
    console.log('❌ Failed to connect to Supabase API');
  }
})
.catch(error => {
  console.error('Connection error:', error.message);
});
