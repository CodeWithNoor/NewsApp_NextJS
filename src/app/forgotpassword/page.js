"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import "./style.css"
import { Nunito } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const nunito = Nunito({
    weight: "800",
    subsets: ["latin"],
    display: "swap"
})

const ForgotPassword = () => {
    const router = useRouter()
    const [newPassword, setNewPassword] = useState("")
    // const [confirmPassword, setConfirmPassword] = useState("")

    const onSubmit = async () => {
        const res = await fetch("http://localhost:3000/api/users/login", {
            method: "PUT",
            body: JSON.stringify({ newPassword })
        })
        const data = await res.json()
        if (data.success) {
            toast.success(data.message)
            setNewPassword("")
            router.push("/userlogin")
        } else {
            alert("something went wrong")
        }
    }

    return (
        <>
            <div className="container" id='reset'>
                <h1 className={`${nunito.className}`}>Reset Password</h1>
                <form action="" onSubmit={onSubmit}>
                    <input type="password" name='newPassword' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='Enter New Password' />
                    {/* <input type="password" name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' /> */}
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