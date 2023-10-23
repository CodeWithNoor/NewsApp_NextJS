/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        // NEXT_PUBLIC_NEWS_API_KEY: "d59092bc1211490eab0bf63662d7d023"
        // NEXT_PUBLIC_NEWS_API_KEY: "6ff98319596d471c808dfccdeef89753"
        NEXT_PUBLIC_NEWS_API_KEY: "5f2e76e35f7840559e9098782b489b26",
        MONGODB_URI: "mongodb://0.0.0.0:27017/newsApp",
        JWT_SECRET: "mysecretkey",
        DOMAIN: "http://localhost:3000",
        NODEMAILER_NAME: "03f5fcb9aa8a4b",
        NODEMAILER_PASSWORD: "a4b58d7cb210c5"
    }
}

module.exports = nextConfig
