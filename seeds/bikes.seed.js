const mongoose = require("mongoose");
const db = require("../db");
const Bike = require("../models/Bike");

const bikes = [
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

const bikesDocuments = bikes.map((bike) => new Bike(bike));

db.connectDB()
  // Ver si hay bicis y eliminarlos
  .then(async () => {
    const allBikes = await Bike.find();
    if (allBikes.length > 0) {
      await Bike.collection.drop();
    }
  })
  .catch((err) => console.error(`Error eliminado información de la DB: ${err}`))
  // Añadir documentos de clientes a la base de datos
  .then(async () => {
    await Bike.insertMany(bikesDocuments);
    // await Promise.all(cochesDocuments.map((coche) => Coche.insert(coche)));
  })
  .catch((err) => console.error(`Error creando documentos en DB: ${err}`))
  // Cerrar la conexión
  .finally(() => mongoose.disconnect());
