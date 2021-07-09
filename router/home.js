const express = require('express')
const router = express.Router()
const geoJSON = require('geojson');

const { getAllPatientAndPoint } = require('../controllers/routers/ui/get-all-patient-point')
const { getAllPolygon } = require('../controllers/cachli/cachli.controller')

router.get('/', async(req, res) => {
    try {
        const patients = await getAllPatientAndPoint()
        const polygons = await getAllPolygon()

        res.render('home', {
            patients,
            polygons,
            title: "GreenMask | Trang chủ"
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/dien-bien', async(req, res) => {
    try {
        const patients = await getAllPatientAndPoint()
        const polygons = await getAllPolygon()

        res.render('timeslider', {
            patients,
            polygons,
            title: "GreenMask | Diễn biến"
        })
    } catch (error) {
        console.log(error)
    }
})

<<<<<<< HEAD

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
=======
router.get('/statistic', async(req, res) => {
    res.render('statistic')
>>>>>>> 148202ee1a167ea43aca0a3a3f774394ca2fd0cd
})

module.exports = router