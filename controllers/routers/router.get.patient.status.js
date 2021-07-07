const { getAllStatusByOwner } = require('../status/status.controller')

const allStatus = async(body) => {
    try {
        const { id } = body
        const status = await getAllStatusByOwner(id)

        await Promise.all(status.map(async(stt) => {
            await stt.populate('timeOfStatus').execPopulate()
        }))

        return status
    } catch (error) {
        throw {
            path: `controllers/router.get.patient.status ${error.message}`,
            message: 'Lỗi không thể lấy status của bệnh nhân'
        }
    }
}
module.exports = {
    allStatus
}