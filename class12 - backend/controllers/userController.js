const User = require("../model/User");

const postUser = async (req, res) => {
    const { name, fname, age } = req.body;
    try {
        if(!name || !fname || !age) {
            return res.status(400).json({error: "bad request", details: "Missing name or fname or age."})
        }
        const newUser = new User({ name, fname, age });
        await newUser.save()
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(400).json({ "Error": error.message});
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        if(users.length === 0){
            return res.json({ msg: "Students not found" })
        }
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json({ Error: error.message});
    }
}

const getByIdUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id)
        if(!user){
            return res.status(400).json({ msg: "Student not found" })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ Error: error.message});
    }
}

const putUser = async (req, res) => {
    const id = req.params.id;
    try {
        const { name, fname, age } = req.body;
        const user = await User.findOneAndUpdate({ _id : id }, { name, fname, age }, { new: true })
        if(!user) {
            return res.status(400).json({ error: "User not found."})
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage})
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete({ _id: id })
        if(!user) {
            return res.status(404).json({ error: "User not found "})
        }
        return res.status(200).json({ msg: "User deleted." })
    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.massage})
    }
}

module.exports = { postUser, getUsers, getByIdUser, putUser, deleteUser }