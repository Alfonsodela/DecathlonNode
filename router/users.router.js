const express = require("express");
const passport = require("passport");
const auth = require('../middlewares/auth.middleware');


const usersRouter = express.Router();

// Configurando routing y controllers

// Registro
usersRouter.post("/register", (req, res, next) => {
  const callback = (error, user) => {
    if (error) {
      return next(error);
    }

    req.logIn(user, (errorLogin) => {
      if (errorLogin) {
        return next(errorLogin);
      }
      res.status(201).json(user);
    });
  };
  passport.authenticate("register", callback)(req);
});

//Login
usersRouter.post("/login", (req, res, next) => {
  const callback = (error, user) => {
    if (error) {
      return next(error);
    }

    req.logIn(user, (errorLogin) => {
      if (errorLogin) {
        return next(errorLogin);
      }
      return res.status(200).json(user);
    });
  };
  passport.authenticate("login", callback)(req);
});

// Logout
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
