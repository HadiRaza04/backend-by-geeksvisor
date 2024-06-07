const express = require('express');
const Student = require('../model/Student');
const studentRouter = express.Router();

studentRouter.post('/', async (req, res) => {
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
studentRouter.get('/', async (req, res) => {
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
studentRouter.get('/:id', async (req, res) => {
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
studentRouter.put('/:id', async (req, res) => {
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
studentRouter.delete('/:id', (req, res) => {
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

module.exports = studentRouter;