// pages/api/reset-password.js
import mongoose from 'mongoose';
import { Userdb } from '@/lib/model/Userdb';
import { connectionStr } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function PUT(req) {
    await mongoose.connect(connectionStr);
    
    const { email, password } = req.body;

    // Find the user with the provided token
    const user = await Userdb.findOne({ email });

    if (!user) {
        return NextResponse.json({ error: 'Invalid user', success: false }, { status: 400 });
    }

    // Hash the new password and update the user's password in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.isVerified = true;
    user.password = hashedPassword;

    await user.save();

    const response = NextResponse.json({ message: "password changed Successfully", success: true }, { status: 200 })
    return response
} 