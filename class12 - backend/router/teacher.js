const express = require('express');
const Teacher = require('../model/Teacher');
const teacherRouter = express.Router();

teacherRouter.post('/', async (req, res) => {
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
teacherRouter.get('/', async (req, res) => {
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
teacherRouter.get('/:id', async (req, res) => {
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
teacherRouter.put('/:id', async (req, res) => {
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
teacherRouter.delete('/:id', async (req, res) => {
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

module.exports = teacherRouter