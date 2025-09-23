const db = require('../config/db')


function createTask (req, res) {
    try {
        // const{task_name, task_description, is_complete, start_date, end_date} = req.body
        task_name = req.body.task_name,
        task_description = req.body.task_description, 
        is_complete = 0,
        start_date = req.body.start_date,
        end_date = req.body.end_date
        q1= `insert into tasks (task_name, task_description, is_complete, start_date, end_date)
        values(?,?,?,?,?)`
        db.query(q1[task_name, task_description, is_complete, start_date, end_date])

    } catch (error) {
        res.status(500).send({msg:"error while sending"})
    }
}

function getAllTasks (req, res) {
    try {
        q2 = 'select * from tasks',
        db.query(q2,(err, result)=>{
            if(err) throw(err)
                console.log(result),
                res.status(200).send({tasks:result})
        })

    } catch (error) {
        res.status(500).send({msg:"error while sending"})
    }
}


module.exports = {
   createTask, getAllTasks
}