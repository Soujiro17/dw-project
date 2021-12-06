const { Schema, model } = require('mongoose');

const solicitudDeRetiroSchema = new Schema(
    {
        rut_cliente: { type: Number, ref: 'Cliente', required: true },
        rut_empleador: { type: Number, ref: 'Empleador', required: false, default: 0 },
        fecha_solicitud: { type: Date, required: true, trim: true, unique: false, default: Date.now },
        monto: { type: Number, required: true, trim: true, unique: false },
        email: { type: String, required: true, unique: true, trim: true, maxlength: 50 },
        telefono: { type: Number, required: false, unique: false, default: 0 },
        aprobado: { type: Number, required: true, trim: true, unique: false, default: -1 }
    },
    {
        timestamps: true
    }
);

module.exports = model('SolicitudDeRetiro', solicitudDeRetiroSchema);