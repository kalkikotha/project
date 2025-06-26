// controllers/authController.js
const bcrypt = require("bcrypt");
const USERS = require("../models/userModal.cjs");
const OTPS = require("../models/otpModel.cjs");
const Session = require("../models/sessionModel.cjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      credits,
      subscriptionActive,
      referralCode,
      referrerCode,
      otp,
    } = req.body;
    // Check if all details are provided
    if (!username || !email || !password || !otp) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Check if user already exists
    const existingUser = await USERS.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "User already exists",
      });
    }
    // Find the most recent OTP for the email
    const response = await OTPS.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(200).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    if (referrerCode) {
      const existingReferrerUser = await USERS.findOne({
        referrerCode: referrerCode,
      });
      if (existingReferrerUser) {
        // Credit 100 to the existing user
        existingReferrerUser.credits += 100;
        await existingReferrerUser.save();

        // Add 100 credits to the current user
        credits += 100;
      }
    }

    // Secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Hashing password error for ${password}: ` + error.message,
      });
    }
    const newUser = await USERS.create({
      username,
      email,
      password: hashedPassword,
      phone,
      credits,
      subscriptionActive,
      referralCode,
      referrerCode,
    });
    console.log(newUser);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        credits: newUser.credits,
        subscriptionActive: newUser.subscriptionActive,
        referralCode: newUser.referralCode,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(200).json({
        success: false,
        message: "Email and password are required for sign-in",
      });
    }

    // Find the user by email
    const user = await USERS.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found. Please check your credentials.",
      });
    }

    // Validate the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(200).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    // Invalidate old session
    await Session.deleteMany({ userId: user._id });

    // Create new session
    const session = await Session.create({ userId: user._id });

    // Create token with session ID
    const token = jwt.sign({ sessionId: session._id }, "secret");

    // Password is correct, user is authenticated
    return res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        credits: user.credits,
        subscriptionActive: user.subscriptionActive,
        referralCode: user.referralCode,
      },
      token: token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateSubscriptionActive = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required to update subscription status",
      });
    }

    // Find the user by email
    const user = await USERS.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please check the email provided.",
      });
    }

    // Update the subscriptionActive field to true
    user.subscriptionActive = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Subscription status updated successfully",
      user: {
        username: user.username,
        email: user.email,
        credits: user.credits,
        subscriptionActive: user.subscriptionActive,
        referralCode: user.referralCode,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateWalletforOnedoc = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if email is provided
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required to update wallet",
      });
    }

    // Find the user by email
    const user = await USERS.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please check the email provided.",
      });
    }
    if (user.credits < 100) {
      return res.status(400).json({
        success: false,
        message: "Insufficient credits",
      });
    }
    // Update the subscriptionActive field to true
    user.credits = user.credits - 100;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "credits updated successfully",
      user: {
        username: user.username,
        email: user.email,
        credits: user.credits,
        subscriptionActive: user.subscriptionActive,
        referralCode: user.referralCode,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
