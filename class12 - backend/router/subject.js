const express = require('express');
const { subjectPost, getSubjects, getByIdSubject, getBySubjectName, putSubject, deleteSubject } = require('../controllers/subjectController');
const Subject = require('../model/Subjects');
const subjectRouter = express.Router();

subjectRouter.post('/', subjectPost)

subjectRouter.get('/', getSubjects)

subjectRouter.get('/:id', getByIdSubject)

subjectRouter.get('/:subjectname', getBySubjectName)

subjectRouter.put('/:id', putSubject)

subjectRouter.delete('/:id', deleteSubject)

module.exports = subjectRouter;