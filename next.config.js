/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx'],

    env: {
        MONGO_URL: "mongodb+srv://ilbuso:oSINQeCJP9FYDGds@bookeasy-0.zxqse2p.mongodb.net/?retryWrites=true&w=majority",
    }
}
module.exports = nextConfig
