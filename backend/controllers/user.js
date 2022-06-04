
const User = require("../model/user");

// UPDATE
const updateUser = async (req, res, next) => {

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedUser);
    } catch (e) {
        next(e);
    }
}

// DELETE
const deleteUser = async (req, res, next) => {

    try {
        await User.findByIdAndDelete(
            req.params.id,
        );
        res.status(200).json("User deleted");
    } catch (e) {
        next(e);
    }
}

// GET
const getUser = async (req, res, next) => {

    try {
        const user = await User.findById(
            req.params.id,
        );
        res.status(200).json(user);
    } catch (e) {
        next(e);
    }
}

// GET ALL
const getUsers = async (req, res, next) => {

    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (e) {
        next(e);
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
}