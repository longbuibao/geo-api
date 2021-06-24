require('../db/mongoose')

const Event = require('../models/Event')
const Patient = require('../models/Patient')
const Time = require('../models/Time')
const Point = require('../models/Point')

async function importEvent() {
    const time = new Time({
        start: {
            date: 1,
            month: 2,
            year: 2021,
            hours: 12,
            minutes: 36
        },
        end: {
            date: 1,
            month: 4,
            year: 2021,
            hours: 12,
            minutes: 36
        }
    })
    await time.save()
    const owner = await Patient.find({})
    console.log(owner)
    const location = await new Point({
        lat: 10.730756700393934,
        long: 106.70134065262403,
        detailAddress: '123 duong 14',
        district: 'quan 7'
    }).save()

    const event = new Event({
        name: 'mac benh',
        time: time._id,
        owner: owner[0]._id,
        location: location._id
    })
    await event.save()
}

importEvent()