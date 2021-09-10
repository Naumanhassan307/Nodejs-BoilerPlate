// in SignupModael.js we will define our schema of mongo DB data .


const mongoose = require("mongoose");
const signupSchema = mongoose.Schema({
  email: {type: String},
  password: {type: String}
});
const signupModel = mongoose.model("signup", signupSchema);
module.exports = signupModel;