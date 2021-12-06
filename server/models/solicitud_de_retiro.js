const { Schema, model } = require('mongoose');

const solicitudDeRetiroSchema = new Schema(
    {
        cliente: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
        empleador: { type: Schema.Types.ObjectId, ref: 'Empleador', required: false },
        fecha_solicitud: { type: Date, required: true, trim: true, unique: false, default: Date.now },
        monto: { type: Number, required: true, trim: true, unique: false },
        aprobado: { type: Number, required: true, trim: true, unique: false, default: -1 }
    },
    {
        timestamps: true
    }
);

module.exports = model('SolicitudDeRetiro', solicitudDeRetiroSchema);