"use client"
import React from 'react'
import Link from 'next/link'

const NewsItem = (props) => {
    let { title, description, imageURL, author, date, source, content } = props // destructuring props

    return (
        <div>
            <div className="card" style={{ width: '21rem' }}>
                <img src={!imageURL ? "https://www.mooc.org/hubfs/applications-of-computer-programming.jpg" : imageURL} className="card-img-top" alt="..." />

                <div className="card-body">
                    <span className=" translate-right badge rounded-pill bg-light text-dark d-flex justify-content-end position-absolute" style={{ top: "10px", right: "10px" }}>{source}<span className="visually-hidden">unread messages</span></span>
                    <h5 className="card-title">{title} </h5>

                    <p className="card-text">{description}...</p>
                    <p className="card-text">{content}...</p>
                    <p className="card-text"><small className="text-muted"> By{!author ? "Anonymous" : author} on {new Date(date).toGMTString()}</small></p>
                    <Link href={props.newsURL} className="py-2 px-3 text-white text-decoration-none" style={{background: "black"}}>Read More</Link>
                </div>
            </div>
        </div>
    )
}

export default NewsItem