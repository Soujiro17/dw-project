const { Schema, model } = require('mongoose');

const direccionSchema = new Schema(
    {
        //id_region: { type: Schema.Types.ObjectId, ref: 'Region' },
        //id_provincia: { type: Schema.Types.ObjectId, ref: 'Provincia' },
        //id_comuna: { type: Schema.Types.ObjectId, ref: 'Comuna' },
        calle: { type: String, required: true, trim: true, unique: false, maxLength: 60 },
        num_case: { type: Number, required: true, trim: true, unique: false },
        codigo_postal: { type: Number, required: true, trim: true, unique: false }
    },
    {
        timestamps: true
    }
);