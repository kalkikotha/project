// routes/otpRoutes.js
const express = require("express");
const otpController = require("../controllers/otpController.cjs");
const router = express.Router();
router.post("/send-otp", otpController.sendOTP);
router.post("/subscription-send-otp", otpController.subscriptionSendOTP);
router.post("/verify-subscription", otpController.verifyOTP);
module.exports = router;
