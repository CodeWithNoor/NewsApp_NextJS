"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import "./style.css"
import { Nunito } from 'next/font/google'

const nunito = Nunito({
  weight: "800",
  subsets: ['latin'],
  display: 'swap'
})
const page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    console.log("you clicked me")
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <form action="" onSubmit={onSubmit}>
            <h1 className={nunito.className}>SIGN IN</h1>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' />
            <button className='btn bg-black text-white' type='submit'>Sign In</button>
            <Link href="/createaccount" className='btn bg-black text-white'>Create Account</Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default page