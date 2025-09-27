// index.js
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const taskRoute = require('./routes/taskRoute')
const db = require('./config/db')  // MySQL connection

const app = express()
const port = process.env.PORT || 7002

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/task', taskRoute)

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err)
    process.exit(1) 
  } else {
    console.log('DB connected successfully')

    app.listen(port, () => {
      console.log(`Server running on port ${port}!`)
    })
  }
})

