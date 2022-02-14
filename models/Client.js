const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Creación del objeto del esquema
const clientSchema = new Schema(
    {
        nombre: {type: String, required: true},
        apellido: {type: String, required: true},
        email: {type: String, required: true},
        telefono: {type: Number, required: true},
        edad: {type: Number},
        orders: [{ type: mongoose.Types.ObjectId, ref:'Order' }],
        
    }, {
        timestamps: true,
    });


    
// Exportamos el modelo
const Client = mongoose.model('Client', clientSchema);
module.exports = Client;