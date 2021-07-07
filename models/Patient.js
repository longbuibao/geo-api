const mongoose = require('mongoose')
const Event = require('../models/Event')
const Point = require('../models/Point')
const Status = require('../models/Status')
const Time = require('../models/Time')

const patientSchema = new mongoose.Schema({
    name: String,
    yearOfBirth: Number,
    hasDisease: {
        type: mongoose.Types.ObjectId,
        ref: 'Disease'
    },
    currentLocation: {
        type: mongoose.Types.ObjectId,
        ref: 'Point'
    },
    announcedTime: {
        type: mongoose.Types.ObjectId,
        ref: 'Time'
    }
})

patientSchema.virtual('pa_sa', {
    ref: 'Status',
    localField: '_id',
    foreignField: 'owner'
})

patientSchema.virtual('events', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'owner'
})

patientSchema.pre('remove', async function(next) {
    const events = await Event.find({ owner: this._id })
    const status = await Status.find({ owner: this._id })
    events.forEach(async(event) => {
        await event.remove()
    })
    status.forEach(async(stt) => {
        await stt.remove()
    })
    await Point.deleteOne({ _id: this.currentLocation })
    await Time.findOneAndDelete({ _id: this.announcedTime })
    next()
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient