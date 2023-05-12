const TaskModel = require('../models/TaskModel')

module.exports.getTasks = async (req,res) =>{
    const tasks = await TaskModel.find()
    res.send(tasks)
}

module.exports.saveTasks = (req,res) =>{
    const {title, task} = req.body 

    TaskModel.create({title,task})
    .then((data)=>{
        console.log("saved successfully...");
        res.status(201).send(data)
    }).catch((err)=>{
        console.log(err);
        res.send({error: err, msg:"Something went wrong"})
    })
}

module.exports.updateTasks = (req,res) =>{
    const {id} = req.params 
    const {title, task} = req.body 

    TaskModel.findByIdAndUpdate(id, {title, task})
    .then(()=>{
        res.send("Updated Successfully")
    }).catch((err)=>{
        console.log(err);
        res.send({error: err, msg:"Something went wrong"})
    })
}

module.exports.deleteTasks = (req,res) =>{
    const {id} = req.params 

    TaskModel.findByIdAndDelete(id)
    .then(()=>{
        res.send("Deleted Successfully")
    }).catch((err)=>{
        console.log(err);
        res.send({error: err, msg:"Something went wrong"})
    })
}

