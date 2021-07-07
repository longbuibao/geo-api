const Status = require('../../models/Status')

const saveStatus = async(status) => {
    try {
        const savedStatus = await (new Status(status)).save()
        console.log(status)
        return savedStatus._id
    } catch (error) {
        throw {
            message: `Không thể lưu trạng thái ${error}`,
            path: 'status.controller.js'
        }
    }
}

module.exports = {
    saveStatus
}