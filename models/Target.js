const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const targetSchema = new Schema ({
    nivel: {type: String, requiered: true },
    fidelidad: { type: String, required: true},
    producto: { type: String},
    experiencia: { type: String},
    clients: [{ type: mongoose.Types.ObjectId, ref:'Client' }],
}, {
    timestamps: true
});

const Target = mongoose.model('Target', targetSchema);

module.exports = Target;