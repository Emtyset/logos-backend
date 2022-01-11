const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    text: [[{
        type: String,
        }, 
        {
            type: String
        }]],
    order: {
        type: Number,
        enum: [0, 1, 2],
        default: 1,
        required: true
    },
    time: {
        type: Number,
        default: 60,
        min: 1,
        max: 300,
        required: true
    }, //... add defect
    defectType: [{
        type: Schema.Types.ObjectId,
        ref: 'Defect'
    }]
})

module.exports = mongoose.models.Exercise || mongoose.model('Exercise', ExerciseSchema)