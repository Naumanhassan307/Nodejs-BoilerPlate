const express = require("express");
const siginRouter = express.Router();

const { signinUser } = require("./SigninController");

// Here we define the route of signin.

siginRouter.post("/signin", (req, res) => {
  signinUser(req, res);
});

module.exports = siginRouter;
