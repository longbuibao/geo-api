require('./db/mongoose')
const Patient = require('./models/Patient')
const Mongoose = require('mongoose')
const Event = require('./models/Event')
const Point = require('./models/Point')

const arr = []

for (let index = 0; index < 500; index++) {
    arr.push(index)
}

function shuffle(array) {
    var currentIndex = array.length,
        randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}
shuffle(arr);
// console.log(arr.indexOf(0))
Point.find({}).then(async(points) => {
    Patient.find({}).then(async(patiens) => {
        let count = 0
        for (let i = 0; i < arr.length; i += 5) {
            for (let z = i; z < i + 5; z++) {
                points[arr[z]].owner = patiens[count]._id
                await points[arr[z]].save()
            }
            count++
        }
    })
})

// Point.find({}).then((points) => {
//     points.forEach(point => {
//         if (point.owner) {
//             point.owner = undefined
//             point.save()
//         }

//     })
// })