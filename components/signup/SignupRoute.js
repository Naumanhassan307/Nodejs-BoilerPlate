const express = require("express");
const sigupRouter = express.Router();

let {uploadImage} = require("../../config/Multer")
const {signupUser} = require("./SignupController")

// Here we define the route of signup.

sigupRouter.post("/signup", (req, res) => {
  signupUser(req, res);
});

module.exports = sigupRouter;