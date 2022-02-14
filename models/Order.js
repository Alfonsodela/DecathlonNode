const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Creación del objeto del esquema
const orderSchema = new Schema ({
    
    pedido: {type: Number, requiered: true },
    estado: { type: String, required: true},
    // clients: [{ type: mongoose.Types.ObjectId, ref:'Client' }],
}, {
    timestamps: true
});


// Exportamos el modelo
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;