const PhongToa = require('../../models/PhongToa')
const { addPoint } = require('../points/points.controller')
const { saveTime } = require('../times/times.controller')

const savePhongToa = async(body) => {
    try {
        const { isoLat, isoLong } = body
        const { detailAddress, district } = body
        const { time } = body

        console.log(time)

        const point = await addPoint({
            lat: isoLat,
            long: isoLong,
            detailAddress,
            district
        })

        const savedTime = await saveTime(time)

        await (new PhongToa({
            whereTo: point,
            time: savedTime
        })).save()

    } catch (error) {
        throw {
            path: `controllers/phongtoa.controller.js ${error.message}`,
            message: 'Lỗi không thể  lưu điểm phong tỏa'
        }
    }
}

module.exports = {
    savePhongToa
}