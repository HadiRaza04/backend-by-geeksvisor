const express = require('express');
const { postStudent, getStudents, getByIdStudent, putStudent, deleteStudent } = require('../controllers/studentController');
const studentRouter = express.Router();

studentRouter.post('/', postStudent)

studentRouter.get('/', getStudents)

studentRouter.get('/:id', getByIdStudent)

studentRouter.put('/:id', putStudent)

studentRouter.delete('/:id', deleteStudent)

module.exports = studentRouter;