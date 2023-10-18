import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { Userdb } from "@/lib/model/Userdb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function PUT(req, content) {
    try {
        const userId = content.params.userId;
        const payload = await req.json();
        const { password } = payload;

        // Connect to the database
        await mongoose.connect(connectionStr);

        // Find the user by ID
        const user = await Userdb.findById(userId);

        if (!user) {
            return NextResponse.json({ error: "User not found", success: false }, { status: 404 });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update the user's password in the database
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({ message: "Password has been changed successfully", success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}

// get single user data

export async function GET(req, content) {
    try {
        const userid = content.params.userId;
        const record = { _id: userid }

        await mongoose.connect(connectionStr)
        const result = await Userdb.findById(record)

        return NextResponse.json({ result, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ result: "Something went wrong", success: false }, { status: 500 })
    }
}