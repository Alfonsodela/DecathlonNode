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
  passport.authenticate("register", callback)(req);
});

usersRouter.post("/login", (req, res, next) => {
  const callback = (error, user) => {
    if (error) {
      return next(error);
    }

    req.logIn(user, (errorLogin) => {
      // Si hay un error logeando al usuario, resolvemos el controlador
      if (errorLogin) {
        return next(errorLogin);
      }
      // Si no hay error, devolvemos al usuario logueado
      return res.status(200).json(user);
    });
  };
  passport.authenticate("login", callback)(req);
});

usersRouter.post('/logout', (req, res, next) => {
  if (!req.user) {
    return res.sendStatus(304);
  }

  req.logOut();

  return req.session.destroy(() => {
    res.clearCookie('connect.sid');
    return res.status(200).json('Logout session')
  });
});

module.exports = usersRouter;
