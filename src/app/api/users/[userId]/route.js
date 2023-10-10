import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { Userdb } from "@/lib/model/Userdb";
import { NextResponse } from "next/server";


export async function GET(req, res) {
    await mongoose.connect(connectionStr)
    const payload = await Userdb.findById(res.params.userId)
    console.log(payload)
    if (!payload) {
        return NextResponse.json({ message: "No User Found", success: false }, { status: 400 })
    }
    return NextResponse.json({ message: payload, success: true }, { status: 200 })
}

export async function DELETE(req, res) {
    await mongoose.connect(connectionStr)
    const payload = await Userdb.findByIdAndDelete(res.params.userId)
    console.log(payload)
    if (!payload) {
        return NextResponse.json({ message: "No User Found", success: false }, { status: 400 })
    }
    return NextResponse.json({ message: "User Deleted Successfully", success: true }, { status: 200 })
}