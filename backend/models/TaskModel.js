const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    task:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Task", taskSchema)