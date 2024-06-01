const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    fname: String,
    age: Number,
})

const User = mongoose.model("User", userSchema)

module.exports = User