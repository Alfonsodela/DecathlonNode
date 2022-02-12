const passport = require("passport");
const passportLocal = require("passport-local");
const bcrypt = require('bcrypt');

const User = require("../models/User");

const LocalStrategy = passportLocal.Strategy;

const saltRounds = 10;

passport.use("register",
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

        // 2.1 Validar formato contraseña
        // [a-z0-9]
        // if (!validation...)

        // 3. Encriptar la contraseña
        const pwdHash = await bcrypt.hash(password, saltRounds);

        // 4. Crear el documento del Usuario para guardarlo en DB
        const newUser = new User({
          email: email,
          password: pwdHash,
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
  ));

  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          // 1. Primero buscamos si el usuario existe en nuestra DB
          const currentUser = await User.findOne({ email: email });
  
          // 2. Si NO existe el usuario, tendremos un error...
          if (!currentUser) {
            const error = new Error('The user does not exist!');
            return done(error);
          }
  
          // // 3. Si existe el usuario, vamos a comprobar si su password enviado coincide con el registrado
          const isValidPassword = await bcrypt.compare(password, currentUser.password
          );
  
          // 4. Si el password no es correcto, enviamos un error a nuestro usuario
          if (!isValidPassword) {
            const error = new Error(
              'The email & password combination is incorrect!'
            );
            return done(error);
          }
  
          // 5. Si todo se valida correctamente, eliminamos la contraseña del usuario devuelto 
          // por la db y completamos el callback con el usuario
          currentUser.password = null;
          return done(null, currentUser);
        } catch (error) {
          return done(error);
        }
      }
    ))

  passport.serializeUser((user, done) => {
      return done(null, user._id);
  });

  passport.deserializeUser(async (userId, done) => {
      try {
          const user = await User.findById(userId);
          return done(null, user);
      } catch(error) {
          return done(error);
      }
  });
  

  
