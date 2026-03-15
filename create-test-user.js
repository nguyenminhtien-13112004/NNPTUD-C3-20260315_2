// Script để tạo user test
require('dotenv').config();
const mongoose = require('mongoose');
const userModel = require('./schemas/users');

// Kết nối MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/NNPTUD-C3';
const dbTimeout = parseInt(process.env.DB_TIMEOUT_MS) || 5000;

async function createTestUser() {
    try {
        // Kết nối MongoDB
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: dbTimeout
        });
        console.log('Connected to MongoDB');

        // Thông tin user test
        const testUser = {
            username: 'testuser',
            password: 'Test123!@#',  // Sẽ được hash tự động bởi pre-save hook
            email: 'testuser@example.com',
            role: '69b6231b3de61addb401ea26',  // Role ID từ register endpoint
            fullName: 'Test User',
            status: true,
            loginCount: 0
        };

        // Kiểm tra xem user đã tồn tại chưa
        const existingUser = await userModel.findOne({ 
            username: testUser.username,
            isDeleted: false 
        });

        if (existingUser) {
            console.log('User đã tồn tại!');
            console.log('Username:', testUser.username);
            console.log('Password:', testUser.password);
            console.log('Email:', testUser.email);
            await mongoose.disconnect();
            return;
        }

        // Tạo user mới
        const newUser = new userModel(testUser);
        await newUser.save();

        console.log('\n✅ Tạo user test thành công!');
        console.log('================================');
        console.log('Username:', testUser.username);
        console.log('Password:', testUser.password);
        console.log('Email:', testUser.email);
        console.log('================================\n');

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error creating test user:', error.message);
        if (error.code === 11000) {
            console.error('User đã tồn tại (duplicate key error)');
        }
        process.exit(1);
    }
}

createTestUser();
