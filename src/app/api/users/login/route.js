import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { Userdb } from "@/lib/model/Userdb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        await mongoose.connect(connectionStr);
        const reqBody = await req.json();
        const { email, password } = reqBody;

        // Check if the user already exists
        const user = await Userdb.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 400 });
        }

        // Check the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ message: "Invalid password", success: false }, { status: 400 });
        }

        // Create token data and issue a token for login
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email,
        }

        // Create a token for the user's session
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

        const response = NextResponse.json({ message: "User Logged in Successfully", success: true }, { status: 200 });
        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}

// get data of all users
export async function GET() {
    await mongoose.connect(connectionStr)
    const users = await Userdb.find({})
    return NextResponse.json({ users, success: true }, { status: 200 })
}