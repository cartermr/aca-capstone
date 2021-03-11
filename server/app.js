/**
 * NVIS Server
 * Created by: Matt Carter
 */
require('dotenv').config()

let port = process.env.PORT || 8080

// import express and initialize
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

// import router
const router = require('./routes/router')

// setup express middleware
app.use(express.json())
app.use(cookieParser())

// serve frontend
app.use(express.static('public'))

// routes
app.use('/api', router)

// start server //
app.listen(port, () => console.log(`NVIS-Server started on port ${port}`))


/**  Using Online Auto0 service
//const {auth, config, requiresAuth} = require('./middleware/auth')
//app.use(auth(config))
//app.use(requiresAuth())
***************************************************************************/
