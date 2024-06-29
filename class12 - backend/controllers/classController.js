const Class = require("../model/Class")

const getClasses = async (req, res) => {
    try {
        const classes = await Class.find()
        if(classes.length === 0) {
            return res.status(404).json({message: "Classes not found."})
        }
        return res.status(200).json(classes)
    } catch (error) {
        return res.status(500).json({error: "Server error", details: error.message})
    }
}

const postClass = async (req, res) => {
    const { classname, classnumber } = req.body;
    try {
        if(!classname || !classnumber) {
            return res.status(400).json({ error: "classname or classnumber not found" })
        }
        const newClass = new Class({ className: classname, roomNumber: classnumber })
        await newClass.save()
        return res.status(201).json(newClass)
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
}

const getByIdClass = async (req, res) => {
    try {
        const id = req.params.id
        const getSingleClass = await Class.findById( id )
        if(!getSingleClass) {
            return res.status(404).json({message: "Class not found"})
        }
        return res.status(200).json(getSingleClass);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
} 

const putClass = async (req, res) => {
    const { classname, classnumber } = req.body;
    const id = req.params.id;
    try {
        if(!classname || !classnumber) {
            return res.status(404).json({message: "Classname or Classnumber is required."})
        }
        const updatedClass = await Class.findOneAndUpdate({ _id: id }, { className: classname, roomNumber: classnumber }, { new: true })
        return res.status(200).json(updatedClass)
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
}

const deleteClass = async (req, res) => {
    const id = req.params.id;
    try {
        const delClass = await Class.findOneAndDelete({ _id: id })
        if(!deleteClass) {
            return res.status(404).json({ error: "Class not found"})
        }
        return res.status(200).json({ msg: "Student deleted."})
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
}

module.exports = { getClasses, postClass, getByIdClass, putClass, deleteClass}