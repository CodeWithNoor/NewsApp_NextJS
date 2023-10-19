"use client"
import React, { useState } from 'react'
import Entertainment from './page'
import LoadingBar from 'react-top-loading-bar'
import Link from 'next/link'

export default function Layout() {
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
            <Link href="/entertainment" className='text-decoration-none' ><Entertainment setProgress={setProgress} apiKey={apiKey} key={"entertainment"} pageSize={pageSize} country={country} category={"entertainment"} /></Link>
        </main>
    )
}
