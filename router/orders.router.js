const express = require("express");
const Order = require("../models/Order");
const auth = require("../middlewares/auth.middleware");

const ordersRouter = express.Router();

// Configurando routing y controllers
ordersRouter.get("/", (req, res, next) => {
  return Order.find()
    .then((orders) => {
      return res.status(200).json(orders);
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    });
});

ordersRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  return Order.findById(id)
    .then((order) => {
      if (!order) {
        const error = new Error("Order not found");
        error.status = 404;
        return next(error);
      }
      return res.status(200).json(order);
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    });
});

ordersRouter.post("/", (req, res, next) => {
  const newOrder = new Order({
    pedido: req.body.pedido,
    estado: req.body.estado,
  });
  return newOrder
    .save()
    .then(() => {
      res.status(201).json(newOrder);
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    });
});

ordersRouter.put('/:id', (req, res, next) => {
    const id = req.params.id;
    return Order.findByIdAndUpdate(id, {$set: req.body}, {new: true})
    .then(orderUpdated => {
        res.status(200).json(orderUpdated);
    })
    .catch(err => {
        const error = new Error (err);
        error.status = 500;
        return next(error);
      })
})

ordersRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  return Order.findByIdAndDelete(id)
    .then(() => {
      return res.status(200).json(`Order with id ${id} delete`);
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    });
});

module.exports = ordersRouter;
