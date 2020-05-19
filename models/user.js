const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    password: String,
    email_id: String,
    contact: Number,
    addr: String,
    role: String
})
const User = module.exports = mongoose.model('User', UserSchema);