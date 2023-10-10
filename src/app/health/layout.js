"use client"
import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import Link from 'next/link'
import Health from './page'

export default function layout() {
    let pageSize = 15;
    let country = "us"
    let apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    // console.log(apiKey)
    let [progress, setProgress] = useState(0);

    return (
        <main>
            <LoadingBar
                color='#ffffff'
                height={3}
                shadow={true}
                progress={progress}
            />
            <Link href="/health" className='text-decoration-none' ><Health setProgress={setProgress} apiKey={apiKey} key={"health"} pageSize={pageSize} country={country} category={"health"} /></Link>
        </main>
    )
}
