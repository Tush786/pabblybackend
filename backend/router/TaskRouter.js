const express=require('express');
const Task = require('../models/TaskModel');
const TaskRouter = express.Router();

TaskRouter.get("/getTask", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const limit = parseInt(req.query.limit) || 10; // Default limit to 10 tasks per page
        const skip = (page - 1) * limit;

        const tasks = await Task.find({ userId: req.body.userId })
                                 .skip(skip)
                                 .limit(limit);

        res.status(200).json({ tasks });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


  TaskRouter.post("/createTask", async (req, res) => {
    try {
      const { title, description, userId, taskdate } = req.body;
      const createdDate = new Date().toISOString().split('T')[0]; // Get the current date without time
      
      const task = await Task.create({ 
        title, 
        description, 
        userId, 
        taskdate, 
        createdDate:createdDate 
      });
      
      res.status(201).json({ task });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

TaskRouter.patch("/updatetask/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) throw new Error('Task not found');
        console.log(task)
        if (task.userId.toString() !== req.body.userId) throw new Error('Unauthorized');
     const tasks=await Task.find()
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  });

TaskRouter.get("/getTaskbyId/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) throw new Error('Task not found');
        if (task.userId.toString() !== req.userId) throw new Error('Unauthorized');
        res.status(200).json({ task });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  });

  TaskRouter.delete("/deleteTask/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) throw new Error('Task not found');
        if (task.userId.toString() !== req.userId) throw new Error('Unauthorized');
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  });


 module.exports={
    TaskRouter
 }