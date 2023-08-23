const mongoose = require('mongoose')

const Token = new mongoose.Schema({
    refreshToken: {type: String, required: true},
    userId: {type: String, required: true}
})

module.exports = mongoose.model('Token', Token)