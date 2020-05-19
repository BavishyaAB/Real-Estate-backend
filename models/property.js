const mongoose = require('mongoose');

const PropertySchema = mongoose.Schema({
    type: String,
    place: String,
    value: String,
    area: String,
    owner: String,
    posted_on: String,
   })
const Property = module.exports = mongoose.model('Property', PropertySchema);