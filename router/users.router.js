const express = require("express");
const passport = require("passport");

const usersRouter = express.Router();

usersRouter.post("/register", (req, res, next) => {
  const callback = (error, user) => {
    if (error) {
      return next(error);
    }

    req.logIn(user, (errorLogin) => {
      // Si hay un error logeando
      if (errorLogin) {
        return next(errorLogin);
      }
      res.status(201).json(user);
    });
  };
  passport.authenticate("registro", callback)(req);
});

module.exports = usersRouter;

