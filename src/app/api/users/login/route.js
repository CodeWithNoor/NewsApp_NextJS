import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { Userdb } from "@/lib/model/Userdb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    await mongoose.connect(connectionStr)

    const reqBody = await req.json()
    const { email, password } = reqBody

    // check user if already exsist
    const user = await Userdb.findOne({ email })
    if (!user) {
        return NextResponse.json({ message: "User not found", success: false }, { status: 400 })
    }

    // check password
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return NextResponse.json({ message: "Invalid password", success: false }, { status: 400 })
    }

    // create token data
    const tokenData = {
        id: user._id,
        name: user.name,
        email: user.email,
    }

    // create token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" })

    const response = NextResponse.json({ message: "User Logged in Successfully", success: true }, { status: 200 })

    response.cookies.set("token", token, {
        httpOnly: true
    })

    return response
}


// upadte password and confirm password 
// export async function PUT(req) {
//     await mongoose.connect(connectionStr)
//     const reqBody = await req.json()
//     const { email, password } = reqBody;

//     const user = await Userdb.findOne({ email });
//     if (!user) {
//         return NextResponse.json({ error: 'User not found' });
//     }

//     // upadte password
//     const Updatedpassword = await Userdb.findOneAndUpdate(email, { password: password });

//     // Hash the new password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(Updatedpassword, salt);
//     console.log(hashedPassword)

//     // Update the user's password in the database
//     user.Updatedpassword = hashedPassword;
//     await user.save();

//     return NextResponse.json({ message: 'Password updated successfully', success: true }, { status: 200 });

// }