const {DB, mysql} = require('../database/DatabaseConnection')

const register = async (req, res) => {
    let newPerson = req.body

    if (newPerson.height_feet && !newPerson.height_inches) {
        newPerson['height'] = parseInt(newPerson.height_feet)
        delete newPerson.height_feet
    }

    if (newPerson.height_feet && newPerson.height_inches) {
        let inches = parseInt(newPerson.height_inches) / 12
        newPerson['height'] = parseInt(newPerson.height_feet) + inches
        delete newPerson.height_feet
        delete newPerson.height_inches
    }

    if (!newPerson.apartment_number) {
        newPerson['apartment_number'] = ''
    }

    newPerson.age = getAge(newPerson.dob)

    let sql = `INSERT INTO Registered (${Object.keys(newPerson)})
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`


    sql = mysql.format(sql, [...Object.values(newPerson)])


    DB.query(sql, (err, result) => {
        if (err) throw err
        res.sendStatus(200)
    })
}

const getAge = (dob) => {
    let dif = new Date() - new Date(dob)
    let age = Math.floor(dif / (1000 * 60 * 60 * 24 * 365.25))
    return age
}

module.exports = {register}