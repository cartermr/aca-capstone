const {DB, mysql} = require('../database/DatabaseConnection')
const auth = require('../middleware/auth')

const newUser = async (req, res) => {
    let newUser = req.body

    if (checkUser(newUser.username)) {
        return res.sendStatus(404)
    }

    let hash = await auth.hashPassword(newUser.password)
    newUser.password = hash
    let sql = 'INSERT INTO Users (first_name, last_name, username, password, role) VALUES (?, ?, ?, ?, ?)'
    sql = mysql.format(sql, [...Object.values(newUser)])
    DB.query(sql, ( err, result ) => {
        if ( err ) throw err
        console.log(result)
    })

    res.sendStatus(200)
}

const checkUser = (username) => {
    let sql = 'SELECT * FROM Users WHERE username = ?'
    sql = mysql.format(sql, [username])
    return DB.query(sql, ( err, result ) => {
        if ( err ) throw err
        if (result.length > 0) {
            return true
        } else {
            return false
        }
    })
}

module.exports = {newUser}