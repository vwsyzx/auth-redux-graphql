const mongoose = require('mongoose')

const User = new mongoose.Schema({
    emile: {type: String, required: true},
    password: {type: String, required: true},
    userId: {type: String, required: true},
})

module.exports = mongoose.model('User', User)