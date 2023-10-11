import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifiedToken: String,
    verifiedTokenExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

export const Userdb = mongoose.models.users || mongoose.model("users", userSchema)