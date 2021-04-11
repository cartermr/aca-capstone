const auth = require('../middleware/auth')
const {DB, mysql} = require('../database/DatabaseConnection')

const login = async (req, res) => {
    let username = req.body.username


    let sql = 'SELECT * FROM Users WHERE username = ?'
    sql = mysql.format(sql, [username])

    let user = await query(sql).then( res => res[0])


    if (user == null) {
        return res.sendStatus(403)
    }

    let authorized = await auth.checkPass(req.body.password, user.password)

    if (!authorized) {
        return res.sendStatus(403)
    }

    let token = await auth.createToken(user)


    res.cookie('authcookie', token, { expires: new Date(Date.now() + 900000), httpOnly: true }).json({'username': user.username, 'role': user.role})
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

module.exports = {login}