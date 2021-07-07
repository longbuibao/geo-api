const CachLi = require('../../models/VungCachLi')
const { addPoint } = require('../points/points.controller')

const saveCachLi = async(body) => {
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
}

module.exports = {
    saveCachLi
}