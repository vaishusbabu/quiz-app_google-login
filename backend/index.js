const express = require('express')
const app = express()


const db = require('./dbconnection')

app.listen(4002, () => {
    console.log("server started")
})