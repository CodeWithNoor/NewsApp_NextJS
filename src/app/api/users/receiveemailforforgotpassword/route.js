import { connectionStr } from "@/lib/db";
import { Userdb } from "@/lib/model/Userdb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
    await mongoose.connect(connectionStr)
    const reqBody = await request.json()
    const { token } = reqBody

    const user = await Userdb.findOne({
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
        return NextResponse.json({ error: "Invalid token", success: false }, { status: 400 })
    }

    user.isVerified = true;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
        message: "Email verification successfully",
        success: true
    }, { status: 200 })
}

export async function GET() {
    await mongoose.connect(connectionStr)
    const users = await Userdb.find({})
    return NextResponse.json({ users, success: true }, { status: 200 })
}
