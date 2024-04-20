// const express = require("express")
// const mongoose = require('mongoose');
// const quotes = require("./quotes");
// const userRouter = require("./routes/userRouter");
// const noteRouter = require("./routes/noteRouter");


import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
const app = express();
const port = 3500;
app.use(express.json());

dotenv.config()
mongoose.connect("process.env.MONGODB_URI")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((error) => {
    console.error("Error in connection of MongoDB", error);
})

const Schema = mongoose.Schema;
const sampleSchema = new Schema({
    name: String,
    age: Number
});
const SampleModel = mongoose.model("SampleData", sampleSchema)


app.post("/myuser", (req, res) => {
    try {
        const {name, age} = req.body;
        const sample = new SampleModel({name, age});
        // console.log(sample);
        sample.save();
        res.status(201).json(sample);
    } catch (error) {
        console.log("Error creating sample", error);
        res.status(500).json({ error: 'Server error'});
    }
})

// app.get("/myuser", (req, res) => {
//     console.log("myuser get running");
//     try {
//         const samples = SampleModel.find();
//         // console.log({samples});
//         res.json(samples);
//     } catch (error) {
//         console.log(error);
//     }
// })


app.get('/', (req, res) => {
    res.send("/ route")
})
app.post('/data', (req, res) => {
    res.send("/data working")
    
})
app.listen(port, () => console.log(`Server listen on port ${port}`))



// app.use('/users', userRouter);
// app.use('/note', noteRouter);

// const sampleSchema = new mongoose.Schema({
//     name: String,
//     age: Number
// })
// const SampleModel = mongoose.model('Person', sampleSchema);

// mongoose.connect("mongodb://localhost:27017/user")
// .then(() => {
//     console.log("Database Connected");
// })
// .catch((err) => {
//     console.log("Error", err);
// })
                    

// app.get('/quote', (req, res) => {
//     res.status(200).json(quotes)
// })
// app.get("/random", (req, res) => {
//     let index = Math.floor(Math.random() * quotes.length);
//     let quote = quotes[index];
//     res.status(200).json(quote)
// })

