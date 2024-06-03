const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    subjectName: String,
})

const Subject = mongoose.model("Subject", subjectSchema)

module.exports = Subject