// ------------- Imports ------------- \\
const express = require('express');
const mongoose = require('mongoose')
const teacherRouter = require('./router/teacher');
const userRouter = require('./router/user');
const studentRouter = require('./router/student');
const classRouter = require('./router/class');
const subjectRouter = require('./router/subject');

// ------------- Instances ------------- \\
const app = express();
const PORT = process.env.PORT || 3500;

// ------------- Middlewares ------------- \\
app.use(express.json())

// ------------- Database Connection ------------- \\
// mongoose.connect("mongodb://localhost:27017/HadiDB")
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Database Connected."))
.catch(error => console.log(error))

// ------------- Routes ------------- \\
app.use('/teacher', teacherRouter);
app.use('/user', userRouter);
app.use('/student', studentRouter);
app.use('/class', classRouter);
app.use('/subject', subjectRouter);

// ------------- Server listen ------------- \\
app.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}`)
})