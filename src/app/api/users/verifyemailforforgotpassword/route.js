import { connectionStr } from "@/lib/db";
import { Userdb } from "@/lib/model/Userdb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";


export async function POST(req) {
    await mongoose.connect(connectionStr)

    const reqBody = await req.json()
    const { email } = reqBody

    // check user if already exsist
    const user = await Userdb.findOne({ email })
    if (!user) {
        return NextResponse.json({ message: "User not found", success: false }, { status: 400 })
    }

    // create token data
    const tokenData = {
        id: user._id,
        name: user.name,
        email: user.email,
    }

    // create token
    // const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" })

    const response = NextResponse.json({ message: "Please change your password", success: true }, { status: 200 })

    // response.cookies.set("token", token, {
    //     httpOnly: true
    // })

    return response
}
