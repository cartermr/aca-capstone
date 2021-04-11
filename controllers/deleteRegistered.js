const {DB, mysql} = require('../database/DatabaseConnection')

const deleteRegistered = (req, res) => {
    const id = req.params.id

    let sql = "DELETE FROM Registered WHERE id = ?"

    sql = mysql.format(sql, [id])

    console.log(sql)

    DB.query(sql, (error, result) => {
        if (error) {
            res.sendStatus(500)
        }
        res.sendStatus(200)
    })
}

module.exports = {deleteRegistered}