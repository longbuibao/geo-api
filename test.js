const Time = require('./models/Time')

async function getTime() {
    const times = await Time.find({})
    return times
}
require('./db/mongoose')

Time.find({}).then((data) => {
    console.log(typeof data)
})