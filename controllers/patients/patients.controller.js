const Patient = require('../../models/Patient')

const getPatientByName = async(name) => {
    const patient = await Patient.findOne({ name })

    if (patient) {
        return {
            patient,
            status: 200
        }
    } else
        throw {
            message: 'Không tìm thấý bệnh nhân này',
            nameOfPatient: name
        }
}

const savePatient = async(patient) => {

    try {
        const savedPatient = await (new Patient({
            ...patient
        })).save()
        return savedPatient._id
    } catch (error) {
        throw {
            path: `controllers/patients.controller.js ${error.message}`,
            message: 'Lỗi không thể lưu bệnh nhân'
        }
    }

}

const getAllPatient = async() => {
    try {
        return Patient.find({})
    } catch (error) {
        throw {
            path: `controllers/patients.controller.js ${error.message}`,
            message: 'Lỗi không thể tìm tất cả bệnh nhân'
        }
    }
}

const getPatientById = async(id) => {
    const patient = await Patient.findById(id)

    if (patient) {
        return patient
    } else
        throw {
            message: 'Không tìm thấý bệnh nhân này',
            idOfPatient: id
        }
}

const deletePatient = async(id) => {
    try {
        const patient = await getPatientById(id)
        await patient.remove()
    } catch (error) {
        throw {
            message: `Không thể xóa bệnh nhân ${error.message}`,
            idOfPatient: id
        }
    }
}

const getDetailPatient = async(id) => {
    const patient = await getPatientById(id)
    await patient.populate({ path: 'pa_sa' }).execPopulate()
    const patientStatus = patient.pa_sa

    await Promise.all(patientStatus.map(async(stt) => {
        await stt.populate({
            path: 'timeOfStatus'
        }).execPopulate()
    }))

    patientStatus.sort(function(a, b) {
        return new Date(b.timeOfStatus.time) - new Date(a.timeOfStatus.time);
    })

    return { status: patientStatus[0], patient }
}

module.exports = {
    getPatientByName,
    savePatient,
    getAllPatient,
    getPatientById,
    deletePatient,
    getDetailPatient
}