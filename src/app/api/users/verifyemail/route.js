import { connectionStr } from "@/lib/db";
import { Userdb } from "@/lib/model/Userdb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";


export async function POST(request) {
    await mongoose.connect(connectionStr)
    const reqBody = await request.json()
    const { token } = reqBody

    const user = await Userdb.findOne({
        verifiedToken: token,
        verifiedTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
        return NextResponse.json({ error: "Invalid token" }, { status: 400 })
    }
    console.log(user);

    user.isVerified = true;
    user.verifiedToken = undefined;
    user.verifiedTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
        message: "Email verification successfully",
        success: true
    })
}
