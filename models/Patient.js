const mongoose = require('mongoose')
const Event = require('../models/Event')
const Point = require('../models/Point')

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

patientSchema.pre('remove', async function(next) {
    const events = await Event.find({ owner: this._id })
    events.forEach(async(event) => {
        await event.remove()
    })
    await Point.deleteOne({ _id: this.currentLocation })
    next()
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient