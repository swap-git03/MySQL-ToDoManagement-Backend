const express = require('express')
require('dotenv').config()
const taskRoute = require('./routes/taskRoute')

const app = express()
const port = process.env.PORT || 3000
// const dbConnect = require('./config/db')

app.get('/', (req,res) => res.send('helo'))
app.use('/task', taskRoute)



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// http://localhost:7002/task/getAllTasks

// http://localhost:7002/task/createTask

