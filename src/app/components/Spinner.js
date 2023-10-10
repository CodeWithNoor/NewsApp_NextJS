import React from 'react'
import Image from 'next/image'
import loader from "./loader.gif"

const Spinner = () => {
    return (
        <div className="text-center">
            <Image src={loader} alt="loading" width={200} height={200} />
        </div>
    )
}

export default Spinner