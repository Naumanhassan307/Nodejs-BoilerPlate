var mongoose = require("mongoose")

function dbConnection() {
  mongoose.connect(
    // Here you will paste your MongoDb String with your user name and password
    `mongodb+srv://NaumanHassan:nauman30hassan@cluster0.pvabz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true,},
    function (err) {
      if (err) {
        console.log("err", err);
      } else {
        console.log("successfully connected");
      }
    }
  );
}

module.exports = dbConnection;