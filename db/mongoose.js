const mongoose = require('mongoose')
const uri = process.env.mongo_uri
mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(res => console.log('Database: OK 👍'))
    .catch(e => console.log(e))