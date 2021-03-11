// import database model
const db = require('../database/DatabaseConnection')

// route to register a new person into the database
const register = async (req, res) => {

    // retrieve the data of the new person to be registered 
    let newPerson = JSON.parse(req.body.newPerson)

    // record the filename of the image uploaded
    newPerson["picture_filename"] = req.file.originalname

    // record the new person data to the database
    let sql = `INSERT INTO "Registered_People" (first_name, last_name, dob, age, sex, race, height, weight, hair_color, eye_color, street_number,
    street_name, street_type, street_direction, apartment_number, city, state, zip, phone, emergency_name,
    emergency_address, emergency_phone, emergency_relationship, picture_filename)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)`

    let result = await db.query(sql, [...Object.values(newPerson)])
}

// export the function to be used by the router
module.exports = {register}