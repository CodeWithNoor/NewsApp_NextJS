"use client"
import React, { useState } from "react"
import "./style.css"
import Link from "next/link"
import { Nunito } from "next/font/google"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const nunito = Nunito({
    weight: "800",
    subsets: ["latin"],
    display: "swap"
})

const page = () => {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch("http://localhost:3000/api/users/signup", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
        })
        const data = await res.json()
        if (data.success) {
            toast.success(data.message)
            setName("")
            setEmail("")
            setPassword("")
            router.push("/userlogin")
        } else {
            alert(data.message)
        }
    }

    return (
        <>
            <div className="container">
                <ToastContainer />
                <div className="row">
                    <form action="" onSubmit={onSubmit}>
                        <h1 className={`${nunito.className} text-center mb-2`}>CREATE ACCOUNT</h1>
                        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" />
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" />
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" />
                        <input type="submit" className="bg-black text-white" />
                        <p className="text-black text-center mt-2">If you have already account? </p>
                        <Link href={"/userlogin"} className="btn bg-black text-white">Sign In</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default page