// Importaciones
const express = require("express");
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('./authentication/passport');

// Importamos las rutas
const auth = require('./middlewares/auth.middleware');
const bicyclesRouter = require('./router/bicycles.router');
const clientsRouter = require('./router/clients.router');
const ordersRouter = require('./router/orders.router');
const usersRouter = require("./router/users.router");
const db = require("./db");


const PORT = process.env.PORT || 3000;

const server = express();

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: false }));


server.use(session({
  secret: 'secreto-desarrollo',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 3600000, 
  },
  store: MongoStore.create({ mongoUrl: db.DB_URL })
}));

server.use(passport.initialize());
server.use(passport.session());

// Rutas
server.use('/bicycles', bicyclesRouter);
server.use('/clients', [auth.isAuthenticated], clientsRouter);
server.use('/orders', [auth.isAuthenticated], ordersRouter);
server.use('/users', usersRouter);

server.get("/", (req, res) => {
  res.status(200).send("Server is up & running");
});

// Control de errores
server.use("*", (req, res, next) => {
  const error = new Error("Ruta no encontrada");
  error.status = 404;
  return next(error);
});

server.use((err, _req, res, _next) => {
  return res
    .status(err.status || 500)
    .json(err.message || "Error inesperado en servidor");
});

// Levantando el servidor
db.connectDB().then(() => {
    console.log('Conectado a base de datos Mongo');
  server.listen(PORT, () => {
    console.log(`Iniciado servidor express en puerto ${PORT}`);
  });
});
