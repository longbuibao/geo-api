const mongoose = require('mongoose')

const polygonSchema = new mongoose.Schema({
    name: {
        type: String
    },
    pType: {
        type: String,
    },
    rings: {
        type: Array
    }
})

const Polygon = mongoose.model('Polygon', polygonSchema)

module.exports = Polygon