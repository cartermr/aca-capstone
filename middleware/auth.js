const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createToken = async (user) => {
    let token = jwt.sign({...user}, process.env.JWT_SECRET_STRING)
    return token
}

const checkPass = async (pass, hash) => {
    return await bcrypt.compare(pass, hash)
}

const authenticate = (req, res, next) => {
    if (req.cookies.authcookie) {
        const token = req.cookies.authcookie
        // console.log(token)
        jwt.verify(token, process.env.JWT_SECRET_STRING, (err, decoded) => {
            if (err) {
                // console.log('token not verify')
                res.sendStatus(403)
            }
            // console.log('auth OK')
            res.status(200).json(decoded)
        })
    } else {
        // console.log('Auth Cookie not there')
        res.sendStatus(403)
    }
}

const hashPassword = async (pass) => {
    const hash = await bcrypt.hash(pass, 10)
    return hash
}

module.exports = {createToken, authenticate, checkPass, hashPassword}