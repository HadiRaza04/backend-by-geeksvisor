const express = require('express');
const { postTeacher, getTeachers, getByIdTeacher, putTeacher, deleteTeacher } = require('../controllers/teacherController');
const teacherRouter = express.Router();

teacherRouter.post('/', postTeacher)

teacherRouter.get('/', getTeachers)

teacherRouter.get('/:id', getByIdTeacher)

teacherRouter.put('/:id', putTeacher)

teacherRouter.delete('/:id', deleteTeacher)

module.exports = teacherRouter