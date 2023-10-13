// pages/api/reset-password.js
import mongoose from 'mongoose';
import { Userdb } from '@/lib/model/Userdb';
import { connectionStr } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req, res) {
    await mongoose.connect(connectionStr);

    const { token, password } = req.body;

    // Find the user with the provided token
    const user = await Userdb.findOne({ forgotPasswordToken: token });

    if (!user || user.forgotPasswordTokenExpiry < Date.now()) {
        return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Hash the new password and update the user's password in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return res.status(200).json({ message: 'Password reset successfully' });
} 