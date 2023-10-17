// pages/api/reset-password.js
import mongoose from 'mongoose';
import { Userdb } from '@/lib/model/Userdb';
import { connectionStr } from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function PUT(req) {
    try {
        await mongoose.connect(connectionStr);
        const payload = await req.json();
        const { email, password } = payload;

        // Find the user with the provided token
        const user = await Userdb.findOne({ email });
        console.log(user)

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

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
} 