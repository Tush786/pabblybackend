const express=require('express');
const Task = require('../models/TaskModel');
const TaskRouter = express.Router();

TaskRouter.get("/getTask", async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.body.userId });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  });

TaskRouter.post("/createTask", async (req, res) => {
  try {
        const { title, description,userId, taskdate } = req.body;
        const task = await Task.create({ title, description, userId ,taskdate});
        res.status(201).json({ task });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  });

TaskRouter.patch("/updatetask/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) throw new Error('Task not found');
        if (task.userId.toString() !== req.userId) throw new Error('Unauthorized');
        res.status(200).json({ task });
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

  TaskRouter.get("/deleteTask/:id", async (req, res) => {
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