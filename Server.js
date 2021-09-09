var express = require("express");


//  CORS is a node.js package for providing a Connect/Express middleware
//  that can be used to enable CORS with various options.
var cors = require("cors");

// BodyParser ensure the req.body is in json form data.
var bodyParser = require("body-parser");


// import the Database 
var dbConnection = require("./config/Db");



// Routes List


var app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());


// call the Database
dbConnection();

// Define the Api's

app.get("/", function (req, res) {
  req.clientData;
  // logics main server
  res.send("Server is working ");
});



// server port listener
app.listen("5000", (err) => {
  if (err) {
    console.log("something went wrong", error);
  } else {
    console.log("server is working on port, 5000");
  }
});
