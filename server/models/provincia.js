const { Schema, model } = require('mongoose');

const provinciaSchema = new Schema(
    {
        //id_region: { type: Schema.Types.ObjectId, ref: 'Region' },
        nombre: { type: String, required: true, trim: true, unique: false, maxlength: 30 },
        num_comunas: { type: Number, required: true, trim: true, unique: false }
    },
    {
        timestamps: true
    }
);

module.exports = model('Provincia', provinciaSchema);