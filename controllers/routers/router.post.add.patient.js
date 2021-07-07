const {
    savePatient
} = require('../patients/patients.controller')

const {
    findDisease
} = require('../diseases/diseases.controller')

const {
    addPoint
} = require('../points/points.controller')

const {
    saveTime
} = require('../times/times.controller')

const {
    saveStatus
} = require('../status/status.controller')

const addPatient = async(body) => {
    try {
        const {
            lat,
            long,
            detailAddress,
            district,
            name,
            yearOfBirth,
            status,
            timeStatus,
            accTime
        } = body

        const disease = await findDisease('SARS-CoV-2')
        const point = await addPoint({ lat, long, detailAddress, district })
        const time = await saveTime(accTime)
        const savedTimeStatus = await saveTime(timeStatus)
        const patient = await savePatient({
            name,
            yearOfBirth,
            currentLocation: point,
            announcedTime: time,
            hasDisease: disease
        })

        const savedStatus = await saveStatus({
            nameOfStatus: status,
            timeOfStatus: savedTimeStatus,
            owner: patient
        })

        return {
            disease,
            point,
            time,
            patient,
            savedStatus
        }
    } catch (error) {
        throw {
            path: `controllers/points.controller.js ${error.message}`,
            message: 'Lỗi không thể lưu bệnh nhân và các dữ liệu liên quan'
        }
    }


}

module.exports = {
    addPatient
}