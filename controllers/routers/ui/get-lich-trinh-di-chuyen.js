const { getPatientByName } = require('../../patients/patients.controller')

const lichTrinhDiChuyen = async(name) => {
    const { patient } = await getPatientByName(name)
    await patient.populate(
        'events'
    ).execPopulate()

    console.log(patient)

    const allEventsPoints = await Promise.all(patient.events.map(async(event) => {
        return await event
            .populate('location', '-_id')
            .populate('time', '-_id')
            .populate('owner', '-_id')
            .execPopulate()
    }))

    const evtToObj = allEventsPoints.map(evt => evt.toObject())

    const result = evtToObj.map(evt => {
        const time = new Date(evt.time.time).toLocaleString()
        const timeMili = new Date(evt.time.time).getTime()

        evt.patienName = evt.owner.name
        evt.happendAt = time
        evt.long = evt.location.long
        evt.lat = evt.location.lat
        evt.detailAdd = evt.location.detailAddress
        evt.district = evt.location.district
        evt.timeMili = timeMili

        return evt
    })

    return result
}

module.exports = {
    lichTrinhDiChuyen
}