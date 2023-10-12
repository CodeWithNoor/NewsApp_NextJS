import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { Userdb } from "@/lib/model/Userdb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/userverification"

export async function POST(req) {
    await mongoose.connect(connectionStr)
    const reqBody = await req.json()
    const { name, email, password } = reqBody

    if (!name || !email || !password) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 400 })
    }

    // check user if already exsist
    const user = await Userdb.findOne({ email })

    if (user) {
        return NextResponse.json({ message: "User already exsist", success: false }, { status: 400 })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await new Userdb({
        name,
        email,
        password: hashedPassword
    })

    // send email to user
    const userSaved = await newUser.save()
    console.log(userSaved)
    await sendEmail({ email, emailType: "VERIFY", userId: userSaved._id })

    return NextResponse.json({ message: "User Created Successfully", success: true }, { status: 200 })
}