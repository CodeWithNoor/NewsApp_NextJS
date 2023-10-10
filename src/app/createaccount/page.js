"use client"
import React, { useState } from "react"
import "./style.css"
import Link from "next/link"
import { Nunito } from "next/font/google"

const nunito = Nunito({
     weight: "800",
     subsets: ["latin"],
     display: "swap" 
})

const page = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
        })
        const data = await res.json()
        console.log(data)

        if (data.success) {
            alert("User Created Successfully")
            setName("")
            setEmail("")
            setPassword("")
        } else {
            alert(data.message)
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                <h1 className={`${nunito.className} text-center mb-2`}>CREATE ACCOUNT</h1>
                    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" />
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" />
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" />
                    {/* <input type="submit" className="bg-black text-white" /> */}
                    <button className="btn bg-black text-white" onSubmit={onSubmit}>Submit</button>
                    <p className="text-black text-center mt-2">If you have already account? </p>
                    <Link href={"/userlogin"} className="bg-black text-white">Sign In</Link>
                </div>
            </div>
        </>
    )
}

export default page