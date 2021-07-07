const {
    getPatientByName
} = require('../patients/patients.controller')
const {
    saveTime
} = require('../times/times.controller')

const {
    addPoint
} = require('../points/points.controller')

const {
    addEvent
} = require('../events/events.controller');

const addEventToPatient = async(body) => {
    try {
        const { time } = body
        const {
            latEvent,
            longEvent,
            addressEvent,
            districtEvent,
        } = body
        const { name } = body

        const patientId = (await getPatientByName(name)).patient._id
        console.log(patientId)
        const timeId = await saveTime(time)
        const pointId = await addPoint({
            lat: latEvent,
            long: longEvent,
            detailAddress: addressEvent,
            district: districtEvent
        })

        const savedEvent = await addEvent({
            owner: patientId,
            time: timeId,
            location: pointId
        })

        return {
            patientId,
            timeId,
            pointId,
            savedEvent
        }
    } catch (error) {
        throw {
            path: `controllers/points.controller.js ${error.message}`,
            message: 'Lỗi không thể lưu point'
        }
    }
}

module.exports = {
    addEventToPatient
}