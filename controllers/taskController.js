const db = require("../config/db");

function createTask(req, res) {
  const task_name = req.body.task_name;
  const task_description = req.body.task_description || "";
  const is_complete = 0;
  const start_date = req.body.start_date;
  const end_date = req.body.end_date;

  try {
    if (start_date >= end_date) {
      return res.status(400).send({ msg: "End date must be after start date", success: false });
    } else {
      const q1 = `INSERT INTO tasks (task_name, task_description, is_complete, start_date, end_date) VALUES (?, ?, ?, ?, ?)`;
      db.query(q1, [task_name, task_description, is_complete, start_date, end_date], (err, result) => {
        if (err) throw err;
        res.status(200).send({ msg: "Task added successfully", success: true });
      });
    }
  } catch (error) {
    res.status(500).send({ msg: "Server error", success: false });
  }
}

function getAllTasks(req, res) {
  try {
    const q2 = "SELECT * FROM tasks";
    db.query(q2, (err, result) => {
      if (err) throw err;
      res.status(200).send({ tasks: result, success: true });
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error", success: false });
  }
}

function getTaskByID(req, res) {
  const id = req.params.ID;
  const q3 = `SELECT * FROM tasks WHERE id = ?`;
  try {
    db.query(q3, [id], (err, result) => {
      if (err) throw err;
      res.status(200).send({ task: result, success: true });
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error", success: false });
  }
}

function updateIsComplete(req, res) {
  const id = req.params.ID;
  const q6 = `SELECT * FROM tasks WHERE id = ?`;
  const q5 = `UPDATE tasks SET is_complete = ? WHERE id = ?`;

  try {
    db.query(q6, [id], (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        return res.status(404).send({ msg: "Task not found", success: false });
      }

      const taskForUpdate = result[0];
      const is_complete_update = taskForUpdate.is_complete === 1 ? 0 : 1;

      db.query(q5, [is_complete_update, id], (err2) => {
        if (err2) throw err2;
        res.status(200).send({ msg: "Task updated successfully", success: true });
      });
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error", success: false });
  }
}

function deleteTask(req, res) {
  const id = req.params.ID;
  const q4 = `DELETE FROM tasks WHERE id = ?`;

  try {
    db.query(q4, [id], (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.status(200).send({ msg: "Task deleted successfully", success: true });
      } else {
        res.status(404).send({ msg: "Task not found", success: false });
      }
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error", success: false });
  }
}

function updateTask(req, res) {
  const { ID } = req.params;
  const selectQuery = "SELECT is_complete FROM tasks WHERE id = ?";
  const updateQuery = "UPDATE tasks SET is_complete = ? WHERE id = ?";

  try {
    db.query(selectQuery, [ID], (err, result) => {
      if (err) return res.status(500).send({ msg: "Database error", error: err, success: false });
      if (result.length === 0) return res.status(404).send({ msg: "Task not found", success: false });

      const currentStatus = result[0].is_complete;
      const newStatus = currentStatus === 1 ? 0 : 1;

      db.query(updateQuery, [newStatus, ID], (err2) => {
        if (err2) return res.status(500).send({ msg: "Database error", error: err2, success: false });

        res.status(200).send({
          msg: `Task marked as ${newStatus === 1 ? "complete" : "incomplete"}`,
          is_complete: newStatus,
          success: true,
        });
      });
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error, success: false });
  }
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskByID,
  updateIsComplete,
  deleteTask,
  updateTask,
};
