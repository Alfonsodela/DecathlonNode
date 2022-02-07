const express = require("express");
const passport = require('passport');
require('./authentication/passport');


const clientsRouter = require('./router/clients.router');
const targetsRouter = require('./router/targets.router');
const usersRouter = require("./router/users.router");
const db = require("./db");

const PORT = 3000;

const server = express();

// Añadimos los middlewares para poder leer los body
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(passport.initialize());
server.use(passport.session());

server.use('/clients', clientsRouter);
server.use('/targets', targetsRouter);
server.use('/users', usersRouter);

server.get("/", (req, res) => {
  res.status(200).send("Server is up & running");
});

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

db.connectDB().then(() => {
    console.log('Conectado a base de datos Mongo');
  server.listen(PORT, () => {
    console.log(`Iniciado servidor express en puerto ${PORT}`);
  });
});
