"use client"
import React, { useState } from 'react'
import "./style.css"
import { Nunito } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const nunito = Nunito({
    weight: "800",
    subsets: ["latin"],
    display: "swap"
})

const VerifyEmailForForgotPassword = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")

    const verificationEmail = async () => {
        try {
            const res = await fetch("https://news-app-next-js-one.vercel.app/api/users/verifyemailforforgotpassword", {
                method: "POST",
                body: JSON.stringify({ email })
            })
            const data = await res.json()
            if (data.success) {
                alert("Email has been verified successfully")
                setEmail("")
                router.push(`/verifyemailforgotpassword`)
            } else {
                alert("Please enter valid email")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleSignin = () => {
        router.push("/userlogin")
    }

    return (
        <>
            <div className="container" id='forgot'>
                <h1 className={`${nunito.className}`}>Verify Email For Forgot Password</h1>
                <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
                <button className="bg-black text-white" onClick={verificationEmail}>VERIFY EMAIL</button>
                <p className="p-0 m-0 text-center mt-3 fs-6">If you have don&#39;t reset password?</p>
                <button className="bg-black text-white" onClick={handleSignin}>SIGN IN</button>
            </div>
        </>
    )
}

export default VerifyEmailForForgotPassword