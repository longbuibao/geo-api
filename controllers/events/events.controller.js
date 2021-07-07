const Event = require('../../models/Event')

const addEvent = async(body) => {
    try {
        const event = await (new Event({
            ...body
        })).save()

        return event._id
    } catch (error) {
        throw {
            path: `controllers/event.controller.js ${error.message}`,
            message: 'Lỗi không thể lưu event'
        }
    }

}

module.exports = {
    addEvent
}