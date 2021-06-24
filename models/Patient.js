const mongoose = require('mongoose')


const patientSchema = new mongoose.Schema({
    name: String,
    yearOfBirth: Number,
    status: String,
    hasDisease: {
        type: mongoose.Types.ObjectId,
        ref: 'Disease'
    },
    currentLocation: {
        type: mongoose.Types.ObjectId,
        ref: 'Point'
    }
    // hasEvent: { type: mongoose.Types.ObjectId, ref: 'Event' }
})
patientSchema.virtual('events', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'owner'
})
const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient