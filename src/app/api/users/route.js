import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { Userdb } from "@/lib/model/Userdb";

export async function POST(req, res) {
    const payload = await req.json()
    await mongoose.connect(connectionStr)

    const user = await new Userdb(payload)
    if (!user.name || !user.email || !user.password) {
        return NextResponse.json({ message: "Please fill all the fields", success: false }, { status: 400 })
    }

    const result = await user.save()
    console.log(result)
    return NextResponse.json({ message: result, success: true }, { status: 200 })
}

export async function GET(req, res){
    await mongoose.connect(connectionStr)
    
    const result = await Userdb.find()
    console.log(result)
    if(!result){
        return NextResponse.json({message: "No User Found", success: false}, { status: 400 })
    }
    return NextResponse.json({ message: result, success: true}, { status: 200 })    
}