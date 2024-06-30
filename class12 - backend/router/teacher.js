const express = require('express');
const Teacher = require('../model/Teacher');
const { postTeacher, getTeachers, getByIdTeacher } = require('../controllers/teacherController');
const teacherRouter = express.Router();

teacherRouter.post('/', postTeacher)

teacherRouter.get('/', getTeachers)

teacherRouter.get('/:id', getByIdTeacher)

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