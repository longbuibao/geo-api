const CachLi = require('../../models/VungCachLi')
const { addPoint } = require('../points/points.controller')

const saveCachLi = async(body) => {
    try {
        const { tenVung } = body
        const points = JSON.parse(body.points)
        const pointId = []

        await Promise.all(points.map(async(point) => {
            const savedPoint = await addPoint({
                long: point[0],
                lat: point[1]

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
const getAllPolygon = async() => {
    try {
        const polygon = await getPolygon()
        const points = await Promise.all(polygon.map(async(poly) => {
            const pointOfPoly = await poly.populate('boundaries', '-_id -__v').execPopulate()
            return pointOfPoly
        }))

        const finalPolygons = points.map((point) => {
            const longlat = point.boundaries.map(pnt => {
                return [pnt.long, pnt.lat]
            })
            return {
                name: point.name,
                longlat: [longlat]
            }
        })

        return finalPolygons

    } catch (error) {
        throw {
            path: `controllers/ui/get-all-patient-point.js ${error.message}`,
            message: 'Lỗi không thể lấy tất cả vùng cách li'
        }
    }

}

module.exports = {
    saveCachLi,
    getPolygon,
    getAllPolygon
}