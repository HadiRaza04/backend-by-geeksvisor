const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    className: String,
    roomNumber: Number,
})

const Class = mongoose.model("Class", classSchema)

module.exports = Class