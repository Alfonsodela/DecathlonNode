const mongoose = require("mongoose");
const db = require("../db");
const Target = require("../models/Target");

const targets = [
    {
      nivel: "Basic",
      fidelidad: "Tarjeta fidelidad",
      producto: "No activa",
      experiencia: "No activa",
    },
    {
      nivel: "Medium",
      fidelidad: "Tarjeta fidelidad",
      producto: "Test producto",
      experiencia: "No activa",
    },
    {
      nivel: "Premium",
      fidelidad: "Tarjeta fidelidad",
      producto: "Test producto",
      experiencia: "Experiencia deportiva",
    },
];

const targetsDocuments = targets.map((target) => new Target(target));

db.connectDB()
  // Ver si hay targets y eliminarlos
  .then(async () => {
    const allTargets = await Target.find();
    if (allTargets.length > 0) {
      await Target.collection.drop();
    }
  })
  .catch((err) => console.error(`Error eliminado información de la DB: ${err}`))
  // Añadir documentos de targets a la base de datos
  .then(async () => {
    await Target.insertMany(targetsDocuments);
  })
  .catch((err) => console.error(`Error creando documentos en DB: ${err}`))
  // Cerrar la conexión
  .finally(() => mongoose.disconnect());
