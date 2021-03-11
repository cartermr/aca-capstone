const auth = require('../middleware/auth')
const db = require('../database/DatabaseConnection')

const login = async (req, res) => {
    let username = req.body.username

    let sql = 'SELECT * FROM "Users" WHERE username = $1'

    user = await db.query(sql, [username]).then(data => data.rows[0])

    if (user == null) {
        return res.sendStatus(403)
    }

    let authorized = await auth.checkPass(req.body.password, user.hash)

    if (!authorized) {
        return res.sendStatus(403)
    }

    let token = await auth.createToken(user)

    res.cookie('authcookie', token, { expires: new Date(Date.now() + 900000), httpOnly: true }).json({'login': 'successful'})
}

module.exports = {login}