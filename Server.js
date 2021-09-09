var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
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

dbConnection();

app.get("/", function (req, res) {
  req.clientData;
  // logics main server
  res.send("Server is working ");
});
app.post("/signup", function(req, res){
  console.log(req.body.stName);
})


// server port listener
app.listen("5000", (err) => {
  if (err) {
    console.log("something went wrong", error);
  } else {
    console.log("server is working on port, 5000");
  }
});
