// controllers/projectController.js
const express = require('express');
const auth = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');
const Project = require('../models/Project');
const User = require('../models/User');

const router = express.Router();

// @route    POST api/projects
// @desc     Create a project
// @access   Private
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newProject = new Project({
        name: req.body.name,
        description: req.body.description,
        user: req.user.id,
      });

      const project = await newProject.save();

      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
