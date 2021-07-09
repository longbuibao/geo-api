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

router.get('/statistic', async(req, res) => {
    res.render('statistic')
})

module.exports = router