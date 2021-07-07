const Status = require('../../models/Status')
const { saveTime, getTimeById } = require('../times/times.controller')


const saveStatus = async(status) => {
    try {
        const savedStatus = await (new Status(status)).save()
        return savedStatus._id
    } catch (error) {
        throw {
            message: `Không thể lưu trạng thái ${error.message}`,
            path: 'status.controller.js'
        }
    }
}

const filterProperties = require('../../utils/filterProperties')

const addStatus = async(patientId, data) => {
    try {

        console.log(data)
        const time = await saveTime(data.timeOfStatus)
        const stt = new Status({
            owner: patientId,
            nameOfStatus: data.nameOfStatus,
            timeOfStatus: time
        })
        await saveStatus(stt)
    } catch (error) {
        throw {
            message: `Không thể sửa trạng thái ${error.message}`,
            path: 'status.controller.js'
        }
    }
}

const updateStatus = async(sttId, data) => {
    const newProp = filterProperties(data)
    const status = await Status.findById(sttId)

    if (newProp.hasOwnProperty('timeOfStatus')) {
        const time = await getTimeById(status.timeOfStatus)
        console.log('timeee ', time)
        time['time'] = newProp['timeOfStatus']
        await time.save()
        console.log('timeee ', time)
        delete newProp.timeOfStatus
    }

    for (key in newProp) {
        status[key] = newProp[key]
    }

    await status.save()
}

const getAllStatusByOwner = async(patientId) => {
    try {
        return await Status.find({ owner: patientId })
    } catch (error) {
        throw {
            message: `Không thể lấy tất cả trạng thái ${error.message}`,
            path: 'status.controller.js'
        }
    }
}

const deleteStatus = async(id) => {
    try {
        const status = await Status.findById(id)
        await status.remove()
    } catch (error) {
        throw {
            message: `Không thể  xóa trạng thái ${error.message}`,
            path: 'status.controller.js'
        }
    }
}

module.exports = {
    saveStatus,
    addStatus,
    updateStatus,
    getAllStatusByOwner,
    deleteStatus
}