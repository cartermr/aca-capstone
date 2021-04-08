const {DB, mysql} = require('../database/DatabaseConnection')
const auth = require('../middleware/auth')

const newUser = async (req, res) => {
    let sql
    let newUser = req.body

    if (await checkUser(newUser.username)) {
        return res.sendStatus(404)
    }

    let hash = await auth.hashPassword(newUser.password)
    newUser.password = hash

    if (newUser.role === 'search') {
        sql = 'INSERT INTO Users (first_name, last_name, username, password, role) VALUES (?, ?, ?, ?, ?)'
    }

    if (newUser.role === 'register') {
        sql = 'INSERT INTO Users (first_name, last_name, address, phone, username, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)'
    }

    sql = mysql.format(sql, [...Object.values(newUser)])
    console.log(sql)
    DB.query(sql, ( err, result ) => {
        if ( err ) throw err
        console.log(result)
    })

    res.sendStatus(200)
}

const checkUser = async (username) => {
    console.log(username)
    let sql = 'SELECT * FROM Users WHERE username = ?'
    sql = mysql.format(sql, [username])
    let result = await query(sql)
    if (result.length > 0) {
        return true
    } else {
        return false
    }
}

const query = (sql) => {
    return new Promise( ( resolve, reject ) => {
        DB.query(sql, ( err, result ) => {
            if ( err ) {
                return reject(err)
            }
            resolve(result)
        })
    } )
}

module.exports = {newUser}