/**
 * NVIS Server
 * Created by: Matt Carter
 */
require('dotenv').config()

let port = process.env.PORT || 8080

// import express and initialize
const express = require('express')
const path = require('path')
const app = express()
const cookieParser = require('cookie-parser')

// import router
const router = require('./routes/router')

// setup express middleware
app.use(express.json())
app.use(cookieParser())

// serve frontend
// app.use(express.static(path.join(__dirname, '/client/build')))

// routes
app.use('/api', router)

// helper path for react-router routes
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/client/build/index.html'))
// })

// start server //
app.listen(port, () => console.log(`NVIS-Server started on port ${port}`))