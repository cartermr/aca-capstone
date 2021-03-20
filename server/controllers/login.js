const auth = require('../middleware/auth')
const {DB, mysql} = require('../database/DatabaseConnection')

const login = async (req, res) => {
    let username = req.body.username

    console.log(username)

    let sql = 'SELECT * FROM Users WHERE username = ?'
    sql = mysql.format(sql, [username])

    let user = await query(sql, [username]).then( res => res[0])

    console.log(user)

    if (user == null) {
        return res.sendStatus(403)
    }

    let authorized = await auth.checkPass(req.body.password, user.password)

    if (!authorized) {
        return res.sendStatus(403)
    }

    let token = await auth.createToken(user)
    // let token = await auth.createToken()

    console.log(token)

    res.cookie('authcookie', token, { expires: new Date(Date.now() + 900000), httpOnly: true }).json({'login': token})
}

const query = (sql, vals) => {
    return new Promise( ( resolve, reject ) => {
        DB.query(sql, vals, ( err, result ) => {
            if ( err ) {
                return reject(err)
            }
            resolve(result)
        })
    } )
}

module.exports = {login}