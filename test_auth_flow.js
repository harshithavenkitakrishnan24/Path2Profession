const API_URL = 'http://localhost:5000/api';

async function testAuth() {
    const timestamp = Date.now();
    const email = `testuser_${timestamp}@example.com`;
    const password = 'password123';
    const displayName = `Test User ${timestamp}`;

    console.log(`\n🔹 Testing Authentication Flow...`);
    console.log(`   Email: ${email}`);

    // 1. Register
    try {
        console.log(`\n👉 Attempting Registration...`);
        const regRes = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, displayName })
        });

        const regData = await regRes.json();

        if (regRes.ok) {
            console.log(`✅ Registration Successful!`);
            console.log(`   Response:`, regData);
        } else {
            console.error(`❌ Registration Failed: ${regRes.status} ${regRes.statusText}`);
            console.error(`   Error:`, regData);
            process.exit(1);
        }

    } catch (error) {
        console.error(`❌ Registration Error:`, error.message);
        console.log(`⚠️ Make sure the server is running on port 5000`);
        process.exit(1);
    }

    // 2. Login
    try {
        console.log(`\n👉 Attempting Login...`);
        const loginRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const loginData = await loginRes.json();

        if (loginRes.ok) {
            console.log(`✅ Login Successful!`);
            console.log(`   Response:`, loginData);
        } else {
            console.error(`❌ Login Failed: ${loginRes.status} ${loginRes.statusText}`);
            console.error(`   Error:`, loginData);
            process.exit(1);
        }

    } catch (error) {
        console.error(`❌ Login Error:`, error.message);
        process.exit(1);
    }

    console.log(`\n🎉 Test Completed Successfully!`);
}

testAuth();
