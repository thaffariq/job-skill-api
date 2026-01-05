const express = require('express');
const router = express.Router();
const jobSkillController = require('../controllers/jobSkillController');
const { authenticate } = require('../../middleware/authMiddleware');

// Endpoint publik
router.get('/health', (req, res) => res.json({ status: 'UP', device: 'STB-6161' }));

// Endpoint terproteksi
router.get('/skills', authenticate, jobSkillController.getAll);
router.get('/skills/:id', authenticate, jobSkillController.getById);

module.exports = router;