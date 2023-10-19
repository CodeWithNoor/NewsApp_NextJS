"use client"
import React, { useState } from 'react'
// import News from './news/page'
import Business from './page'
// import Entertainment from './entertainment/page'
import LoadingBar from 'react-top-loading-bar'
import Link from 'next/link'
// import Health from './health/page'
// import Science from './science/page'
// import Sports from './sports/page'
// import Technology from './technology/page'

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
      {/* <Link href="/" className='text-decoration-none' ><News setProgress={setProgress} apiKey={apiKey} key={"general"} pageSize={pageSize} country={country} category={"general"} /></Link> */}
      <Link href="/business" className='text-decoration-none' ><Business setProgress={setProgress} apiKey={apiKey} key={"business"} pageSize={pageSize} country={country} category={"business"} /></Link>
      {/* <Link href="/entertainment" className='text-decoration-none' ><Entertainment setProgress={setProgress} apiKey={apiKey} key={"entertainment"} pageSize={pageSize} country={country} category={"entertainment"} /></Link>
      <Link href="/health" className='text-decoration-none' ><Health setProgress={setProgress} apiKey={apiKey} key={"health"} pageSize={pageSize} country={country} category={"health"} /></Link>
      <Link href="/science" className='text-decoration-none' ><Science setProgress={setProgress} apiKey={apiKey} key={"science"} pageSize={pageSize} country={country} category={"science"} /></Link>
      <Link href="/sports" className='text-decoration-none' ><Sports setProgress={setProgress} apiKey={apiKey} key={"sports"} pageSize={pageSize} country={country} category={"sports"} /></Link>
      <Link href="/technology" className='text-decoration-none' ><Technology setProgress={setProgress} apiKey={apiKey} key={"technology"} pageSize={pageSize} country={country} category={"category"} /></Link> */}
    </main>
  )
}
