const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: String,
    time: {
        type: mongoose.Types.ObjectId,
        ref: 'Time'
    }
})

const Event = mongoose.Schema('Event', eventSchema)

module.exports = Event