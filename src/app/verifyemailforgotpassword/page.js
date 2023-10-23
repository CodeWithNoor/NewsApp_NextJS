"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import "./style.css"
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

export default function VerifyEmailForgotPassword() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    // const router = useRouter()

    const verifyUserEmail = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/users/receiveemailforforgotpassword", {
                method: "POST",
                body: JSON.stringify({ token })
            })
            const data = await res.json();
            console.log(data);
            if (data.success) {
                toast.success(data.message);
                setVerified(true);
            }
        } catch (error) {
            toast.error(error.message)
            setError(true);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="container" id="emailverified">
            <ToastContainer />
            <h1 className="text-black text-center">Verify Email</h1>
            <p className="text-black text-center"> Check the email if you are verified then change your password </p>
            <h5 className="text-white text-sm bg-secondary px-2 py-1">{token ? `${token}` : "no token"}</h5>

            {verified && (
                <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                    <h5 className="text-black">Your email verification has been successfully now update your password</h5>
                    <Link href={`/verifyemailforgotpassword/${token}`} className="bg-black text-white py-3 px-4 text-decoration-none my-3">RESET PASSWORD</Link>
                </div>
            )}
            {error && (
                <div><h2 className="text-black bg-black text-white py-3 px-4 text-decoration-none my-3" >Error</h2></div>
            )}
        </div>
    )

}