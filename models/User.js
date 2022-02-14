const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Creación del objeto del esquema
const userSchema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        // nombre: { type: String, required: true },
    }, {
        timestamps: true
    }
);


// Exportamos el modelo
const User = mongoose.model('User', userSchema);
module.exports = User;
