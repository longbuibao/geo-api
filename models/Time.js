const mongoose = require('mongoose')

const timeSchema = new mongoose.Schema({
    time: String
})

timeSchema.virtual('time_event', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'time'
})

timeSchema.virtual('status_time', {
    ref: 'Time',
    localField: '_id',
    foreignField: 'timeOfStatus'
})

timeSchema.virtual('phongToaTime', {
    ref: 'PhongToa',
    localField: '_id',
    foreignField: 'time'
})

const Time = mongoose.model('Time', timeSchema)

module.exports = Time