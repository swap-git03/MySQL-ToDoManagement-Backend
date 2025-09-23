const express = require('express')
require('dotenv').config()
const taskRoute = require('./routes/taskRoute')
const db = require('./config/db')  // ✅ This now gives you the connection object

const app = express()
const port = process.env.PORT || 7002

app.use(express.json())  // ✅ Body parser must come before routes

app.get('/', (req, res) => res.send('helo'))
app.use('/task', taskRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = db  // ✅ Export it if controllers need direct access
