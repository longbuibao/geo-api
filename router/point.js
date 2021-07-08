const express = require('express')
const router = express.Router()
const { getAllPatientAndPoint } = require('../controllers/routers/ui/get-all-patient-point')
const { getPolygon } = require('../controllers/cachli/cachli.controller')
router.get('/api/get-all-patient-point', async(req, res) => {
    try {
        const patients = await getAllPatientAndPoint()
        res.status(200).send(patients)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/api/get-polygon', async(req, res) => {
    try {
        const polygon = await getPolygon()
        const points = await Promise.all(polygon.map(async(poly) => {
            const pointOfPoly = await poly.populate('boundaries').execPopulate()
            return pointOfPoly
        }))
        res.status(200).send(points)
    } catch (error) {
        res.status(400).send(error)
    }
})

// router.get('/', function(req, res) {
//     res.render('index', {
//         title: 'Trang chủ'
//     });
// })

router.get('/home', function(req, res) {
    res.render('home', {
        title: 'Covid'
    });
})



module.exports = router