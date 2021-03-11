// import express and initialize a router
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

// import services to route requests to (services to be used)
const {search} = require('../controllers/search') // Search functions
const {register} = require('../controllers/register') // Register new person function
const {newAgencyUser} = require('../controllers/newAgencyUser')
const {login} = require('../controllers/login')
const {logout} = require('../controllers/logout')

// import middleware to be used
const {multer, upload} = require('../middleware/fileUpload') // handle image upload

// defined routes (api endpoints)
router.post('/authenticate/:type', auth.checkJwt)
router.post('/logout', logout)

router.post('/login', login)

// route create new agency user
router.post('/newuser', newAgencyUser)

// route to perform search
router.post('/search', search)

// route to register a person
router.post('/register', multer.single('photoSelect'), upload, register)

// export router
module.exports = router