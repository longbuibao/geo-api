const mongoose = require('mongoose')


const patientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    status: String,
    hasDisease: { type: mongoose.Types.ObjectId, ref: 'Disease' },
    hasEvent: { type: mongoose.Types.ObjectId, ref: 'Event' }
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient