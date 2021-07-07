const mongoose = require('mongoose')

const VungCachLiSchema = new mongoose.Schema({
    name: String,
    boundaries: {
        type: [mongoose.Types.ObjectId],
        ref: 'Point'
    }
})

const VungCachLi = mongoose.model('VungCachLi', VungCachLiSchema)

module.exports = VungCachLi