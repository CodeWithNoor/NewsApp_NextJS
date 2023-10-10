"use client"
import React, { useEffect, useState } from "react";
import NewsItem from "../components/NewsItem";
import Spinner from "../components/Spinner";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Nunito } from "next/font/google"
import "./style.css"

const nunito = Nunito({
    weight: "400",
    subsets: ['latin'],
    display: 'swap',
})

const Sports = (props) => {
    const { country, category, apiKey, pageSize } = props
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);


    const CapitalizeFirstChar = (String) => {
        return String.charAt(0).toUpperCase() + String.slice(1);
    }

    const updateNews = async (pageNo) => {
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(30)
        let parseData = await data.json()
        props.setProgress(70)
        console.log(parseData)

        setArticles(parseData.articles)
        setTotalResults(parseData.totalResults)
        setLoading(false)

        props.setProgress(100)

    }

    useEffect(() => {
        updateNews()
    }, []);

    const fetchMoreData = async () => {
        setLoading(true);
        const URL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page + 1}&pageSize=${pageSize}`;
        setPage(page + 1)
        const response = await fetch(URL);
        const data = await response.json();
        console.log(data)
        setArticles(articles.concat(data.articles));
        setTotalResults(data.totalResults);
        setLoading(false);
    };


    return (
        <>
            <div className="container text-center my-5" >
                <h1 className={nunito.className}>NewsApp - Top {CapitalizeFirstChar(`${props.category}`)} Headlines </h1>
                {loading && <Spinner />}

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >

                    <div className="container">

                        <div className="row d-flex flex-row align-items-start justify-content-center">
                            {articles.map((element, index) => {
                                return <div className="col-md-3 p-0" style={{ margin: '20px' }} key={index}>
                                    <NewsItem
                                        title={element.title ? element.title.slice(0, 40) : ""}
                                        description={element.description ? element.description.slice(0, 70) : "Description not found"}
                                        content={element.content ? element.content.slice(0, 100) : "Content not found"}
                                        imageURL={element.urlToImage}
                                        newsURL={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name} />
                                </div>
                            })}
                        </div>

                    </div>
                </InfiniteScroll>
            </div>
        </>

    );
}

export default Sports;


