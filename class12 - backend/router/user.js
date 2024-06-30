const express = require('express');
const { postUser, getUsers, getByIdUser, putUser, deleteUser } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/', postUser)

userRouter.get('/', getUsers)

userRouter.get('/:id', getByIdUser)

userRouter.put('/:id', putUser)

userRouter.delete('/:id', deleteUser)

module.exports = userRouter;