const express = require("express");
const Client = require("../models/Client");
const auth = require('../middlewares/auth.middleware');

const clientsRouter = express.Router();

clientsRouter.get("/", (req, res, next) => {
    //let filter = {};
    return Client.find()
      .then((clients) => {
        return res.status(200).json(clients);
      })
      .catch((err) => {
        const error = new Error(err);
        error.status = 500;
        return next(error);
      });
  });

clientsRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  return Client.findById(id)
    .then(client => {
      if(!client){
        const error = new Error("Client not found");
        error.status = 404;
        return next(error);
      }
      return res.status(200).json(client);
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    });
})

clientsRouter.post('/', (req, res, next) => {
  const newClient = new Client({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    telefono: req.body.telefono
  })
  return newClient.save()
    .then(client => {
      return res.status(200).json(newClient);
    })
    .catch(err => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    });
});

clientsRouter.put('/:id/orders', (req, res, next) => {
  const id = req.params.id;
  return Client.findByIdAndUpdate(id, {$push: {orders: req.body.orderId}}, {new: true})
    .then(clientUpdated => {
      res.status(200).json(clientUpdated);
    })
    .catch(err => {
      const error = new Error (err);
      error.status = 500;
      return next(error);
    })
})

clientsRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  return Client.findByIdAndDelete(id)
   .then(() => {
    return res.status(200).json(`Client with id ${id} delete`);
  })
  .catch(err => {
    const error = new Error(err);
    error.status = 500;
    return next(error);
   })
})



module.exports = clientsRouter;