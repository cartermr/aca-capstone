const {DB, mysql} = require('../database/DatabaseConnection')

const updateRegistered = (req, res) => {
    let vals = []
    let sql = "UPDATE Registered SET"
    let update = req.body

    Object.entries(update).forEach(([key, value], index) => {
        if (key === 'id') {
            vals.push(key, value)
            return
        }
        
        if (index === Object.keys(update).length - 2) {
            sql = sql + " ?? = ?"
        } else {
            sql = sql + " ?? = ?,"
        }
        vals.push(key, value)
    })

    sql = sql + " WHERE ?? = ?"

    sql = mysql.format(sql, [...vals])

    DB.query(sql, (error, result) => {
        if (error) {
            return res.sendStatus(500)
        }
        res.sendStatus(200)
    })
}

module.exports = {updateRegistered}