// controllers/taskController.js
const express = require('express');
const auth = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');
const Task = require('../models/Task');
const Project = require('../models/Project');

const router = express.Router();

// @route    POST api/tasks
// @desc     Create a task
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('project', 'Project ID is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const project = await Project.findById(req.body.project);

      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }

      const newTask = new Task({
        name: req.body.name,
        description: req.body.description,
        project: req.body.project,
        user: req.user.id,
        dueDate: req.body.dueDate,
        completed: req.body.completed,
      });

      const task = await newTask.save();

      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
