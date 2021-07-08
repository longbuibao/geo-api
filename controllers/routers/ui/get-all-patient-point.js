const { getAllPatient } = require('../../patients/patients.controller')

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

        const finalPatients = patientsArray.map(patient => {
            const time = new Date(patient.announcedTime.time).toLocaleString()
            patient.long = patient.currentLocation.long
            patient.lat = patient.currentLocation.lat
            patient.detailAdd = patient.currentLocation.detailAddress
            patient.accTime = time
            return patient
        })

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