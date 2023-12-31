"use client"
import React, { useState } from 'react'
import News from './news/page'
import LoadingBar from 'react-top-loading-bar'
import Link from 'next/link'

export default function Home() {
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
      <Link href="/" className='text-decoration-none' ><News setProgress={setProgress} apiKey={apiKey} key={"general"} pageSize={pageSize} country={country} category={"general"} /></Link>
    </main>
  )
}
