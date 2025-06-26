// routes/authRoutes.js
const express = require('express');
const docController = require('../controllers/docController.cjs');
const router = express.Router();

router.post('/doc', docController.getDoc);

module.exports = router;