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

const getPhongToa = async() => {
    try {
        const allPhongToa = await PhongToa.find({})
        const pToaPopulate = await Promise.all(
            allPhongToa.map(async(pt) => {
                return await pt.populate('whereTo').populate('time').execPopulate()
            })
        )
        const ptObject = pToaPopulate.map(pt => {
            return pt.toObject()
        })

        const result = ptObject.map(pt => {
            const timeMili = new Date(pt.time.time).getTime()
            const timeUTC = new Date(pt.time.time).toLocaleString()
            pt.long = pt.whereTo.long
            pt.lat = pt.whereTo.lat
            pt.detailAddress = pt.whereTo.detailAddress
            pt.district = pt.whereTo.district
            pt.timeMili = timeMili
            pt.timeUTC = timeUTC
            return pt
        })

        return result
    } catch (error) {
        throw {
            path: `controllers/phongtoa.controller.js ${error.message}`,
            message: 'Lỗi không lấy điểm phong tỏa'
        }
    }

}

module.exports = {
    savePhongToa,
    getPhongToa
}