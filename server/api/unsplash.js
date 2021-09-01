const axios = require('axios')

module.exports = axios.create({
    baseURL: "https://api.unsplash.com",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Client-ID ${process.env.ACCESS_KEY}`,
        "Accept-Version": 'v1'
    }
})