const { response } = require("express");
const signupModel = require("../signup/SignupModel");
const bcrypt = require("bcryptjs");

// In controller we define our API logics.
// Here is a controller (signinUser)

module.exports.signinUser = async (req, res) => {
  //  Here we will check is given email is exist in our db or not?
    console.log("usercheck=> email", req.body.email);
  let userCheck = await signupModel.findOne({ email: req.body.email });
  console.log("usercheck=>", userCheck);
  if (userCheck) {
    //   check for user given password and db comming pasword 
      let checkPass = await bcrypt.compare(req.body.password, userCheck.password);
      if(checkPass){
        res
        .status(200)
        .send({ message: "Sigin Successfully" });
      }else{
          res.status(403).send({ message: "User Password is Incorrect!" });
      }
    
  } else {
    res
      .status(403)
      .send({ message: "No User Is Registered With This E-mail!" });
  }
};
