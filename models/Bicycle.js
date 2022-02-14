const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Creación del objeto del esquema
const bicycleSchema = new Schema(
    {
        nombre: {type: String, required: true},
        tipo: {type: String, required: true},
        precio: {type: Number}
    }, {
        timestamps: true,
    });

// Exportamos el modelo
const Bicycle = mongoose.model('Bicycle', bicycleSchema);
module.exports = Bicycle;