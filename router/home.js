const express = require('express')
const router = express.Router()
const geoJSON = require('geojson');

const { getAllPatientAndPoint } = require('../controllers/routers/ui/get-all-patient-point')
const { getPolygon } = require('../controllers/cachli/cachli.controller')


router.get('/home', async(req, res) => {
    try {
        const patients = await getAllPatientAndPoint()
        res.render('home', {
            patients,
            title: "Trang chủ"
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router