const mongoose = require('mongoose');


// Guardamos en una constante la clave de Mongodb
const DB_URL = 'mongodb+srv://admin:admin@cluster0.a4xyc.mongodb.net/DecathlonNode?retryWrites=true&w=majority'

//Configuramos la función connect
const connectDB = () => mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = { connectDB, DB_URL };