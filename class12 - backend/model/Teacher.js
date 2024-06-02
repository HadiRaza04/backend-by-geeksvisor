const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    department: {
        type: String,
        required: true
    }
})

const Teacher = mongoose.model("Teacher", teacherSchema)

module.exports = Teacher