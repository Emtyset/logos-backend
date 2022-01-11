const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DefectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: ""
    }
})

module.exports = mongoose.models.Defect || mongoose.model('Defect', DefectSchema)