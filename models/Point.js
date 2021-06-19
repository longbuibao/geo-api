const mongoose = require('mongoose')

const pointSchema = new mongoose.Schema({
    long: Number,
    lat: Number,
    hasPatient: { type: mongoose.Types.ObjectId, ref: 'Patient' },
    hasEvent: { type: mongoose.Types.ObjectId, ref: 'Event' }
})

const Point = mongoose.model('Point', pointSchema)

module.exports = Point