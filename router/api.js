const express = require('express')
const router = express.Router()
const geoJSON = require('geojson');
const axios = require('axios')

const { getAllPatientAndPoint } = require('../controllers/routers/ui/get-all-patient-point')
const { getPolygon } = require('../controllers/cachli/cachli.controller')
const { lichTrinhDiChuyen } = require('../controllers/routers/ui/get-lich-trinh-di-chuyen')
const { getPhongToa } = require('../controllers/phongtoa/phongtoa.controller')

router.get('/api/get-all-patient-current-point', async(req, res) => {
    try {
        const patients = await getAllPatientAndPoint()
            // console.log(patients)
        const patientGeoJson = geoJSON.parse(
            patients, {
                Point: ['lat', 'long'],
                include: ['name', 'yearOfBirth', 'accTime', 'detailAdd', 'status', 'accTimeMili']
            }
        )
        res.status(200).send(patientGeoJson)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/api/get-polygon', async(req, res) => {
    try {
        const polygon = await getPolygon()
        const points = await Promise.all(polygon.map(async(poly) => {
            const pointOfPoly = await poly.populate('boundaries', '-_id -__v').execPopulate()
            return pointOfPoly
        }))

        const finalPoints = points.map((point) => {
            const longlat = point.boundaries.map(pnt => {
                return [pnt.long, pnt.lat]
            })
            return {
                name: point.name,
                longlat: [longlat]
            }
        })

        pointGeoJson = geoJSON.parse(
            finalPoints, {
                'Polygon': 'longlat'
            }
        )

        res.status(200).send(pointGeoJson)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/api/lich-trinh-di-chuyen', async(req, res) => {
    try {
        const { name } = req.query
        const result = await lichTrinhDiChuyen(name)
        const patientGeoJson = geoJSON.parse(
            result, {
                Point: ['lat', 'long'],
                include: ['name', 'patientName', 'happendAt', 'detailAdd']
            }
        )
        res.send(patientGeoJson)
    } catch (error) {
        res.send(error)
    }
})

router.get('/api/get-lockade-area', async(req, res) => {
    try {
        const result = await getPhongToa()
        const geoRes = geoJSON.parse(result, {
            Point: ['lat', 'long'],
            include: ['detailAddress', 'district', 'timeMili', 'timeUTC']
        })
        res.send(geoRes)
    } catch (error) {
        res.send(error)
    }

})

router.get('/api/get-all', async(req, res) => {
    const point = (await axios.get('http://localhost:3000/api/get-all-patient-current-point')).data
    const polygon = (await axios.get('http://localhost:3000/api/get-polygon')).data
    res.send({ point, polygon })
})

module.exports = router