const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientSchema = new Schema(
    {
        nombre: {type: String, required: true},
        apellido: {type: String, required: true},
        email: {type: String, required: true},
        telefono: {type: Number, required: true},
        edad: {type: Number}
    }, {
        timestamps: true,
    });

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;