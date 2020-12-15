const express = require('express');
const catchAsync = require('../utils/catchAsync')
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const users = require('../controllers/users.js')

// Register User
router.route('/register')
  .get(users.renderRegister)
  .post(catchAsync(users.register))

// Login User
router.route('/login')
  .get(users.renderLogin)
  .post(passport.authenticate('local',{failureFlash: true, failureRedirect:'/login'}), users.loginMessage)

// Logout User
router.get('/logout', users.logout)


module.exports = router;
