const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: String,
    time: {
        type: mongoose.Types.ObjectId,
        ref: 'Time'
    }
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event

//1-1-2021 to 30-6-2021