const express = require("express");


//  CORS is a node.js package for providing a Connect/Express middleware
//  that can be used to enable CORS with varstious options.
const cors = require("cors");

// BodyParser ensure the req.body is in json form data.
const bodyParser = require("body-parser");


// import the Database 
const dbConnection = require("./config/Db");




const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());


// call the Database
dbConnection();



// Routes List

const signupRouter = require("./components/signup/SignupRoute")
const signinRouter = require("./components/signin/SigninRoute")

// Define the Api's

app.get("/", function (req, res) {
  req.clientData;
  // logics main server
  res.send("Server is working ");
});

app.post("/signup", signupRouter);
app.post("/signin", signinRouter);




// server port listener
app.listen("5000", (err) => {
  if (err) {
    console.log("something went wrong", error);
  } else {
    console.log("server is working on port, 5000");
  }
});
