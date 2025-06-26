// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController.cjs');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/subscribe', authController.updateSubscriptionActive);
router.post('/wallet', authController.updateWalletforOnedoc);

module.exports = router;