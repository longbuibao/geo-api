const mongoose = require('mongoose')

const PhongToaSchema = new mongoose.Schema({
    whereTo: {
        type: mongoose.Types.ObjectId,
        ref: 'Point'
    },
    time: {
        type: mongoose.Types.ObjectId,
        ref: 'Time'
    }
})

const PhongToa = mongoose.model('PhongToa', PhongToaSchema)

module.exports = PhongToa