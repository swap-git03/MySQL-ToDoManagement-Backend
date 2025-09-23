const express = require('express')
const taskController = require('../controllers/taskController')

const router = express.Router()

router.post('/createTask', taskController.createTask)
router.get('/getAllTasks', taskController.getAllTasks)
router.get('/getTaskByID', taskController)


module.exports = router