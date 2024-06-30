const Teacher = require("../model/Teacher");

const postTeacher = async (req, res) => {
    const { name, email, department } = req.body;
    try {
        if(!name || !email || !department) {
            return res.status(400).json({message: "Name, email or Department missing"})
        }
        const newTeacher = new Teacher({name, email, department})
        await newTeacher.save()
        return res.status(201).json(newTeacher);
    } catch (error) {
        return res.status(500).json({error: "Server Error", details: error.meassge})
    }
}

const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find()
        if(teachers.length === 0) {
            return res.json({ message: "Teachers not found"});
        }
        return res.status(200).json(teachers);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
}

const getByIdTeacher = async (req, res) => {
    const id = req.params.id;
    try {
        const singleTeacher = await Teacher.findById(id)
        if(!singleTeacher) {
            return res.status(404).json({message: "Teacher not Found."})
        }
        return res.status(200).json(singleTeacher)
    } catch (error) {
        return res.status(500).json({error: "Server error.", details: error.message})
    }
}

const putTeacher = async (req, res) => {
    const { name, email, department } = req.body;
    try {
        const id = req.params.id;
        if( !name || !email || !department ){
            return res.status(400).json({ error: "name or email or department are required" })
        }
        const updateTeacher = await Teacher.findOneAndUpdate( { _id: id }, { name, email, department }, { new: true } )
        return res.status(200).json(updateTeacher)
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
}

const deleteTeacher = async (req, res) => {
    const id = req.params.id;
    try {
        const teacher = await Teacher.findOneAndDelete( { _id: id } );
        if(!teacher) {
            return res.status(404).json({error: "Student not found"})
        }
        return res.status(200).json( { msg: "Student deleted." } )
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
}

module.exports = { postTeacher, getTeachers, getByIdTeacher, putTeacher, deleteTeacher }