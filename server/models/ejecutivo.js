const { Schema, model } = require('mongoose');

const ejecutivoSchema = new Schema(
    {
        rut: { type: Number, required: true, unique: true },
        //id_direccion: { type: Schema.Types.ObjectId, ref: 'Direccion' },
        nombres: { type: String, required: true, unique: false, trim: true, maxlength: 60 },
        apellidos: { type: String, required: true, unique: false, trim: true, maxLength: 60 },
        contraseña: { type: String, required: true, unique: false, maxLength: 100 },
        email: { type: String, required: true, unique: true, trim: true, maxLength: 60 },
        telefono: { type: Number, required: true, unique: false },
        cargo: { type: String, required: true, unique: false, trim: true, maxLength: 60 }
    },
    {
        timestamps: true
    }
);

module.exports = model('Ejecutivo', ejecutivoSchema);