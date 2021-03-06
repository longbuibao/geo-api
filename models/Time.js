const mongoose = require('mongoose')

const timeSchema = new mongoose.Schema({
    time: Date
})

timeSchema.virtual('time_event', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'time'
})

timeSchema.virtual('status_time', {
    ref: 'Status',
    localField: '_id',
    foreignField: 'timeOfStatus'
})

timeSchema.virtual('phongToaTime', {
    ref: 'PhongToa',
    localField: '_id',
    foreignField: 'time'
})

timeSchema.virtual('ann_time', {
    ref: 'Patient',
    localField: '_id',
    foreignField: 'announcedTime'
})
const Time = mongoose.model('Time', timeSchema)

module.exports = Time