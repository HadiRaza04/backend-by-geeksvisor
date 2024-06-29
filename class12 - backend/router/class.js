const express = require('express');
const { getClasses, postClass, getByIdClass, putClass, deleteClass } = require('../controllers/classController');
const classRouter = express.Router()

classRouter.post('/', postClass);

classRouter.get('/', getClasses);

classRouter.get('/:id', getByIdClass);

classRouter.put('/:id', putClass);

classRouter.delete('/:id', deleteClass);

module.exports = classRouter