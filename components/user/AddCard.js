const { response } = require("express");
const CardModel = require("./CardModel")
const signupModel = require("../signup/SignupModel")
const bcrypt = require("bcryptjs");
const cloudinary = require("../../config/Cloudninary");

// In controller we define our API logics.
// Here is a controller (signupUser)

module.exports.addCard = async (req, res) => {
  //  Here we will check is given email is exist in our db or not?

  if (!req.body?.id) {
    res
      .status(400)
      .json({ status: "error", message: "Id Required", statusCode: 400 });
    return;
  } else if (!req.body?.email) {
    res
      .status(400)
      .json({ status: "error", message: "Email Required", statusCode: 400 });
    return;
  } else if (!req.body?.vehicleType) {
    res
      .status(400)
      .json({ status: "error", message: "Vehicle Type Required", statusCode: 400 });
    return;
  } else if (!req.body?.startPlace) {
    res
      .status(400)
      .json({ status: "error", message: "Start Place Required", statusCode: 400 });
    return;
  } else if (!req.body?.endPlace) {
    res
      .status(400)
      .json({ status: "error", message: "End Place Required", statusCode: 400 });
    return;
  } else if (!req.body?.startTime) {
    res.status(400).json({
      status: "error",
      message: "Start Time Number  Required",
      statusCode: 400,
    });
    return;
  } else if (!req.body?.travelDay) {
    res.status(400).json({
      status: "error",
      message: "Travel Day  Required",
      statusCode: 400,
    });
    return;
  } else if (!req.body?.description) {
    res.status(400).json({
      status: "error",
      message: "Description Required",
      statusCode: 400,
    });
    return;
  } else {
      const checkUserStatus = await signupModel.findOne({ id: req.body.id});
      console.log("checkUserStatus", checkUserStatus.userStatus);
      if(checkUserStatus.userStatus == "Permanent Block"){
        res.status(400).json({ status: "error", message: "You are Permanent Block user", statusCode: 400 })
        return
      } else if(checkUserStatus.userStatus == "Temporary Block"){
        res.status(400).json({ status: "error", message: "You are Temporary Block user", statusCode: 400 })
        return
      }

      const filename = req.file?.path ? await cloudinary.uploader.upload(req.file?.path, { folder: "User/Card/" }) : ""

      const {vehicleType, startPlace, endPlace, startTime, travelDay, description, email} = req.body
      const newCard = new CardModel({
        vehicleType, startPlace, endPlace, startTime, travelDay, description, email,
        image: filename?.secure_url,
        cloudinaryId: filename?.public_id,
        cardStatus:"Active",
        cardDate: new Date().toISOString().split('T')[0],
        cardTime: new Date().toLocaleTimeString(),
      })
      newCard.save((err, success) => {
        if (err) {
          res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
          return
        }
        let data = {
          id: success?._id,
          vehicleType:success?.vehicleType,
           startPlace:success?.startPlace, 
           endPlace:success?.endPlace, 
           startTime:success?.startTime, 
           travelDay:success?.travelDay, 
           description:success?.description,
           email:success?.email,
           cardDate:success?.cardDate,
           cardTime:success?.cardTime,
           cardStatus:success?.cardStatus
           
        };
        res.status(201).json({ status: "success", data: data, message: "Card Created Successfully", statusCode: 201 })
        return
      });

      
  }
};




// delete card


module.exports.deleteCard = async (req, res) => {
    if (!req.body?.id) {
        res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
        return
      } else {
        const { id } = req.body;
        const findCard = await CardModel.findById({ _id: id });
        if (!findCard) {
          res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
          return
        }
        
        const card = await CardModel.findByIdAndDelete({ _id: id });
        if (!card) {
          res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
          return
        }
        res.status(201).json({ status: "success", message: "Card  Delete Successfully", statusCode: 201 })
        return
      }
    
  };



  //    permanentBlock
  module.exports.permanentBlockCard = async (req, res) => {
    if (!req.body?.id) {
      res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
      return
    } else {
      const { id } = req.body;
      const user = await CardModel.findByIdAndUpdate(id, {
        cardStatus: "Card Permanent Blocked ",
      }, { new: true }
      )
      if (!user) {
        res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
        return
      }
      user.save((err, success) => {
        if (err) {
          res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
          return
        }
        let data = {
            id: success?._id,
          vehicleType:success?.vehicleType,
           startPlace:success?.startPlace, 
           endPlace:success?.endPlace, 
           startTime:success?.startTime, 
           travelDay:success?.travelDay, 
           description:success?.description,
           email:success?.email,
           cardDate:success?.cardDate,
           cardTime:success?.cardTime,
           cardStatus:success?.cardStatus
        };
        res.status(201).json({ status: "success", data: data, message: "Card Permanent Blocked Successfully", statusCode: 201 })
        return
      });
  
    }
  };



  //    temporaryBlock
  module.exports.temporaryBlockCard = async (req, res) => {
    if (!req.body?.id) {
      res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
      return
    } else {
      const { id } = req.body;
      const user = await CardModel.findByIdAndUpdate(id, {
        cardStatus: "Card Temporary Blocked ",
      }, { new: true }
      )
      if (!user) {
        res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
        return
      }
      user.save((err, success) => {
        if (err) {
          res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
          return
        }
        let data = {
            id: success?._id,
          vehicleType:success?.vehicleType,
           startPlace:success?.startPlace, 
           endPlace:success?.endPlace, 
           startTime:success?.startTime, 
           travelDay:success?.travelDay, 
           description:success?.description,
           email:success?.email,
           cardDate:success?.cardDate,
           cardTime:success?.cardTime,
           cardStatus:success?.cardStatus
        };
        res.status(201).json({ status: "success", data: data, message: "Card Temporary Blocked Successfully", statusCode: 201 })
        return
      });
  
    }
  };



  //    temporaryBlock
  module.exports.blockToActiveCard = async (req, res) => {
    if (!req.body?.id) {
      res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
      return
    } else {
      const { id } = req.body;
      const user = await CardModel.findByIdAndUpdate(id, {
        cardStatus: "Active",
      }, { new: true }
      )
      if (!user) {
        res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
        return
      }
      user.save((err, success) => {
        if (err) {
          res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
          return
        }
        let data = {
            id: success?._id,
          vehicleType:success?.vehicleType,
           startPlace:success?.startPlace, 
           endPlace:success?.endPlace, 
           startTime:success?.startTime, 
           travelDay:success?.travelDay, 
           description:success?.description,
           email:success?.email,
           cardDate:success?.cardDate,
           cardTime:success?.cardTime,
           cardStatus:success?.cardStatus
        };
        res.status(201).json({ status: "success", data: data, message: "Card Active Successfully", statusCode: 201 })
        return
      });
  
    }
  };
