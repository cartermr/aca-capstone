// import express and initialize a router
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

// import services to route requests to (services to be used)
const {search} = require('../controllers/search') // Search functions
const {register} = require('../controllers/register') // Register new person function
const {newUser} = require('../controllers/newUser')
const {login} = require('../controllers/login')
const {logout} = require('../controllers/logout')
const {registeredPeople} = require('../controllers/registeredPeople')

// import middleware to be used
const {multer, upload} = require('../middleware/fileUpload') // handle image upload

// defined routes (api endpoints)
// public endpoints
router.post('/authenticate', auth.authenticate)
router.get('/logout', logout)
router.post('/login', login)

// route create new user
router.post('/newuser', newUser)

// route to perform search
router.post('/search', search)

// route to register a person
router.post('/register', multer.single('photo'), upload, register)
router.post('/getregistered', registeredPeople)

// export router
module.exports = router