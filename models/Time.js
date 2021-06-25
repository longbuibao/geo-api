const mongoose = require('mongoose')

const timeSchema = new mongoose.Schema({
    time: String
})
timeSchema.virtual('time_', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'time'
})

const Time = mongoose.model('Time', timeSchema)

module.exports = Time