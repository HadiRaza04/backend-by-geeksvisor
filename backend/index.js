const express = require("express")
const mongoose = require('mongoose');
const quotes = require("./quotes");
const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter");
const dotenv = require("dotenv");

const app = express();
app.use('/users', userRouter);
app.use('/note', noteRouter);
dotenv.config();

// const sampleSchema = new mongoose.Schema({
//     name: String,
//     age: Number
// })
// const SampleModel = mongoose.model('Person', sampleSchema);

mongoose.connect("mongodb://localhost:27017/user")
.then(() => {
    console.log("Database Connected");
})
.catch((err) => {
    console.log("Error", err);
})



app.post("/mydata", (req, res) => {
    const { myname, myage} = req.body;
    console.log(myname);
    console.log(myage);
    
})
                    
                    
app.get('/', (req, res) => {
    res.send("/ route")
})
app.get('/quote', (req, res) => {
    res.status(200).json(quotes)
})
app.get("/random", (req, res) => {
    let index = Math.floor(Math.random() * quotes.length);
    let quote = quotes[index];
    res.status(200).json(quote)
})

app.listen(3000, () => {
    console.log("Server listen on port 3000");
})