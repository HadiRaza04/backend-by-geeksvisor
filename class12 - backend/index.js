// Imports
const express = require('express');
const mongoose = require('mongoose')
const User = require("./model/User")

// Instances
const app = express();
const PORT = process.env.PORT || 3500;

// Middlewares
app.use(express.json())

// Database Connection
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Database Connected.")
})
.catch((Error) => {
    console.log(Error);
})

// Routes
app.get('/user', (req, res) => {
    const getUser = User.find(User)
    console.log(getUser)
})

app.post('/user', async (req, res) => {
    try {
        const { name, fname, age } = req.body;
        const newUser = new User({ name, fname, age });
        await newUser.save()
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ "Error": error.message});
        
    }
})

app.put('/user/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
})


// Server listen
app.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}`)
})