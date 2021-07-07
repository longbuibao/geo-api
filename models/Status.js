const mongoose = require('mongoose')
const Time = require('./Time')
const statusSchema = new mongoose.Schema({
    nameOfStatus: String,
    timeOfStatus: {
        type: mongoose.Types.ObjectId,
        ref: 'Time'
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'Patient'
    }
})

statusSchema.pre('remove', async function(next) {
    await Time.findOneAndDelete({ _id: this.timeOfStatus })
    next()
})

const Status = mongoose.model('Status', statusSchema)
module.exports = Status