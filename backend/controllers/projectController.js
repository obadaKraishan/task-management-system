const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');

exports.createProject = async (req, res) => {
  try {
    const { title, description, duration, deadline, team, tasks } = req.body;

    const project = new Project({
      title,
      description,
      duration,
      deadline,
      team
    });

    const savedProject = await project.save();

    // Add tasks to the project
    if (tasks && tasks.length > 0) {
      for (const taskData of tasks) {
        const task = new Task({ ...taskData, project: savedProject._id });
        await task.save();
        savedProject.tasks.push(task._id);
      }
      await savedProject.save();
    }

    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ error: 'Error creating project' });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('team tasks');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('team tasks');
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching project' });
  }
};
