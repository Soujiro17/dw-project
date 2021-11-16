const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema(
    {
        rut: { type: Number, required: true, unique: true },
        //id_direccion: { type: Schema.Types.ObjectId, ref: 'Direccion' },
        nombres: { type: String, required: true, unique: false, trim: true, maxlength: 60 },
        apellidos: { type: String, required: true, unique: false, trim: true, maxlength: 60 },
        contraseña: { type: String, required: true, unique: false, maxlength: 100 },
        email: { type: String, required: true, unique: true, trim: true, maxlength: 50 },
        telefono: { type: Number, required: true, unique: false },
        saldo: { type: Number, required: false, unique: false, default: 0 }
    },
    {
        timestamps: true
    }
);

module.exports = model('Usuario', usuarioSchema);