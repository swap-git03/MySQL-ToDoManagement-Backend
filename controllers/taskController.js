const db = require('../config/db')

function createTask(req, res) {
  try {
    const { task_name, task_description = "", start_date, end_date } = req.body
    const is_complete = 0

    // Validate input
    if (!task_name) {
      return res.status(400).send({ msg: "Task name is required" })
    }
    if (!start_date || !end_date) {
      return res.status(400).send({ msg: "Start date and end date are required" })
    }

    // Ensure start_date < end_date
    const start = new Date(start_date)
    const end = new Date(end_date)

    if (isNaN(start) || isNaN(end)) {
      return res.status(400).send({ msg: "Invalid date format" })
    }
    if (start >= end) {
      return res.status(400).send({ msg: "End date must be after start date" })
    }

    // SQL Query
    const q1 = `
      INSERT INTO tasks (task_name, task_description, is_complete, start_date, end_date)
      VALUES (?, ?, ?, ?, ?)
    `

    db.query(q1, [task_name, task_description, is_complete, start_date, end_date], (err, result) => {
      if (err) {
        console.error("MySQL Insert Error:", err)
        return res.status(500).send({ msg: "Database error while inserting task" })
      }
      res.status(201).send({
        msg: "Task added successfully",
        taskId: result.insertId
      })
    })

  } catch (error) {
    console.error("Server Error:", error)
    res.status(500).send({ msg: "Server error" })
  }
}

function getAllTasks(req, res) {
  try {
    const q2 = 'SELECT * FROM tasks'
    db.query(q2, (err, result) => {
      if (err) {
        console.error("MySQL Select Error:", err)
        return res.status(500).send({ msg: "Database error while fetching tasks" })
      }
      res.status(200).send({ tasks: result })
    })
  } catch (error) {
    console.error("Server Error:", error)
    res.status(500).send({ msg: "Server error" })
  }
}


function getTaskByID(req, res){

}

function updateTask(req, res){

}

function deleteTask(req, res){

}




module.exports = {
  createTask,
  getAllTasks,
  getTaskByID,
  updateTask,
  deleteTask
}
