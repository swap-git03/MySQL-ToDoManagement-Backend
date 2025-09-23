// index.js
const express = require('express')
require('dotenv').config()
const taskRoute = require('./routes/taskRoute')
const db = require('./config/db')  // MySQL connection

const app = express()
const port = process.env.PORT || 7002

// ✅ Middleware to parse JSON body (must be before routes)
app.use(express.json())

// ✅ Test root route
app.get('/', (req, res) => res.send('Hello World!'))

// ✅ Task routes
app.use('/task', taskRoute)

// ✅ Start server after DB is connected
db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err)
    process.exit(1) // Stop server if DB connection fails
  } else {
    console.log('DB connected successfully')

    app.listen(port, () => {
      console.log(`Server running on port ${port}!`)
    })
  }
})

