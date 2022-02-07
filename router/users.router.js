const express = require('express');
const passport = require('passport');

const usersRouter = express.Router();

usersRouter.post('/register', (req, res, next) => {
    const callback = (error, user) => {
        if(error) {
            return next(error);
        }

        req.logIn(user, (errorLogin) => {
            if(errorLogin) {
                return next(errorLogin);
            }
            res.status(201).json(user);
        });
    };
    passport.authenticate('register', callback)(req);
});

usersRouter.post('/login', (req, res, next) => {
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

    passport.authenticate('login', callback)(req);
});

module.exports = usersRouter;