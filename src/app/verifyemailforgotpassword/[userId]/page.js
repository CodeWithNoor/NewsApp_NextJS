"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Nunito } from 'next/font/google'
import "../style.css"


const nunito = Nunito({
    weight: "800",
    subsets: ["latin"],
    display: "swap",
})
const usertoken = (props) => {
    // const token = props.params.token
    // console.log(token)
    const router = useRouter()
    const [password, setPassword] = useState("")

    // call api for single users
    const userData = async () => {
        const res = await fetch(`http://localhost:3000/api/users/receiveemailforforgotpassword/${props.params.userId}`)
        const data = await res.json()
        return data.users
    }

    useEffect(() => {
        userData()
    }, [])

    // update password
    const updatePass = async () => {
        const response = await fetch(`http://localhost:3000/api/users/receiveemailforforgotpassword/${props.params.userId}`, {
            method: "PUT",
            body: JSON.stringify({ password }),
        })
        const data = await response.json()
        if (data.success) {
            alert(data.message)
            setPassword("")
            router.push("/userlogin")
        } else {
            alert(data.error)
        }
    }

    return (
        <>
            <div className="container" id='container'>
                <h1 className={`${nunito.className}`}>Reset Password</h1>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter New Password' />
                <button type="submit" className='bg-black text-white' onClick={updatePass}>SUBMIT</button>
            </div>
        </>
    )
}

export default usertoken