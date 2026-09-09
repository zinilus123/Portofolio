const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');

// GET /api/profile - mengambil data profil pemiliki portofolio
router.get('/', profileController.getProfile);

// PUT /api/profile/:id - memperbarui data profil berdasarkan id
router.put('/:id', profileController.updateProfile);

module.exports = router;
