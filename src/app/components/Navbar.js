"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import LogOutBtn from './LogOutBtn'

const Navbar = () => {
    const [show, setShow] = useState(true)

    useEffect(() => {
        if (window.location.pathname === "/userlogin" || window.location.pathname === "/createaccount" || window.location.pathname === "/verifyemailforforgotpassword" || window.location.pathname === "/forgotpassword") {
            setShow(false)
        } else {
            setShow(true)
        }
    }, [])

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-black" >
                <div className="container-fluid py-2 px-5">
                    <Link className="navbar-brand text-light" href="/">NewsApp📑</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse mx-5" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-white active" aria-current="page" href="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" href="/business">Business</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" href="/entertainment">Entertainment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" href="/">General</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" href="/health">Health</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" href="/science">Science</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" href="/sports">Sports</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" href="/technology">Technology</Link>
                            </li>
                        </ul>
                        {show ? <LogOutBtn id="btn" /> : <></>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar