/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        // NEXT_PUBLIC_NEWS_API_KEY: "d59092bc1211490eab0bf63662d7d023"
        // NEXT_PUBLIC_NEWS_API_KEY: "6ff98319596d471c808dfccdeef89753"
        NEXT_PUBLIC_NEWS_API_KEY: "5f2e76e35f7840559e9098782b489b26",
        MONGODB_URI: "mongodb://0.0.0.0:27017/newsApp",
        JWT_SECRET: "mysecretkey"
    }
}

module.exports = nextConfig
