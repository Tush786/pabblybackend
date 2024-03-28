
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String,required: true  },
    createdDate:{type:String,required:true},
    status:{type:Boolean,require:true,default:false},
    taskdate: { type: String ,required: false},
    userId: { type: mongoose.Schema.ObjectId, ref: 'userData2', required: false }
    // userId: { type: String, required: true }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
