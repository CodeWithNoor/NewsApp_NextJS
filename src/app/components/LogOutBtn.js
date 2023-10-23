"use client"
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogOutBtn = () => {
    const handleLogout = async () => {
        const res = await fetch("https://news-app-next-js-one.vercel.app/api/users/logout")
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
            <div onClick={handleLogout} className='px-3 py-2 text-white border btn-sm bg-black' style={{cursor: "pointer"}} id="btn">Log Out</div>
        </>
    )
}

export default LogOutBtn