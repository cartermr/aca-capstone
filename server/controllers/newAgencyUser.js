const db = require('../database/DatabaseConnection')
const auth = require('../middleware/auth')

const newAgencyUser = async (req, res) => {
    let newUser = req.body

    if (await checkUser(newUser.username)) {
        return res.sendStatus(404)
    }

    let hash = await auth.hashPassword(newUser.hash)
    newUser.hash = hash
    let sql = 'INSERT INTO "Users" (first_name, last_name, username, hash, authorized_search, regristrant_owner) VALUES ($1, $2, $3, $4, $5, $6)'
    db.query(sql, [...Object.values(newUser)])

    res.sendStatus(200)
}

const checkUser = async (username) => {
    let sql = 'SELECT * FROM "Users" WHERE username = $1'
    let user = await db.query(sql, [username]).then(data => data.rows)
    console.log(user)
    if (user.length > 0) {
        return true
    }
    return false
}

module.exports = {newAgencyUser}