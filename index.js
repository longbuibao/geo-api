const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
require('dotenv').config()


const app = express()
const adminRouter = require('./router/admin')

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(adminRouter)

app.listen(3000)