const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
}, {
    versionKey: false
})

const userModel = mongoose.model('users', userSchema)

module.exports = {
    userModel
}