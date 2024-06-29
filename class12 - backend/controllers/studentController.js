const Student = require("../model/Student");

const postStudent = async (req, res) => {
    const { name, fname, age } = req.body;
    try {
        if(!name || !fname || !age) {
            return res.status(400).json({ error: "name or fname or age not found"});
        }
        const newStudent = new Student({name, fname, age});
        await newStudent.save()
        return res.status(201).json(newStudent);
    } catch (error) {
        return res.status(500).json({ error: "server error", details: error.message})
    }
}

const getStudents = async (req, res) => {
    try {
        const student = await Student.find()
        if(student.length === 0) {
            return res.json({ msg: "Student not found."})
        }
        return res.json(student);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage})
    }
}

const getByIdStudent = async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findById(id)
        if(!student) {
            return res.status(400).json({ error: "Student not found."})
        }
        return res.json(student);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage})
    }
}

const putStudent = async (req, res) => {
    const id = req.params.id;
    try {
        const { name, fname, age } = req.body;
        const student = await Student.findOneAndUpdate({ _id : id }, { name, fname, age }, { new: true })
        if(!student) {
            return res.status(400).json({ error: "Student not found."})
        }
        return res.json(student);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage})
    }
}

const deleteStudent = async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findByIdAndDelete( { _id: id } );
        if(!student) {
            return res.status(404).json({ error: "Student not found." })
        }
        return res.status(200).json({ msg: "Student deleted." })
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage})
    }
}

module.exports = { postStudent, getStudents, getByIdStudent, putStudent, deleteStudent }