const mongoose = require('mongoose')

const pointSchema = new mongoose.Schema({
    lat: Number,
    long: Number,
    detailAddress: String,
    district: String
})

pointSchema.virtual('happendIn', {
    ref: 'Event',
    foreignField: 'location',
    localField: '_id'
})
const Point = mongoose.model('Point', pointSchema)

module.exports = Point