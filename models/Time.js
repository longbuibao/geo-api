const mongoose = require('mongoose')

const timeSchema = new mongoose.Schema({
    start: Date,
    end: Date
})

const Time = mongoose.model('Time', timeSchema)

module.exports = Time