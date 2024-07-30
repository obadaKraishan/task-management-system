const express = require('express');
const { createProject, getProjects, getProject } = require('../controllers/projectController');
const router = express.Router();

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProject);

module.exports = router;
