const mongoose = require("mongoose");
const db = require("../db");
const Client = require("../models/Client");

const clients = [
    {
        nombre: "Alfonso",
        apellido: "López de la Manzanara",
        email: "alfonso@gmail.com",
        telefono: 666050501
    },
    {
        nombre: "Juan",
        apellido: "del Castillo Raboso",
        email: "juan@gmail.com",
        telefono: 666050502
    },
    {
        nombre: "Diego",
        apellido: "Díaz Martínez",
        email: "diez@gmail.com",
        telefono: 666050503
    },
    {
        nombre: "Pedro",
        apellido: "Callejas",
        email: "pedro@gmail.com",
        telefono: 666050504
    },
    {
        nombre: "Pedro",
        apellido: "gonzalez",
        email: "galgo@gmail.com",
        telefono: 666050505
    }
];

const clientsDocuments = clients.map((client) => new Client(client));

// Conectaremos con DB y desconectaremos tras insertar los documentos
db.connectDB()
  // Ver si hay clientes y eliminarlos
  .then(async () => {
    const allClients = await Client.find();
    if (allClients.length > 0) {
      await Client.collection.drop();
    }
  })
  .catch((err) => console.error(`Error eliminado información de la DB: ${err}`))
  // Añadir documentos de clientes a la base de datos
  .then(async () => {
    await Client.insertMany(clientsDocuments);
    
  })
  .catch((err) => console.error(`Error creando documentos en DB: ${err}`))
  // Cerrar la conexión
  .finally(() => mongoose.disconnect());
