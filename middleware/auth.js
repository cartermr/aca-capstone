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
        jwt.verify(token, process.env.JWT_SECRET_STRING, (err, decoded) => {
            if (err) {
                res.sendStatus(403)
            }
            res.status(200).json(decoded)
        })
    } else {
        res.sendStatus(403)
    }
}

const hashPassword = async (pass) => {
    const hash = await bcrypt.hash(pass, 10)
    return hash
}

module.exports = {createToken, authenticate, checkPass, hashPassword}