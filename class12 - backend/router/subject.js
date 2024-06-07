const express = require('express');
const Subject = require('../model/Subjects');
const subjectRouter = express.Router();

subjectRouter.post('/', async (req, res) => {
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
subjectRouter.get('/', async(req, res) => {
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
// subjectRouter.get('/subject', async (req, res) => {
//     try {
//         const subjectName = req.query.subjectname;
//         const singleSubject = await Subject.findOne({subjectName});
//         if(!singleSubject) {
//             return res.status(404).json({ msg: "Subject not found."})
//         }
//         return res.status(200).json(singleSubject);
//     } catch (error) {
//         return res.status(500).json({ error: "Server error", details: error.massage});
//     }
// })
subjectRouter.get('/:id', async(req, res) => {
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
subjectRouter.get('/:subjectname', async (req, res) => {
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
subjectRouter.put('/:id', async (req, res) => {
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
subjectRouter.delete('/:id', async (req, res) => {
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

module.exports = subjectRouter;