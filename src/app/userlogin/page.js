"use client"
import React, { useState } from 'react'
import "./style.css"
import Link from 'next/link'
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
        <div className="row" id='row'>
          <h1 className={nunito.className}>SIGN IN</h1>
          <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
          <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' />
          <button className='bg-black text-white' onClick={onSubmit}>SIGN IN</button>
          <p className='text-black text-center mt-2'><Link href="/verifyemailforforgotpassword" className='text-info cursor-pointer'>Forgot Password</Link></p>
          <p className='text-black text-center mt-2'>No account? <Link href="/createaccount" className='text-info'>Get One Here</Link></p>
        </div>
      </div>
    </>
  )
}

export default page