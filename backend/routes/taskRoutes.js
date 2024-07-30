const express = require('express');
const { auth, authorize } = require('../middleware/authMiddleware');
const Task = require('../models/Task');
const router = express.Router();

// Create Task
router.post('/', auth, authorize(['manager']), async (req, res) => {
  const { title, description, assignedTo } = req.body;
  try {
    const newTask = new Task({ title, description, assignedTo });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get All Tasks for Manager
router.get('/', auth, authorize(['manager']), async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get Tasks for Employee
router.get('/mytasks', auth, authorize(['employee']), async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update Task Status
router.put('/:id/status', auth, authorize(['employee']), async (req, res) => {
  const { status } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Forbidden' });
    }
    task.status = status;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add Comment to Task
router.post('/:id/comment', auth, async (req, res) => {
  const { comment } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    task.comments.push({ user: req.user._id, comment });
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
