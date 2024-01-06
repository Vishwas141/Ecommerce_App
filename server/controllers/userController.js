const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, mobile } =
      req.body;

    // Check if the password and confirmPassword match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password and Confirm Password do not match" });
    }

    // Check if the user already exists with the given email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobile,
    });

    // Generate JWT token for authentication
    const token = jwt.sign({ id: newUser._id }, "Vishwas", { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000),
    });

    // You may also respond with the token in the response if needed
    return res.status(201).json({
      message: "User registered successfully",
      token,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message, success: false });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists with the given email
    const user = await User.findOne({ email });

    

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    console.log(passwordMatch);

    if (passwordMatch) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Generate JWT token for authentication
    const token = jwt.sign({ id: user._id }, "Vishwas", {
      expiresIn: "12h",
    });

    // Set the token as a cookie (You need to replace 'yourCookieName' with the desired cookie name)
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000),
    });

    // You may also respond with the token in the response if needed
    return res
      .status(200)
      .json({ message: "Login successful", token, success: true });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};


exports.getuser = async (req, res) => {
  try {
    const token = req.cookies.token;

  
    if (!token) {
      return res.json({
        msg: "Token not found",
        success: false,
      });
    }

    const decodedToken = jwt.verify(token, "Vishwas");

    const user = await User.findById(decodedToken.id);

    if (user) {
      return res.json({
        user,
        success: true,
      });
    }

    return res.json({
      msg: "User Not Found",
      success: true,
    });


  } catch (err) {
   
    return res.json({
      msg: err.message,
      success: false,
    });
  }
};


exports.logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    

    if (!token) {
      return res.json({
        msg: "Token not found",
        success: false,
      });
    }


    res.clearCookie('token');

    return res.json({
      msg: "Logout successful",
      success: true,

    });
  } catch (err) {
  
    return res.json({
      msg: err.message,
      success: false,
    });
  }
};
