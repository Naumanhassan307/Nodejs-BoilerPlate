const { response } = require("express");
const signupModel = require("./SignupModel")

// In controller we define our API logics.
// Here is a controller (signupUser)

module.exports.signupUser = (req, res)=>{
  
    // Here we will pass our data to ensure the schema which we defined.
    const userCreate = new signupModel({
        email: req.body.email,
        password: req.body.password,
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