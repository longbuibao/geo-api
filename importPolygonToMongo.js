const obj = require('./script/locationjson')
const Polygon = require('./models/Polygon')
require('./db/mongoose')

for (const key in obj) {
    let poly = {...obj[key], name: key }
    let polygon = new Polygon(poly)
    polygon.save()
}