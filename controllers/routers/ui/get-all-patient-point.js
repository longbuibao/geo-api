const { getAllPatient } = require('../../patients/patients.controller')

const getAllPatientAndPoint = async() => {
    try {
        const patients = await getAllPatient()
        await Promise.all(patients.map(async(patient) => {
            await patient.populate('currentLocation').execPopulate()
        }))
        return patients
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