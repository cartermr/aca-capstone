const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// const createToken = async (user) => {
//     let token = jwt.sign({
//         user: user.username,
//         authorized_search: user.authorized_search,
//         regristrant_owner: user.regristrant_owner
//     }, process.env.JWT_SECRET_STRING)
//     return token
// }

const createToken = async (user) => {
    let token = jwt.sign({
        user: 'Matt'
    }, process.env.JWT_SECRET_STRING)
    return token
}

const checkPass = async (pass, hash) => {
    return await bcrypt.compare(pass, hash)
}

const checkJwt = (req, res, next) => {
    if (req.cookies.authcookie) {
        const token = req.cookies.authcookie
        console.log(token)
        jwt.verify(token, process.env.JWT_SECRET_STRING, (err, decoded) => {
            if (err) {
                console.log('test')
                res.sendStatus(403)
            }
            console.log('test3')
            res.sendStatus(200)
        })
    } else {
        console.log('test2')
        res.sendStatus(403)
    }
}

const hashPassword = async (pass) => {
    const hash = await bcrypt.hash(pass, 10)
    return hash
}

module.exports = {createToken, checkJwt, checkPass, hashPassword}





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