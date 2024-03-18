
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String,required: true  },
    taskdate: { type: String ,required: false},
    userId: { type: mongoose.Schema.ObjectId, ref: 'userData2', required: false }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
