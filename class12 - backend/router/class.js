const express = require('express');
const Class = require('../model/Class');
const classRouter = express.Router()

classRouter.post('/', async (req, res) => {
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
classRouter.get('/', async (req, res) => {
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
classRouter.get('/:id', async (req, res) => {
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
classRouter.put('/:id', async (req, res) => {
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
classRouter.delete('/:id', async (req, res) => {
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

module.exports = classRouter