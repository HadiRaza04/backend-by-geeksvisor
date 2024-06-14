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
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Database Connected."))
.catch(error => console.log(error))

// ------------- Routes ------------- \\
app.use('/class', classRouter);
app.use('/student', studentRouter);
app.use('/subject', subjectRouter);
app.use('/teacher', teacherRouter);
app.use('/user', userRouter);

// ------------- Error Handling ------------- \\
app.use((req, res, next) => {
    const error = new Error(`Not found: ${req.originalUrl}`);
    error.status = 404;
    next(error);
})
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        error: {
            message: err.message
        }
    });
});

// ------------- Server listen ------------- \\
app.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}`)
})