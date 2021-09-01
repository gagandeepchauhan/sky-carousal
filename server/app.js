const express = require('express')
const app = express()

process.env.NODE_ENV === "development" && require('dotenv').config()


app.get("/", (req, res) => {
    res.send("hello world")
})

// routes
app.use('/categories',require('./routes/categories'))

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`App listening at PORT ${PORT}`))