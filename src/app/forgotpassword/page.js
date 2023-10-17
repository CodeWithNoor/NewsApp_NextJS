"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Nunito } from 'next/font/google'
import "./style.css"

const nunito = Nunito({
    weight: "800",
    subsets: ["latin"],
    display: "swap",
})

const page = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const updatePass = async () => {
        const res = await fetch("http://localhost:3000/api/users/resetpassword", {
            method: "PUT",
            body: JSON.stringify({ email, password }),
        })
        const data = await res.json()
        console.log(data)

        if (data.success) {
            alert(data.message)
            setEmail("")
            setPassword("")
            router.push("/userlogin")
        } else {
            alert(data.error)
        }
    }

    return (
        <>
            <div className="container" id='reset'>
                <h1 className={`${nunito.className}`}>Reset Password</h1>

                <div id="resetpass">
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter New Password' />
                    <button type="submit" onClick={updatePass} className='bg-black text-white'>SIGN IN</button>
                </div>
            </div>
        </>
    )
}

export default page