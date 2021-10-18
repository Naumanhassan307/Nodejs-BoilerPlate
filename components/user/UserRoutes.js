const express = require("express");
const { addCard, deleteCard, permanentBlockCard, temporaryBlockCard, blockToActiveCard } = require("./AddCard");

const {uploadImage} = require("../../config/Multer")
const adminRouter = express.Router();

adminRouter.post("/addCard", uploadImage, (req, res) => {
  addCard(req, res);
});

adminRouter.delete("/deleteCard", (req, res) => {
    deleteCard(req, res);
  });

  adminRouter.put("/permanentBlockCard",  (req, res) => {
    permanentBlockCard(req, res);
  });
  adminRouter.put("/temporaryBlockCard",  (req, res) => {
    temporaryBlockCard(req, res);
  });

  adminRouter.put("/blockToActiveCard",  (req, res) => {
    blockToActiveCard(req, res);
  });
module.exports = adminRouter;