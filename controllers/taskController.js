function createTask (req, res) {
    try {
        
    } catch (error) {
        res.status(500).send({msg:"error while sending"})
    }
}

function getAllTasks () {
    try {
        
    } catch (error) {
        res.status(500).send({msg:"error while sending"})
    }
}


module.exports = {
   createTask, getAllTasks
}