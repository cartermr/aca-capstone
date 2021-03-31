const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createToken = async (user) => {
    let token = jwt.sign(user, process.env.JWT_SECRET_STRING || 'test')
    return token
}

const checkPass = async (pass, hash) => {
    return await bcrypt.compare(pass, hash)
}

const authenticate = (req, res, next) => {
    if (req.cookies.authcookie) {
        const token = req.cookies.authcookie
        console.log(token)
        jwt.verify(token, process.env.JWT_SECRET_STRING || 'test', (err, decoded) => {
            if (err) {
                console.log('token not verify')
                res.sendStatus(403)
            }
            console.log('auth OK')
            res.status(200).json(decoded)
        })
    } else {
        console.log('Auth Cookie not there')
        // res.sendStatus(403)
        res.status(403).json('false')
    }
}

const checkJwt = (req, res, next) => {
    if (req.cookies.authcookie) {
        const token = req.cookies.authcookie
        console.log(token)
        jwt.verify(token, process.env.JWT_SECRET_STRING || 'test', (err, decoded) => {
            if (err) {
                console.log('token not verify')
                res.sendStatus(403)
            }
            console.log('auth OK')
            
            if (decoded.role === 'search') {
                next()
            } else {
                res.sendStatus(403)
            }
        })
    } else {
        console.log('Auth Cookie not there')
        // res.sendStatus(403)
        res.status(403).json('false')
    }
}

const hashPassword = async (pass) => {
    const hash = await bcrypt.hash(pass, 10)
    return hash
}

module.exports = {createToken, authenticate, checkJwt, checkPass, hashPassword}





/** Using Online Auto0 Service
        const {auth, requiresAuth} = require('express-openid-connect')
        let port = process.env.PORT || 8080
        const config = {
            authRequired: false,
            auth0Logout: true,
            secret: process.env.SEC,
            baseURL: `http://localhost:${port}`,
            clientID: process.env.AUTH_CLIENT_ID,
            issuerBaseURL: process.env.ISSUER_URL
        }
 */