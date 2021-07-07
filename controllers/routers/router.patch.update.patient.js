const {
    getPatientByName,
    getPatientById
} = require('../patients/patients.controller')

const {
    findCurrentPoint
} = require('../points/points.controller')

const {
    getTimeById
} = require('../times/times.controller')

const Patient = require('../../models/Patient')

const filterProperties = require('../../utils/filterProperties')

const updatePatient = async(body) => {
    try {
        const {
            name,
            yearOfBirth,
            accTime
        } = body
        const {
            lat,
            long,
            detailAddress,
            district
        } = body
        const patientKeys = filterProperties({
            name,
            yearOfBirth
        })

        const timeKey = filterProperties({
            accTime
        })
        const pointKeys = filterProperties({
            lat,
            long,
            detailAddress,
            district
        })

        if (name) {
            const check = await Patient.findOne({ name })
            if (check) {
                throw {
                    path: 'updatePatient',
                    message: 'Lỗi đã tồn tại tên bệnh nhân này'
                }
            }
        }
        const patient = await getPatientById(body.patientId)
        const point = await findCurrentPoint(patient.currentLocation)
        const time = await getTimeById(patient.announcedTime)

        for (key in patientKeys) {
            patient[key] = patientKeys[key]
        }
        for (key in timeKey) {
            time['time'] = timeKey[key]
        }
        for (key in pointKeys) {
            point[key] = pointKeys[key]
        }

        console.log({ time, patient, point })

        const savedTime = await time.save()
        const savedPatient = await patient.save()
        const savedPoint = await point.save()

        return { savedTime, savedPatient, savedPoint }
    } catch (error) {
        throw {
            path: `controllers/router.patch.update.patient ${error.message}`,
            message: 'Lỗi không thể cập nhật bệnh nhân'
        }
    }
}

module.exports = {
    updatePatient
}