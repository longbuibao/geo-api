const mongoose = require('mongoose')
const Time = require('./Time')
const Point = require('./Point')

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'LTDC'
    },
    time: {
        type: mongoose.Types.ObjectId,
        ref: 'Time'
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'Patient'
    },
    location: {
        type: mongoose.Types.ObjectId,
        ref: 'Point'
    }
})

eventSchema.pre('remove', async function(next) {
    await Time.deleteOne({ _id: this.time })
    await Point.deleteOne({ _id: this.location })
    next()
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event

//1-1-2021 to 30-6-2021