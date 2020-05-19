const express = require('express')
const app = express()
const cors = require('cors')

const bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:4200' }));

const PORT = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/realestate', { useNewUrlParser : true},(err)=>{
if (err) {
    console.log('connection error')
}
else {
    console.log('connected to mongodb')
}
})
const userRoute = require('./routes/user')
const propertyRoute = require('./routes/property')
app.use('/users', userRoute)
app.use('/property', propertyRoute)
app.listen(PORT, ()=>{
    console.log('Server started on port' + PORT)
})