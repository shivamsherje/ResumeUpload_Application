const mongoose = require('mongoose')

const formSchema = mongoose.Schema({
    name: String,
    mobile: String,
    position: String,
    resume: String,
}, {
    versionKey: false
})

const formModel = mongoose.model('forms', formSchema)

module.exports = {
    formModel
}