const express = require('express')
const app = express()
const cors = require('cors')

process.env.NODE_ENV === "development" && require('dotenv').config()

app.use(cors({
    origin: process.env.CORS_URL
}))


app.get("/", (req, res) => {
    res.send("hello world")
})

// routes
app.use('/categories',require('./routes/categories'))

app.get('*',(req,res)=>{
    res.status(404).json({
        error: 'Not found'
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`App listening at PORT ${PORT}`))