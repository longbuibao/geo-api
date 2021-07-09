const express = require('express')
const router = express.Router()
const geoJSON = require('geojson');

const { getAllPatientAndPoint } = require('../controllers/routers/ui/get-all-patient-point')
const { getAllPolygon } = require('../controllers/cachli/cachli.controller')

router.get('/home', async(req, res) => {
    try {
        const patients = await getAllPatientAndPoint()
        const polygons = await getAllPolygon()

        res.render('home', {
            patients,
            polygons,
            title: "Trang chủ"
        })
    } catch (error) {
        console.log(error)
    }
})


router.get('/lich-trinh-di-chuyen', async(req, res) => {
    try {
        const { name } = req.query
        const result = await lichTrinhDiChuyen(name)
        res.render('lich-trinh-di-chuyen', {
            result,
            title: "Lịch trình di chuyển"
        })
    } catch (error) {
        res.send(error)
    }
})

module.exports = router