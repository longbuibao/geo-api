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

pointSchema.virtual('vungCachLiPoint', {
    ref: 'VungCachLi',
    foreignField: 'boundaries',
    localField: '_id'
})

pointSchema.virtual('vungPhongToa', {
    ref: 'PhongToa',
    foreignField: 'whereTo',
    localField: '_id'
})

pointSchema.virtual('point_paCurLoc', {
    ref: 'Patient',
    foreignField: 'currentLocation',
    localField: '_id'
})
const Point = mongoose.model('Point', pointSchema)

module.exports = Point