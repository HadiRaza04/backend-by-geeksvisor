const Subject = require("../model/Subjects");

const subjectPost = async (req, res) => {
    const { subjectname } = req.body;
    try {
        if(!subjectname) {
            return res.status(400).json({ error: "Subjectname is required." })
        }
        const subject = new Subject({ subjectName: subjectname });
        await subject.save();
        return res.status(201).json(subject);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
}

const getSubjects = async(req, res) => {
    try {
        const subjects = await Subject.find();
        if(subjects.length === 0){
            return res.json({ msg: "Subjects not found."})
        }
        return res.status(200).json(subjects);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
}

const getByIdSubject = async(req, res) => {
    const id = req.params.id;
    try {
        const subject = await Subject.findById(id);
        if(!subject){
            return res.status(404).json({ error: "Subject not found."})
        }
        return res.status(200).json(subject);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
}

const getBySubjectName = async (req, res) => {
    const subjectName = req.params.subjectname;
    try {
        const singleSubject = await Subject.findOne({subjectName});
        if(!singleSubject) {
            return res.status(404).json({ msg: "Subject not found."});
        }
        return res.status(200).json(singleSubject);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
}

const putSubject = async (req, res) => {
    const id = req.params.id;
    try {
        const {subjectname} = req.body;
        if(!subjectname) {
            return res.status(400).json({ error: "SubjectName is required to update."});
        }
        const updateClass = await Subject.findOneAndUpdate({ _id: id }, { subjectName: subjectname }, { new: true });
        return res.status(200).json(updateClass);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
}

const deleteSubject = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteSubject = await Subject.findOneAndDelete({ _id: id });
        if(!deleteSubject) {
            return res.status(404).json({ error: "Subject not found"});
        }
        return res.status(200).json({ msg: "Student deleted."});
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage});
    }
}

module.exports = { subjectPost, getSubjects, getByIdSubject, getBySubjectName, putSubject, deleteSubject }