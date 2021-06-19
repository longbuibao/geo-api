const mongoose = require('mongoose')
const Disease = require('./Diseases')
const Point = require('./Point')

const patientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    status: String,
    hasLocation: { type: Array[mongoose.Types.ObjectId], ref: 'Point' },
    hasDisease: { type: mongoose.Types.ObjectId, ref: 'Diseases' },
    hasEvent: { type: mongoose.Types.ObjectId, ref: 'Event' }
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient