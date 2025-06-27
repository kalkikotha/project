// controllers/otpController.js
const otpGenerator = require("otp-generator");
const OTPS = require("../models/otpModel.cjs");
const USERS = require("../models/userModal.cjs");

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if user is already present
    const checkUserPresent = await USERS.findOne({ email });
    // If user found with provided email
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User is already registered",
      });
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    // let result = await OTPS.findOne({ otp: otp });
    // while (result) {
    //   otp = otpGenerator.generate(6, {
    //     upperCaseAlphabets: false,
    //   });
    //   result = await OTPS.findOne({ otp: otp });
    // }
    const otpPayload = { email, otp };
    const otpBody = await OTPS.create(otpPayload);
    if (otpBody) {
      res.status(200).json({
        success: true,
        message: "OTP sent successfully",
        otp,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.subscriptionSendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const otpPayload = { email, otp };
    const otpBody = await OTPS.create(otpPayload);
    if (otpBody) {
      res.status(200).json({
        success: true,
        message: "OTP sent successfully",
        otp,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp, billingCycle, amount } = req.body;

    const response = await OTPS.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(200).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    const user = await USERS.findOne({ email });
    user.subscriptionActive = true;
    user.billingCycle = billingCycle;
    user.billingamount = amount;
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Subscription activated",
      user: {
        email: email,
        subscriptionActive: true,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
