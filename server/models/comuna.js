const { Schema, model } = require('mongoose');

const comunaSchema = new Schema(
    {
        id_provincia: { type: Schema.Types.ObjectId, ref: 'Provincia' },
        nombre: { type: String, required: true, unique: false, trim: true, maxLength: 30 },
    },
    {
        timestamps: true
    }
);

module.exports = model('Comuna', comunaSchema);