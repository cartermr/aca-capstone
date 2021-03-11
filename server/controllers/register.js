// import database model
const {DB, mysql} = require('../database/DatabaseConnection')

// route to register a new person into the database
const register = async (req, res) => {

    // retrieve the data of the new person to be registered 
    let newPerson = req.body
    console.log(newPerson)

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

    console.log(newPerson)

    // record the filename of the image uploaded
    //newPerson["picture_filename"] = req.file.originalname
    newPerson["picture_filename"] = ''

    // record the new person data to the database
    // let sql = `INSERT INTO Registered (first_name, last_name, dob, age, sex, race, height, weight, hair_color, eye_color, street,
    // apartment_number, city, state, zip, phone, emergency_name, emergency_address, emergency_phone, emergency_relationship, picture_filename)
    // VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    let sql = `INSERT INTO Registered (${Object.keys(newPerson)})
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    console.log(sql)

    sql = mysql.format(sql, [...Object.values(newPerson)])

    console.log(sql)

    DB.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.sendStatus(200)
    })

    //let result = await db.query(sql, [...Object.values(newPerson)])
}

// export the function to be used by the router
module.exports = {register}