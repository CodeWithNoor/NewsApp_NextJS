"use client"
import React, { useState } from 'react'

const page = (props) => {
    let id = props.params.userId
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch(`http://localhost:3000/api/users/${id}`)
        const data = await res.json()
        console.log(data)

        if (data.success) {
            alert("User Created Successfully")
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
                    <form action="" onSubmit={onSubmit}>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' />
                        <button className='btn bg-black text-white' type='submit'>Sign In</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default page