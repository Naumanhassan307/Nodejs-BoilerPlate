var mongoose = require("mongoose")
var CardSchema = mongoose.Schema({
  vehicleType:{
      type:String
  },
  startPlace:{
    type:String
  },
  endPlace:{
    type:String
  },
  startTime:{
    type:String
  },
  travelDay:{
    type:String
  },
  description:{
    type:String
  },
  image: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
  id:{
      type:String
  },
  email:{
      type: String
  },
  cardDate:{
      type:String
  },
  cardTime:{
      type:String
  },
  cardStatus:{
      type:String
  }

})

var CardModel = mongoose.model("card", CardSchema)
module.exports = CardModel