const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bikeSchema = new Schema(
    {
        nombre: {type: String, required: true},
        tipo: {type: String, required: true},
        precio: {type: Number}
    }, {
        timestamps: true,
    });

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;