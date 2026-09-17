const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');

// GET api/projects - mengambil semua project
router.get('/', projectController.getAllProjects);

// GET api/projects/id: - mengambil 1 proyek berdasarkan id
router.get('/:id', projectController.getProjectById);

// POST api/projects - menambahkan proyek baru
router.post('/', projectController.createProject);

// PUT api/projects/id: - memperbarui proyek berdasarkan id
router.put('/:id', projectController.updateProject);

// DELETE api/projects/:id - menghapus proyek beradasarkan id
router.delete('/:id,', projectController.deleteProject);

module.exports = router;
