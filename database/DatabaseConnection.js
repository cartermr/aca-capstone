// const {Pool} = require('pg')
// pool = new Pool({
//     connectionString: process.env.DB_HOST,
//     ssl: {
//         require: true,
//         rejectUnauthorized: false
//     }
// })

mysql = require('mysql')
const config = {
    connectionLimit: 100,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

if (process.env.DB_HOST) {
    config.host = process.env.DB_HOST
}

if (process.env.DB_CLOUD) {
    config.socketPath = `/cloudsql/${process.env.DB_CLOUD}`
}

DB = mysql.createPool(config)


module.exports = {DB, mysql}