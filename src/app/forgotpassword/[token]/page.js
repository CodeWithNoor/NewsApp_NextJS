import React from 'react'

const page = (props) => {
    const { token } = props.params
    console.log(token)
    return (
        <>
            <h1>Get Token</h1>
            <p>{token}</p>
        </>
    )
}

export default page