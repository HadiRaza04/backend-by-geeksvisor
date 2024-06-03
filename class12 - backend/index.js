// ------------- Imports ------------- \\
const express = require('express');
const mongoose = require('mongoose')
const User = require("./model/User");
const Student = require('./model/Student');
const Teacher = require('./model/Teacher');
const Class = require('./model/Class');
const Subject = require('./model/Subjects');

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
app.delete('/user/:id', (req, res) => {
    try {
        const id = req.params.id;
        const user = User.findByIdAndDelete({ _id: id })
        if(!user) {
            return res.status(404).json({ error: "User not found "})
        }
        return res.status(200).json({ msg: "User deleted." })
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
app.delete('/student/:id', (req, res) => {
    try {
        const id = req.params.id;
        const student = Student.findByIdAndDelete( { _id: id } );
        if(!student) {
            return res.status(404).json({ error: "Student not found." })
        }
        return res.status(200).json({ msg: "Student deleted." })
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
app.put('/teacher/:id', async (req, res) => {
    try {
        const { name, email, department } = req.body;
        const id = req.params.id;
        if( !name || !email || !department ){
            return res.status(400).json({ error: "name or email or department are required" })
        }
        const updateTeacher = await Teacher.findOneAndUpdate( { _id: id }, { name, email, department }, { new: true } )
        return res.status(200).json(updateTeacher)
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
})
app.delete('/teacher/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const teacher = await Teacher.findOneAndDelete( { _id: id } );
        if(!teacher) {
            return res.status(404).json({error: "Student not found"})
        }
        return res.status(200).json( { msg: "Student deleted." } )
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
})

app.post('/class', async (req, res) => {
    try {
        const { classname, classnumber } = req.body;
        if(!classname || !classnumber) {
            return res.status(400).json({ error: "classname or classnumber not found" })
        }
        const classes = new Class( { className: classname, roomNumber: classnumber } );
        await classes.save();
        return res.status(201).json(classes);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
})
app.get('/class', async (req, res) => {
    try {
        const classes = await Class.find()
        if(!classes){
            return res.status(404).json({ error: "Classes not found."})
        }
        return res.status(200).json(classes);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
})
app.get('/class/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const oneClass = await Class.findById(id)
        if(!oneClass){
            return res.status(404).json({ error: "Class not found."})
        }
        return res.status(200).json(oneClass);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
})
app.put('/class/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const {classname, classnumber} = req.body;
        if( !classname || !classnumber ){
            return res.status(400).json({ error: "classname or classnumber are required" })
        }
        const updateClass = await Class.findOneAndUpdate( { _id: id }, { className: classname, roomNumber: classnumber }, { new: true } );
        return res.status(200).json(updateClass)
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
})
app.delete('/class/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteClass = await Class.findOneAndDelete( { _id: id } );
        if(!deleteClass) {
            return res.status(404).json({ error: "Class not found"})
        }
        return res.status(200).json({ msg: "Student deleted."})
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
})

app.post('/subject', async (req, res) => {
    try {
        const { subjectname } = req.body;
        if(!subjectname) {
            return res.status(400).json({ error: "Subjectname is required." })
        }
        const subject = new Subject({ subjectName: subjectname });
        await subject.save();
        return res.status(201).json(subject);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
})
app.get('/subjects', async(req, res) => {
    try {
        const subjects = await Subject.find();
        if(!subjects){
            return res.status(404).json({ error: "Subjects not found."})
        }
        return res.status(200).json(subjects);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
})
app.get('/subject', async (req, res) => {
    try {
        const subjectName = req.query.subjectname;
        const singleSubject = await Subject.findOne({subjectName});
        if(!singleSubject) {
            return res.status(404).json({ msg: "Subject not found."})
        }
        return res.status(200).json(singleSubject);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
})
app.get('/subjects/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const subject = await Subject.findById(id);
        if(!subject){
            return res.status(404).json({ error: "Subject not found."})
        }
        return res.status(200).json(subject);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
})
app.get('/subject/:subjectname', async (req, res) => {
    try {
        const subjectName = req.params.subjectname;
        const singleSubject = await Subject.findOne({subjectName});
        if(!singleSubject) {
            return res.status(404).json({ msg: "Subject not found."});
        }
        return res.status(200).json(singleSubject);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
})
app.put('/subjects/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const {subjectname} = req.body;
        if(!subjectname) {
            return res.status(400).json({ error: "SubjectName is required to update."});
        }
        const updateClass = await Subject.findOneAndUpdate({ _id: id }, { subjectName: subjectname }, { new: true });
        return res.status(200).json(updateClass);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
})
app.delete('/subjects/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteSubject = await Subject.findOneAndDelete({ _id: id });
        if(!deleteSubject) {
            return res.status(404).json({ error: "Subject not found"});
        }
        return res.status(200).json({ msg: "Student deleted."});
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
})

// ------------- Server listen ------------- \\
app.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}`)
})