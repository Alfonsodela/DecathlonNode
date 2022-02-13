const express = require("express");
const Bicycle = require("../models/Bicycle");

const bicyclesRouter = express.Router();

bicyclesRouter.get("/", (req, res, next) => {
  return Bicycle.find()
  .then((bicycle) => {
    return res.status(200).json(bicycle);
  })
  .catch(err => {
      const error = new Error (err);
      error.status = 500;
      return next(error)
  });
});

bicyclesRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  return Bicycle.findById(id)
    .then(bicycle => {
      if(!bicycle){
        const error = new Error("Bike not found");
        error.status = 404;
        return next(error);
      }
      return res.status(200).json(bicycle);
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    });
})

bicyclesRouter.post('/', (req, res, next) => {
  const newBicycle = new Bicycle({
    nombre: req.body.nombre,
    tipo: req.body.tipo,
    precio: req.body.precio,
    
  })
  return newBicycle.save()
    .then(bicycle => {
      return res.status(200).json(newBicycle);
    })
    .catch(err => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    });
});

bicyclesRouter.put('/:id', (req, res, next) => {
  const id = req.params.id;
  return Bicycle.findByIdAndUpdate(id, {$set: req.body}, {new: true})
    .then(bicycleUpdated => {
      res.status(200).json(bicycleUpdated);
    })
    .catch(err => {
      const error = new Error (err);
      error.status = 500;
      return next(error);
    })
})

bicyclesRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  return Bicycle.findByIdAndDelete(id)
   .then(() => {
    return res.status(200).json(`Bike with id ${id} delete`);
  })
  .catch(err => {
    const error = new Error(err);
    error.status = 500;
    return next(error);
   })
})

module.exports = bicyclesRouter;

