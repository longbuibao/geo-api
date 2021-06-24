const mongoose = require('mongoose')

const timeSchema = new mongoose.Schema({
    start: {
        date: Number,
        month: Number,
        year: Number,
        hours: Number,
        minutes: Number
    },
    end: {
        date: Number,
        month: Number,
        year: Number,
        hours: Number,
        minutes: Number
    }
})
timeSchema.virtual('time', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'time'
})

const Time = mongoose.model('Time', timeSchema)

module.exports = Time