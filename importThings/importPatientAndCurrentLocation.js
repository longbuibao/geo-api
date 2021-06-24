require('../db/mongoose')

const Patient = require('../models/Patient')
const Disease = require('../models/Disease')
const Point = require('../models/Point')

const disease = new Disease({
    name: 'SARS-CoV-2'
}).save()

const point = new Point({
    lat: 10.742483803163188,
    long: 106.71589546518221,
    detailAddress: '70 Duong so 45',
    district: 'Quan 7'
}).save().then((point) => {
    const patient = new Patient({
        name: 'bui bao long',
        yearOfBirth: 2000,
        status: 'dang dieu tri',
        hasDisease: disease._id,
        currentLocation: point._id
    })
    patient.save()
})