const mongoose = require('mongoose')

const pointSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    owner: { type: mongoose.Types.ObjectId, ref: 'Patient' }
})

const Point = mongoose.model('Point', pointSchema)

module.exports = Point