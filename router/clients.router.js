const express = require("express");
const Client = require("../models/Client");

const clientsRouter = express.Router();

clientsRouter.get("/", (req, res, next) => {
    //let filter = {};
    return Client.find()
      .then((clients) => {
        return res.status(200).json(clients);
      })
      .catch((err) => {
        const error = new Error(err);
        error.status = 500;s
        return next(error);
      });
  });

module.exports = clientsRouter;