const mongoose = require('mongoose')

const dummySchema = new mongoose.Schema({
    address: String
})

const Dummy = mongoose.model('Dummy', dummySchema)

module.exports = Dummy