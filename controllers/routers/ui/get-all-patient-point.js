const { getAllPatient } = require('../../patients/patients.controller')
const { getDetailPatient } = require('../../patients/patients.controller')

const getAllPatientAndPoint = async() => {
    try {
        const patients = await getAllPatient()
        await Promise.all(patients.map(async(patient) => {
            await patient
                .populate({
                    path: 'currentLocation'
                })
                .populate({
                    path: 'announcedTime'
                })
                .execPopulate()
        }))

        const patientsArray = patients.map(patient => {
            return patient.toObject()
        })

        const finalPatients = Promise.all(patientsArray.map(async(patient) => {
            const timeByMiliSec = new Date(patient.announcedTime.time).getTime()
            const time = new Date(patient.announcedTime.time).toLocaleString()
            patient.long = patient.currentLocation.long
            patient.lat = patient.currentLocation.lat
            patient.detailAdd = patient.currentLocation.detailAddress
            patient.accTime = time
            patient.accTimeMili = timeByMiliSec
            const status = await getDetailPatient(patient._id)
            patient.status = status.status.nameOfStatus
            return patient
        }))

        return finalPatients

    } catch (error) {
        throw {
            path: `controllers/ui/get-all-patient-point.js ${error.message}`,
            message: 'Lỗi không thể lấy tất cả bệnh nhân'
        }
    }
}

module.exports = {
    getAllPatientAndPoint
}