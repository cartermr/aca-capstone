let pool

if (process.env.DB_SERVER === 'postgres') {
    const {Pool} = require('pg')
    pool = new Pool({
        connectionString: process.env.DB_HOST,
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    })
}

if (process.env.DB_SERVER === 'mysql') {
    const mysql = require('mysql')
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

    pool = mysql.createPool(config)
}

module.exports = pool