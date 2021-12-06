const { Schema, model } = require('mongoose');

const regionSchema = new Schema(
    {
        nombre: { type: String, required: true, unique: true, trim: true, maxlength: 60 },
        romano: { type: String, required: true, unique: true, trim: true, maxlength: 5 },
        num_provincias: { type: Number, required: true, unique: false, trim: true },
        num_comunas: { type: Number, required: true, unique: false, trim: true }
    },
    {
        timestamps: true
    }
);

module.exports = model('Region', regionSchema);