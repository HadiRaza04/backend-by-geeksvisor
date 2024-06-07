const express = require('express');
const User = require('../model/User');
const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
    try {
        const { name, fname, age } = req.body;
        if(!name || !fname || !age) {
            return res.status(400).json({error: "bad request", details: "Missing name or fname or age."})
        }
        const newUser = new User({ name, fname, age });
        await newUser.save()
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(400).json({ "Error": error.message});
    }
})
userRouter.get('/', async (req, res) => {
    try {
        const users = await User.find()
        if(!users){
            return res.status(400).json({ msg: "Students not found" })
        }
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json({ Error: error.message});
    }
})
userRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id)
        if(!user){
            return res.status(400).json({ msg: "Student not found" })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ Error: error.message});
    }
})
userRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, fname, age } = req.body;
        const user = await User.findOneAndUpdate({ _id : id }, { name, fname, age }, { new: true })
        if(!user) {
            return res.status(400).json({ error: "User not found."})
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage})
    }
})
userRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete({ _id: id })
        if(!user) {
            return res.status(404).json({ error: "User not found "})
        }
        return res.status(200).json({ msg: "User deleted." })
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage})
    }
})

module.exports = userRouter;