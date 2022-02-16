const mongoose = require("mongoose");
const db = require("../db");
const Bicycle = require("../models/Bicycle");
const Bike = require("../models/Bicycle");

const bicycles = [
  {
    nombre: "Rockrider XC 900",
    tipo: "Rígida",
    precio: 1798.99
  },
  {
    nombre: "Rockrider XC 900 S",
    tipo: "Doble suspensión",
    precio: 2199.99
  },
  {
    nombre: "Rockrider XC 500 S",
    tipo: "Doble suspensión",
    precio: 1999.99
  },
  {
    nombre: "Rockrider XC 100",
    tipo: "Rígida",
    precio: 899.99
  },
  {
    nombre: "Rockrider XC 120",
    tipo: "Rígida",
    precio: 1149.99
  },
  {
    nombre: "Rockrider XC 500",
    tipo: "Rígida",
    precio: 1299.99
  },
  {
    nombre: "Rockrider XC 100 S",
    tipo: "Doble suspensión",
    precio: 1399.99
  },
  {
    nombre: "Rockrider eBike st 900",
    tipo: "Eléctrica",
    precio: 2099.99
  },
  {
    nombre: "Rockrider eBike st 520",
    tipo: "Eléctrica",
    precio: 1799.99
  },
  {
    nombre: "Rockrider eBike st 100",
    tipo: "Eléctrica",
    precio: 1099.99
  },
];

const bicyclesDocuments = bicycles.map((bicycle) => new Bicycle(bicycle));

// Conectaremos con DB y desconectaremos tras insertar los documentos
db.connectDB()
  // Ver si hay bicis y eliminarlos
  .then(async () => {
    const allBicycles = await Bicycle.find();
    if (allBicycles.length > 0) {
      await Bicycle.collection.drop();
    }
  })
  .catch((err) => console.error(`Error eliminado información de la DB: ${err}`))
  // Añadir documentos de bicicletas a la base de datos
  .then(async () => {
    await Bicycle.insertMany(bicyclesDocuments);
    
  })
  .catch((err) => console.error(`Error creando documentos en DB: ${err}`))
  // Cerrar la conexión
  .finally(() => mongoose.disconnect());
