require('dotenv').config()
const mysql = require('mysql2')

    const connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306
    })

    connection.connect(function (err) {
        if (err) {
            console.error('error while connecting:', err.stack)
            return
        }
        console.log('db connected')
    })

module.exports = connection
