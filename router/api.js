const express = require('express')
const router = express.Router()
const geoJSON = require('geojson');

const { getAllPatientAndPoint } = require('../controllers/routers/ui/get-all-patient-point')
const { getPolygon } = require('../controllers/cachli/cachli.controller')

router.get('/api/get-all-patient-current-point', async(req, res) => {
    try {
        const patients = await getAllPatientAndPoint()
        console.log(patients)
        const patientGeoJson = geoJSON.parse(
            patients, {
                Point: ['lat', 'long'],
                include: ['name', 'yearOfBirth', 'accTime', 'detailAdd']
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

module.exports = router