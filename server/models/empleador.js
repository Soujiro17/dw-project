const { Schema, model } = require('mongoose');

const empleadorSchema = new Schema(
    {
        rut_empresa: { type: Number, required: true, unique: true },
        id_direccion: { type: Schema.Types.ObjectId, ref: 'Direccion', required: true },
        nombre: { type: String, required: true, unique: false, trim: true, maxlength: 30 },
        rubro: { type: String, required: true, unique: false, trim: true, maxLength: 100 }
    },
    {
        timestamps: true
    }
);

module.exports = model('Empleador', empleadorSchema);