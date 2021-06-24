const mongoose = require('mongoose')

const diseaseSchema = new mongoose.Schema({
    name: String
})

diseaseSchema.virtual('belongToPatient', {
    ref: 'Patient',
    localField: '_id',
    foreignField: 'hasDisease'
})

const Disease = mongoose.model('Disease', diseaseSchema)

module.exports = Disease