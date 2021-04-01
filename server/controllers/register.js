// import database model
const {DB, mysql} = require('../database/DatabaseConnection')

// route to register a new person into the database
const register = async (req, res) => {
    // retrieve the data of the new person to be registered 
    let newPerson = req.body
    // console.log(newPerson)

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

    // console.log(sql)

    sql = mysql.format(sql, [...Object.values(newPerson)])

    // console.log(sql)

    DB.query(sql, (err, result) => {
        if (err) throw err
        // console.log(result)
        res.sendStatus(200)
    })
}

const getAge = (dob) => {
    let dif = new Date() - new Date(dob)
    let age = Math.floor(dif / (1000 * 60 * 60 * 24 * 365.25))
    return age
}

// export the function to be used by the router
module.exports = {register}