const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;