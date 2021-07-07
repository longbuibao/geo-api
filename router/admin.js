const express = require('express')
const router = express.Router()
require('../db/mongoose')
const {
    addPatient
} = require('../controllers/routers/router.post.add.patient')

const {
    updatePatient
} = require('../controllers/routers/router.patch.update.patient')

const {
    getPatientByName,
    getAllPatient,
    deletePatient
} = require('../controllers/patients/patients.controller')

const {
    addEventToPatient
} = require('../controllers/routers/router.post.add.event')

const Patient = require('../models/Patient')
const Point = require('../models/Point')
const Disease = require('../models/Disease')
const Event = require('../models/Event')
const mongoose = require('mongoose')
const Time = require('../models/Time')
const Status = require('../models/Status')
const PhongToa = require('../models/PhongToa')
const CachLi = require('../models/VungCachLi')

router.get('/get-patient', (req, res) => {
    res.render('get-patient')
})

router.post('/get-patient', async(req, res) => {
    try {

        const patient = await getPatientByName(req.body.name)
        if (patient.status === 200) {
            res.redirect(`/add-event/?name=${patient.patient.name}`)
        }

    } catch (error) {
        return res.render('add-patient', {
            data: {
                isFound: false,
                nameValue: error.nameOfPatient,
                message: error.message
            }
        })
    }

})

router.post('/add-patient', async(req, res) => {

    try {

        const result = await addPatient(req.body)
        console.log(result)
        res.redirect('/get-patient')

    } catch (error) {
        res.status(500).send({
            message: {
                path: '/add-patient',
                error: error.message
            }
        })
    }

})

router.get('/add-event', async(req, res) => {
    const name = req.query.name
    res.render('add-event', {
        data: { name }
    })
})

router.post('/add-event', async(req, res) => {

    try {
        await addEventToPatient(req.body)
        res.redirect('/get-patient')
    } catch (error) {
        res.status(500).send({
            message: {
                path: '/add-event',
                text: error.message
            }
        })
    }
})

router.get('/patient-list-update', async(req, res) => {
    try {
        const patients = await getAllPatient()
        res.render('list-of-patients', { patients })
    } catch (error) {
        res.status(500).send({
            message: {
                path: '/patient-list-update',
                text: error.message
            }
        })
    }

})

router.get('/update-patient', (req, res) => {
    const { id, name } = req.query
    res.render('update-patient', { id, name })
})

router.patch('/update-patient', async(req, res) => {
    try {
        req.body.patientId = req.query.id
        await updatePatient(req.body)
        res.redirect('/patient-list-update')
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/delete-patient', async(req, res) => {
    try {
        console.log(req.query.patientId)
        await deletePatient(req.query.patientId)
        res.status(200).send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/get-detail-patient', async(req, res) => {
    res.render('get-detail-patient')
})

router.post('/get-detail-patient', async(req, res) => {
    try {
        const patient = await Patient.findOne({ name: req.body.name })
        const events = await Event.find({ owner: new mongoose.Types.ObjectId(patient._id) })
        const currentLocation = await Point.findById(patient.currentLocation)
        const disease = await Disease.findById(patient.hasDisease)

        res.send({
            patient,
            events,
            currentLocation,
            disease
        })
    } catch (error) {
        res.status(500).send({
            message: {
                path: '/get-detail-patient',
                text: error.message
            }
        })
    }
})

router.get('/add-lockade-area', (req, res) => {
    res.render('add-lockade-area')
})

router.post('/add-lockade-area', async(req, res) => {
    const { isoLat, isoLong } = req.body
    const { detailAddress, district } = req.body
    const { time } = req.body
    console.log(isoLat, isoLong, detailAddress, district)
    const point = await (new Point({
        lat: isoLat,
        long: isoLong,
        detailAddress,
        district
    })).save()

    const savedTime = await (new Time({ time })).save()

    await (new PhongToa({
        whereTo: point._id,
        time: savedTime._id
    })).save()

    res.redirect('/')

})

router.get('/add-isolation-zone', (_, res) => {
    res.render('add-isolation-zone')
})

router.post('/add-isolation-zone', async(req, res) => {
    const { tenVung } = req.body
    const points = JSON.parse(req.body.points)
    const pointId = []

    points.forEach(async(point, index) => {
        const savedPoint = await (new Point({
            lat: point[1],
            long: point[0]
        })).save()

        pointId.push(savedPoint._id)

        if (index === points.length - 1) {
            console.log(pointId)
            await (new CachLi({
                name: tenVung,
                boundaries: [...pointId]
            })).save()
        }
    })
    res.redirect('/')
})

module.exports = router