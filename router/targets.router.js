const express = require("express");
const Target = require("../models/Target");

const targetsRouter = express.Router();

targetsRouter.get("/", (req, res, next) => {
  //let filter = {};
  return Target.find()
    .then((movies) => {
      return res.status(200).json(movies);
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    });
});

targetsRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  return Target.findById(id)
    .then((target) => {
      if (!target) {
        const error = new Error("Target not found");
        error.status = 404;
        return next(error);
      }
      return res.status(200).json(target);
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    });
});

targetsRouter.post('/', (req, res, next) => {
  const newTarget = new Target({
    nivel: req.body.nombre,
    fidelidad: req.body.fidelidad,
    producto: req.body.producto,
    experiencia: req.body.experiencia 
  })
  return newTarget.save()
    .then(() => {
      return res.status(201).json(newTarget);
    })
    .catch(err => {
      const error = new Error(err);
      error.satus = 500;
      return next(error);
  });
});

targetsRouter.put('/:id/clients', (req, res, next) => {
  const id = req.params.id;
  return Target.findByIdAndUpdate(id, { $push: {clients: req.body.clientId}  }, { new: true })
    .then(targetUpdated => {
      res.status(200).json(targetUpdated);
    })
    .catch(err => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    })
})

targetsRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  return Target.findByIdAndDelete(id)
    .then(() => {
      return res.status(200).json(`Target with id ${id} delete`);
    })
    .catch(err => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    })
})

module.exports = targetsRouter;
