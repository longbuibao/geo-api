const express = require('express')
const router = express.Router()
require('../db/mongoose')
const {
    addPatient
} = require('../controllers/routers/router.post.add.patient')

const {
    allStatus
} = require('../controllers/routers/router.get.patient.status')

const {
    updatePatient
} = require('../controllers/routers/router.patch.update.patient')

const {
    getPatientByName,
    getAllPatient,
    deletePatient,
    getDetailPatient
} = require('../controllers/patients/patients.controller')

const {
    addEventToPatient
} = require('../controllers/routers/router.post.add.event')

const {
    addStatus,
    deleteStatus,
    updateStatus
} = require('../controllers/status/status.controller')

const {
    savePhongToa
} = require('../controllers/phongtoa/phongtoa.controller')

const {
    saveCachLi,
    getPolygon
} = require('../controllers/cachli/cachli.controller')


router.get('/get-patient', (req, res) => {
    res.render('get-patient', {
        title: "Bệnh nhân"
    })
})

router.post('/get-patient', async(req, res) => {
    try {

        const patient = await getPatientByName(req.body.name)
        if (patient.status === 200) {
            res.redirect(`/add-event/?name=${patient.patient.name}`)
        }

    } catch (error) {
        return res.render('add-patient', {
            title: "Bệnh nhân",
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
        res.redirect('/add-event/?name=${patient.patient.name}')

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
        data: { name },
        title: "Bệnh nhân"
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
        res.render('list-of-patients', {
            patients,
            title: "Danh sách bệnh nhân"
        })
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
    res.render('update-patient', {
        id,
        name,
        title: "Cập nhật bệnh nhân"
    })
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
    const id = req.query.id
    console.log(id)
    try {
        const result = await getDetailPatient(id)
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send({
            message: {
                path: '/get-detail-patient',
                text: error.message
            }
        })
    }
})

router.get('/add-patient-status', (req, res) => {
    const id = req.query.id
    const name = req.query.name
    res.render('add-patient-status', {
        id,
        name,
        title: "Bệnh nhân"
    })
})

router.post('/add-patient-status', async(req, res) => {
    try {

        const { id, name } = req.query
        await addStatus(id, req.body)
        res.redirect(`/all-patient-status/?id=${id}&name=${name}`)

    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/all-patient-status', async(req, res) => {
    try {
        const { id, name } = req.query
        const status = await allStatus(req.query)
        res.render('list-all-status', { id, name, status, title: "Bệnh nhân" })
    } catch (error) {
        console.log(error)
    }

})

router.delete('/delete-status', async(req, res) => {
    try {
        const sttId = req.query.statusId
        await deleteStatus(sttId)
        res.send()
    } catch (error) {
        res.status(400).send('Không thể xóa status')
    }
})

router.get('/edit-status', async(req, res) => {
    const { patientId, patientName, id } = req.query
    res.render('edit-patient-status', {
        id: patientId,
        name: patientName,
        sttId: id,
        title: "Bệnh nhân"
    })
})

router.post('/edit-patient-status', async(req, res) => {
    try {
        const { id, patientId, paName } = req.query
        console.log(req.query)
        const { nameOfStatus, timeOfStatus } = req.body
        await updateStatus(id, { nameOfStatus, timeOfStatus })
        res.redirect(`/all-patient-status/?id=${patientId}&name=${paName}`)
    } catch (error) {
        console.log(error)
    }

})

router.get('/add-lockade-area', (req, res) => {
    res.render('add-lockade-area', {
        title: "Điểm phong tỏa"
    })
})

router.post('/add-lockade-area', async(req, res) => {
    try {
        await savePhongToa(req.body)
        res.redirect('/add-lockade-area')
    } catch (error) {
        res.status(400).send({
            message: 'Lỗi không thể lưu khu phong tỏa'
        })
    }
})

router.get('/add-isolation-zone', (_, res) => {
    res.render('add-isolation-zone', {
        title: "Khu vực phong tỏa"
    })
})

router.post('/add-isolation-zone', async(req, res) => {
    await saveCachLi(req.body)
    res.redirect('/add-isolation-zone');
})

router.get('/polygon', async(req, res) => {
    const name = req.query.name
    const polygon = await getPolygon(name)
    res.send(polygon)
})

module.exports = router