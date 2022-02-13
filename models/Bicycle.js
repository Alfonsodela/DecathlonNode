const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bicycleSchema = new Schema(
    {
        nombre: {type: String, required: true},
        tipo: {type: String, required: true},
        precio: {type: Number}
    }, {
        timestamps: true,
    });

const Bicycle = mongoose.model('Bicycle', bicycleSchema);

module.exports = Bicycle;