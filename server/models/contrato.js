const { Schema, model } = require('mongoose');

const contratoSchema = new Schema(
    {
        rut_cliente: { type: Number, ref: 'Cliente', required: true },
        rut_empleador: { type: Number, ref: 'Empleador', required: false },
        fecha_inicio: { type: Date, required: true, trim: true, unique: false, default: '2000-01-01' },
        fecha_termino: { type: Date, required: false, trim: true, unique: false, default: '2000-01-01' },
        fecha_facturacion: { type: Date, required: true, trim: true, unique: false, default: '2000-01-01' },
    },
    {
        timestamps: true
    }
);

module.exports = model('Contrato', contratoSchema);
