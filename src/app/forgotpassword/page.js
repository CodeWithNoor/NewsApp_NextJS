"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import "./style.css"
import { Nunito } from 'next/font/google'

const nunito = Nunito({
    weight: "800",
    subsets: ["latin"],
    display: "swap"
})

const ForgotPassword = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch("http://localhost:3000/api/users/forgotpassword", {
            method: "POST",
            body: JSON.stringify({ password, confirmPassword })
        })

        const data = await res.json()
        console.log(data)

        if (data.success) {
            alert("Password has been changed successfully")
            setPassword("")
            setConfirmPassword("")
        } else {
            alert("Something went wrong")
        }
        if (password !== confirmPassword) {
            alert("Password doesn't match")
        } else {
            alert("Password match")
        }
    }

    return (
        <>
            <div className="container" id='reset'>
                <h1 className={`${nunito.className}`}>Reset Password</h1>
                <form action="" onSubmit={onSubmit}>
                    <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    <input type="password" name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' />
                    <input type="button" value="SUBMIT" className='bg-black text-white' />
                </form>
                <div className='mt-2'>
                    <p className='fs-6 text-center text-black'> If you have not reset password then click sign in? </p>
                    <Link href={"/verifyemailforforgotpassword"} id='loginBtn' className='text-decoration-none bg-black text-center text-white'>VERIFY EMAIL</Link>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword