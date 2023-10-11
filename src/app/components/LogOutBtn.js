"use client"
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogOutBtn = () => {
    const handleLogout = async () => {
        const res = await fetch("http://localhost:3000/api/users/logout")
        const data = await res.json()
        if (data.success) {
            toast.success(data.message)
            window.location.href = "/userlogin"
        } else {
            alert(data.message)
        }
    }
    return (
        <>
            <button className='px-3 py-2 text-white' style={{ border: "1px solid #fff", background: "#ffffff00" }} onClick={handleLogout}>Log Out</button>
        </>
    )
}

export default LogOutBtn