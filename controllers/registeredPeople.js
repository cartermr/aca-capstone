// import database model
const {DB, mysql} = require('../database/DatabaseConnection')

const registeredPeople = (req, res) => {
    let sql = 'select * from Registered where account_owner = ?'

    sql = mysql.format(sql, [req.body.username])

    DB.query(sql, (err, result) => {
        if (err) throw err
        res.json(result)
    })
}

module.exports = {registeredPeople}