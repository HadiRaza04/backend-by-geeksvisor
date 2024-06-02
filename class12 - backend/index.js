// ------------- Imports ------------- \\
const express = require('express');
const mongoose = require('mongoose')
const User = require("./model/User");
const Student = require('./model/Student');
const Teacher = require('./model/Teacher');

// ------------- Instances ------------- \\
const app = express();
const PORT = process.env.PORT || 3500;

// ------------- Middlewares ------------- \\
app.use(express.json())


// ------------- Database Connection ------------- \\
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Database Connected.")
})
.catch((Error) => {
    console.log(Error);
})

// ------------- Routes ------------- \\
app.post('/user', async (req, res) => {
    try {
        const { name, fname, age } = req.body;
        if(!name || !fname || !age) {
            return res.status(400).json({error: "bad request", details: "Missing name or fname or age."})
        }
        const newUser = new User({ name, fname, age });
        await newUser.save()
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(400).json({ "Error": error.message});
        
    }
})
app.get('/user', async (req, res) => {
    try {
        const users = await User.find()
        if(!users){
            return res.status(400).json({ msg: "Students not found" })
        }
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json({ Error: error.message});
    }
})
app.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id)
        if(!user){
            return res.status(400).json({ msg: "Student not found" })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ Error: error.message});
    }
})
app.put('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, fname, age } = req.body;
        const user = await User.findOneAndUpdate({ _id : id }, { name, fname, age }, { new: true })
        if(!user) {
            return res.status(400).json({ error: "User not found."})
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage})
    }
})

app.post('/student', async (req, res) => {
    try {
        const { name, fname, age } = req.body;
        if(!name || !fname || !age) {
            return res.status(400).json({ error: "name or fname or age not found"});
        }
        const newStudent = new Student({name, fname, age});
        await newStudent.save()
        return res.status(201).json(newStudent);
    } catch (error) {
        return res.status(500).json({ error: "server error", details: error.message})
    }
})
app.get('/student', async (req, res) => {
    try {
        const student = await Student.find()
        if(!student) {
            return res.status(400).json({ error: "Student not found."})
        }
        return res.json(student);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage})
    }
})
app.get('/student/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const student = await Student.findById(id)
        if(!student) {
            return res.status(400).json({ error: "Student not found."})
        }
        return res.json(student);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage})
    }
})
app.put('/student/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, fname, age } = req.body;

        const student = await Student.findOneAndUpdate({ _id : id }, { name, fname, age }, { new: true })
        if(!student) {
            return res.status(400).json({ error: "Student not found."})
        }
        return res.json(student);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage})
    }
})

app.post('/teacher', async (req, res) => {
    try {
        const { name, email, department } = req.body;
        if(!name || !email || !department) {
            return res.status(400).json({ error: "name or email or department not found"})
        }
        const teacher = new Teacher({name, email, department});
        await teacher.save();
        return res.status(201).json(teacher);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
})
app.get('/teacher', async (req, res) => {
    try {
        const teachers = await Teacher.find()
        if(!teachers) {
            return res.status(400).json({ error: "Teacher not found"});
        }
        return res.status(200).json(teachers);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
})
app.get('/teacher/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const teacher = await Teacher.findById(id);
        if(!teacher) {
            return res.status(400).json({ error: "Teacher not found"});
        }
        return res.status(200).json(teacher);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
})


// ------------- Server listen ------------- \\
app.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}`)
})