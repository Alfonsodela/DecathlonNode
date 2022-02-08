const passport = require("passport");
const passportLocal = require("passport-local");
const bcrypt = require('bcrypt');

const User = require("../models/User");

const LocalStrategy = passportLocal.Strategy;

// const saltRounds = 10;

passport.use("registro",
  new LocalStrategy(
    {
      usernameField: "email", 
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        // 1. Buscar si el usuario existe en la DB
        const previousUser = await User.findOne({ email: email });

        // 2. Si el usuario ya existe, salimos con un error
        if (previousUser) {
          const error = new Error("The user is already registered");
          return done(error);
        }

        // 3. Encriptar la contraseña
        // const pwdHash = await bcrypt.hash(password, saltRounds);

        // 4. Crear el documento del Usuario para guardarlo en DB
        const newUser = new User({
          email: email,
          password: password,
          // nombre: req.body.nombre // passReqToCallback = false, no podemos acceder aq
        });
        const savedUser  = await newUser.save();

        // 4.1. Eliminar contrasena del nuevoUsuario para no mandarlo en la respuesta
        savedUser.password = undefined;

        // 5. Retornar OK/KO
        done(null, savedUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);
