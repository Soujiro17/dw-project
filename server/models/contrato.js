const { Schema, model } = require('mongoose');

const contratoSchema = new Schema(
    {
        //rut_cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' },
        //rut_empleador: { type: Schema.Types.ObjectId, ref: 'Empleador' },
        fecha_inicio: { type: Date, required: true, trim: true, unique: false, default: '2000-01-01' },
        fecha_termino: { type: Date, required: false, trim: true, unique: false, default: '2000-01-01' },
        fecha_facturacion: { type: Date, required: true, trim: true, unique: false, default: '2000-01-01' },
    },
    {
        timestamps: true
    }
);

module.exports = model('Contrato', contratoSchema);
