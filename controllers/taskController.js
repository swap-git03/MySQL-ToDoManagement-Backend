const db = require("../config/db");

function createTask(req, res) {
  // const {task_name,task_description,start_date,end_date} = req.body
  (task_name = req.body.task_name),
    (task_description = req.body.task_description || "");
  is_complete = 0;
  start_date = req.body.start_date;
  end_date = req.body.end_date;

  try {
    if (start_date >= end_date) {
      return res.status(400).send({ msg: "End date must be after start date" });
    } else {
      q1 = `insert into tasks (task_name,task_description,is_complete,start_date,end_date) 
                values (?,?,?,?,?)
        `;
      db.query(
        q1,
        [task_name, task_description, is_complete, start_date, end_date],
        (err, result) => {
          if (err) throw err;
          res.status(200).send({ msg: "task added successfully" });
        }
      );
    }
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
}
function getAllTasks(req, res) {
  try {
    q2 = "select * from tasks";
    db.query(q2, (err, result) => {
      if (err) throw err;
      // console.log(result)
      res.status(200).send({ tasks: result, success: true });
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
}

function getTaskByID(req, res) {
  const id = req.params.ID;
  q3 = `select * from tasks where id = ?`;
  try {
    db.query(q3, [id], (err, result) => {
      if (err) throw err;
      console.log(result);
      res.status(200).send({ task: result });
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
}
function updateIsComplete(req, res) {
  id = req.params.ID;

  q6 = `select * from tasks where id = ?`;
  q5 = `update tasks set is_complete = ? where id = ?`;

  try {
    db.query(q6, [id], (err, result) => {
      taskForUpdate = result[0];
      if (taskForUpdate.is_complete == 1) {
        console.log("**********", taskForUpdate);
        is_complete_update = 0 
        db.query(q5, [is_complete_update, id], (err, result) => {
          if (err) throw err;
          res
            .status(200)
            .send({ msg: "Task updated successfully", success: true });
        });
      } else {
        console.log(taskForUpdate);
        is_complete_update = 1 
        db.query(q5, [is_complete_update, id], (err, result) => {
          if (err) throw err;
          res
            .status(200)
            .send({ msg: "Task updated successfully", success: true });
        });
      }
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error", success: false });
  }
}
function deleteTask(req, res) {
  id = req.params.ID;
  q4 = `delete from tasks where id = ?`;
  try {
    db.query(q4, [id], (err, result) => {
      if (err) throw err;
      res.status(200).send({ msg: "Task deleted successfully" });
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
}

function updateTask(req, res) {
  const { ID } = req.params;

  const selectQuery = "SELECT is_complete FROM tasks WHERE id = ?";
  const updateQuery = "UPDATE tasks SET is_complete = ? WHERE id = ?";

  try {
    db.query(selectQuery, [ID], (err, result) => {
      if (err) return res.status(500).send({ msg: "Database error", error: err });
      if (result.length === 0) return res.status(404).send({ msg: "Task not found" });

      const currentStatus = result[0].is_complete;
      const newStatus = currentStatus === 1 ? 0 : 1;

      db.query(updateQuery, [newStatus, ID], (err2) => {
        if (err2) return res.status(500).send({ msg: "Database error", error: err2 });

        res.status(200).send({
          msg: `Task marked as ${newStatus === 1 ? "complete" : "incomplete"}`,
          is_complete: newStatus,
          success: true,
        });
      });
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error });
  }
}


module.exports = {
  createTask,
  getAllTasks,
  getTaskByID,
  updateIsComplete,
  deleteTask,
  updateTask
};