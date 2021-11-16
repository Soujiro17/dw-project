const { Schema, model } = require('mongoose');

const solicitudDeRetiroSchema = new Schema(
    {
        //rut_cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' },
        //rut_empleador: { type: Schema.Types.ObjectId, ref: 'Empleador' },
        fecha_solicitud: { type: Date, required: true, trim: true, unique: false, default: Date.now },
        monto: { type: Number, required: true, trim: true, unique: false },
        aprobado: { type: Boolean, required: true, trim: true, unique: false, default: -1 }
    },
    {
        timestamps: true
    }
);