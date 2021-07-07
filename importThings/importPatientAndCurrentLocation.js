require('../db/mongoose')
const fs = require('fs')
const Patient = require('../models/Patient')
const Disease = require('../models/Disease')
const Point = require('../models/Point')

const testFunction = async() => {
    const patient = await Patient.findOne({ name: 'BN0001' })
    await patient.populate({
        path: 'events'
    }).execPopulate()

    patient.events.forEach(async(event) => {
        const objEvent = event.toObject()
        console.log(objEvent)
        fs.writeFile(`${event._id}.json`, JSON.stringify(objEvent), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    })
}

testFunction()