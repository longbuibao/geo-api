const express = require('express')
const router = express.Router()
require('../db/mongoose')
const Patient = require('../models/Patient')
const Point = require('../models/Point')
const Disease = require('../models/Disease')

router.get('/get-patient', (req, res) => {
    res.render('get-patient')
})

router.post('/get-patient', async(req, res) => {
    const patient = await Patient.findOne({ name: req.body.name })
    if (patient) {
        return res.render('add-patient', { data: { isFound: true } })
    } else {
        return res.render('add-patient', { data: { isFound: false, nameValue: req.body.name } })
    }
})

router.post('/add-patient', async(req, res) => {
    const { lat, long, detailAddress, district, name, yearOfBirth, status } = req.body
    const bodyPoint = {
        lat,
        long,
        detailAddress,
        district
    }
    const bodyPatient = {
        name,
        yearOfBirth,
        status
    }

    console.log(bodyPatient, bodyPoint)

    const disease = await Disease.findOne({ name: 'SARS-CoV-2' })
    const point = await (new Point(bodyPoint)).save()
    const patient = new Patient(bodyPatient)
    patient['currentLocation'] = point._id
    patient['hasDisease'] = disease._id

    await patient.save()
    res.send("OK")
})

// router.get('/add-patient-current-location', (req, res) => {
//     res.render('add-patient-current-location')
// })

// router.post('/add-patient-current-location', (req, res) => {
//     res.render('add-patient-current-location')
// })

module.exports = router