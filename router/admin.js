const express = require('express')
const router = express.Router()
require('../db/mongoose')
const Patient = require('../models/Patient')
const Point = require('../models/Point')
const Disease = require('../models/Disease')
const Event = require('../models/Event')
const mongoose = require('mongoose')
const Time = require('../models/Time')


router.get('/get-patient', (req, res) => {
    res.render('get-patient')
})

router.post('/get-patient', async(req, res) => {
    const patient = await Patient.findOne({ name: req.body.name })

    if (patient) {
        res.redirect(`/add-event/?name=${patient.name}`)
    } else {
        return res.render('add-patient', {
            data: {
                isFound: false,
                nameValue: req.body.name
            }
        })
    }
})

router.post('/add-patient', async(req, res) => {
    const {
        lat,
        long,
        detailAddress,
        district,
        name,
        yearOfBirth,
        status
    } = req.body

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

    const disease = await Disease.findOne({ name: 'SARS-CoV-2' })
    const point = await (new Point(bodyPoint)).save()
    const patient = new Patient(bodyPatient)
    patient['currentLocation'] = point._id
    patient['hasDisease'] = disease._id

    await patient.save()

    res.redirect('/get-patient')
})

router.get('/add-event', async(req, res) => {
    const name = req.query.name
    res.render('add-event', {
        data: { name }
    })
})

router.post('/add-event', async(req, res) => {

    const { time } = req.body
    const { latEvent, longEvent, addressEvent, districtEvent, nameEvent } = req.body
    const { name } = req.body

    const checkPatient = await Patient.findOne({ name })


    if (checkPatient) {
        const patientId = checkPatient._id
        const bodyTime = (new Date(time)).toISOString()
        const savedTime = await (new Time({ time: bodyTime })).save()
        const savedLocation = await (new Point({
            lat: latEvent,
            long: longEvent,
            detailAddress: addressEvent,
            district: districtEvent
        })).save()

        const savedEvent = await (new Event({
            name: nameEvent,
            time: savedTime._id,
            owner: patientId,
            location: savedLocation._id
        })).save()
    }

    res.redirect('/get-patient')
})

router.get('/update-patient', async(req, res) => {
    res.render('update-patient')
})

router.patch('/update-patient', async(req, res) => {
    const { name } = req.body
    const { yearOfBirth, status } = req.body
    const { lat, long, detailAddress, district } = req.body
    try {
        const patient = await Patient.findOne({ name })
        if (!patient) {
            return res.render('not-found-this-patient')
        }

        const point = await Point.findById(patient.currentLocation)

        console.log(yearOfBirth)

        patient['yearOfBirth'] = yearOfBirth || patient['yearOfBirth']
        patient['status'] = status || patient['status']

        await patient.save()

        point['lat'] = lat || point['lat']
        point['long'] = long || point['long']
        point['detailAddress'] = detailAddress || point['detailAddress']
        point['district'] = district || point['district']

        await point.save()

        res.render('updated-patient')

    } catch (error) {
        res.send({
            error: 'Something wrong in admin.js from router.patch(/update-patient), is database connected?'
        })
    }

})

router.get('/delete-patient', (req, res) => {
    res.render('get-patient-to-delete')
})

router.delete('/delete-patient', async(req, res) => {
    const { name } = req.body
    try {
        const patient = await Patient.findOne({ name })
        if (!patient) {
            return res.render('not-found-this-patient')
        }
        await patient.remove()
        res.send({
            message: 'Deleted'
        })
    } catch (error) {
        res.send({
            error: 'Something wrong in admin.js from router.delete(/delete-patient), is database connected?'
        })
    }
})

router.get('/get-detail-patient', async(req, res) => {
    res.render('get-detail-patient')
})

router.post('/get-detail-patient', async(req, res) => {
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
})

module.exports = router