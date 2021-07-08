const CachLi = require('../../models/VungCachLi')
const { addPoint } = require('../points/points.controller')

const saveCachLi = async(body) => {
    try {
        const { tenVung } = body
        const points = JSON.parse(body.points)
        const pointId = []

        await Promise.all(points.map(async(point) => {
            const savedPoint = await addPoint({
                lat: point[1],
                long: point[0]
            })
            pointId.push(savedPoint)
        }))
        console.log(pointId)

        await (new CachLi({
            name: tenVung,
            boundaries: [...pointId]
        })).save()
    } catch (error) {
        throw {
            path: `controllers/cachli.controller.js ${error.message}`,
            message: 'Lỗi không thể lưu vùng cách li'
        }
    }

}

const getPolygon = async() => {
    try {
        const polygon = await CachLi.find({})
        return polygon
    } catch (error) {
        throw {
            path: `controllers/cachli.controller.js ${error.message}`,
            message: 'Lỗi không thể  lấy vùng cách li'
        }
    }

}

module.exports = {
    saveCachLi,
    getPolygon
}