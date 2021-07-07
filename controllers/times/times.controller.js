const Time = require('../../models/Time')

const saveTime = async(timeString) => {
    try {
        const savedTime = await (new Time({ time: timeString })).save()
        return savedTime._id
    } catch (error) {
        if (error) {
            throw {
                path: `controllers/time.controller.js ${error.message}`,
                message: 'Lỗi không thể lưu thời gian'
            }
        }
    }

}

const getTimeById = async(id) => {
    try {
        return Time.findById(id)
    } catch (error) {
        throw {
            path: `controllers/time.controller.js ${error.message}`,
            message: 'Lỗi không thể tìm thời gian bằng id'
        }
    }
}

module.exports = {
    saveTime,
    getTimeById
}