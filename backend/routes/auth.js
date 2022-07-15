//Imports 
const express = require('express');
const Router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');
const { findOne } = require('../models/User.js');
fetchuser = require('../middleware/fetchuser');
const User = require('../models/User.js')
const JWT_SEC = 'awdawdawd131224122222!$#!#$%daw'


//Route 1 - Create a User using : POST '/api/auth/createUser'. Doesnt require authentication
Router.post('/createUser', [
  body('email', 'enter a valid email address').isEmail(), 
  body('password', 'Enter a strong password').isLength({ min: 5 }), 
  body('name', 'Enter a vvalid name ').isLength({ min: 3 })
],async (req, res) => {
  //Checking Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let success = false;
    return res.status(400).json({ success,errors: errors.array() })
  }
  try {
    // Checking for same email
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      let success = false;
      return res.status(400).json({success, error: "Sorry a user with this email already exists " })}
    //Creating the user 
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email})
    const data = {
      user:{
        id:user.id
      }
    }
    const authToken=jwt.sign(data,JWT_SEC)
    // //Sending User
    let success = true;
    res.json({success,authToken})
  }
  catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error")
  }
})


//route 2 - User Login  : POST '/api/auth/login'. Doesnt require authentication
Router.post('/login',[
  body('email', 'enter a valid email address').isEmail(), 
  body('password', 'Enter a password').exists()
], async (req, res) => {
  //Checking Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const {email,password} = req.body
  try {
    let user = await User.findOne({email})
    if(!user){
      let success = false;
      return res.status(400).json({success,error:"Please try to login with correct credialtials"})
    }
    const passCompare = await bcrypt.compare(password,user.password)
    if(!passCompare) {
      let success = false;
      return res.status(400).json({success,error:"Please try to login with correct credialtials"})
    }
    const data = {
      user:{
        id:user.id
      }
    }
    const authToken=jwt.sign(data,JWT_SEC)
    // //Sending User
    let success = true;
    res.json({success,authToken})
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error")
  }
})


//route 3 - get loggedin user request  : POST '/api/auth/getuser'. login required
Router.post('/getuser',fetchuser, async (req, res) => {
try {
  let userId = req.user.id ;
  const user = await User.findById(userId).select("-password");
  res.send(user);
} catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error")
  }
})

//Exports
module.exports = Router;