const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const Quiz= require("./quiz")
const auth = require("./auth")
// Route to register a new user
router.use("/quiz", Quiz)
router.use("/",auth)
module.exports = router;
