import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import bcrypt from 'bcryptjs';
import { config } from './config';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(config.mongodbUri);
        console.log('Connected to MongoDB');

        const adminEmail = 'admin@meefarms.com';
        const adminPassword = 'adminpassword123';

        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(adminPassword, salt);

        const adminUser = new User({
            name: 'Admin User',
            email: adminEmail,
            passwordHash,
            isAdmin: true
        });

        await adminUser.save();
        console.log('Admin user created successfully');
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdmin();
