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
  subsets: ['latin'],
  display: 'swap'
})
const page = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (data.success) {
      toast.success(data.message)
      setEmail('')
      setPassword('')
      router.push('/')
    } else {
      toast.error(data.message)
    }
  }

  return (
    <>
      <div className="container">
        <ToastContainer />
        <div className="row">
          <form action="" onSubmit={onSubmit}>
            <h1 className={nunito.className}>SIGN IN</h1>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' />
            <input className='btn bg-black text-white' type='submit' />
            <Link href="/createaccount" className='btn bg-black text-white'>Create Account</Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default page