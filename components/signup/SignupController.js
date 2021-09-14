const { response } = require("express");
const signupModel = require("./SignupModel")
const bcrypt = require("bcryptjs")

// In controller we define our API logics.
// Here is a controller (signupUser)

module.exports.signupUser = async(req, res)=>{
  //  Here we will check is given email is exist in our db or not?

  let userCheck = await signupModel.findOne({email: req.body.email})
  if(userCheck){
    res.status(200).send({result: userCheck, message: "Email Already Registered!"})
  }else{
    
    // Now we will encrypt the user password with the help of bcryptjs. 12 is security layers number

    let hashPass = await bcrypt.hash(req.body.password, 12);

    // Password Encode is complete

    // Signup db

    // Here we will pass our data to ensure the schema which we defined.
    const userCreate = new signupModel({
        email: req.body.email,
        password: hashPass,
    })

    // Here we will save our data in dataBase.
    try {
        userCreate.save((err, success) => {
          console.log("success", success);
          console.log("err", err);
          if (err) {
            res.send("err happen");
          }
          // res.send("User Registered successfully");
          res.status(200).send({
            result: success,
            message: "User Registered successfully!",
          });
        });
    } catch (error) {
        // console.log("Error in saving data", error);
        res
          .status(400)
          .send({
            result: error.message,
            message: "Oops! User not Registered successfully",
          });
    }

    
  }
    
    
}