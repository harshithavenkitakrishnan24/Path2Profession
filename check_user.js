const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./backend/models/User');

async function checkUser() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const users = await User.find({}, 'email displayName isVerified');
        console.log('Total users:', users.length);
        users.forEach(u => console.log(`- ${u.email} (${u.displayName})`));

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkUser();
