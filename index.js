const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
const cors = require('cors')
require('dotenv').config()


const app = express()
const adminRouter = require('./router/admin')
const api = require('./router/api')

app.use(cors())

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(adminRouter)
app.use(api)


app.listen(3000)