const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const LocalStrategy = passportLocal.Strategy;

const saltRounds = 5;

passport.use('register', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'contrasena',
        passReqToCallback: true,
    },
    async(req, username, password, done) => {
        try {
            const previousUser = await User.findOne({email: username});

            if(previousUser) {
                const error = new Error ('The user is already registered');
                return done(error);
            }

            const pwdHash = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                email: username,
                contrasena: pwdHash,
            });
            const saveUser = await newUser.save();

            saveUser.contrasena = undefined;

            done(null, saveUser);
        } catch(error) {
            return done(error);
        }
    }
))

passport.use('login',
    new LocalStrategy(
        {
            usernameField: 'email', // req.body.correo
            passwordField: 'contrasena', // req.body.contrasena
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                // 1. Buscar el usuario por el correo/nombre de usuario/algo unico que el usuario si co
                const user = await User.findOne({ email: username });

                // 2. Si el usuario no existe fallamos (porque no puede logearse nadie que no esté regi
                if (!user) {
                    const error = new Error('User not register');
                    return done(error);
                }

                // 3. Comparar contraseñas
                const isValidPassword = await bcrypt.compare(password, user.contrasena);

                // 4. Si la contraseña no es valida, fallamos
                if (!isValidPassword) {
                    const error = new Error('Password incorrect');
                    return done(error);
                }

                // 5. Damos por valido el login ya que el correo encaja y la contraseña es valida
                user.contrasena = undefined;
                return done(null, user);
            } catch(error) {
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
