const Point = require('../../models/Point')

const addPoint = async(bodyPoint) => {

    try {
        const point = await (new Point({
            ...bodyPoint
        })).save()

        return point._id
    } catch (error) {
        throw {
            path: `controllers/points.controller.js ${error.message}`,
            message: 'Lỗi không thể lưu point'
        }
    }

}

const findCurrentPoint = async(pointId) => {

    try {
        const point = await Point.findById(pointId)

        return point

    } catch (error) {
        throw {
            path: `controllers/points.controller.js ${error.message}`,
            message: 'Lỗi không thể tìm point'
        }
    }
}

module.exports = {
    addPoint,
    findCurrentPoint
}