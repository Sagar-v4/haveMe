const bcrypt = require("bcrypt");
const User = require("../models/user");
const { Users } = require("../models/user");

// UPDATE
const updateUser = async (req, res) => {

    const user = await User.findOne({ _id: req?.body?.user_id} );

    if(!user) return res.status(404).json("User not found");
    if(!user.status) return res.status(401).json("User not authorised!");

    if (user._id.equals(req.params.id) || user._type === Users.Admin ) {

        // IF PASSWORD IS UPDATING
        if (req?.body?.password) {
            try {
                // HASHING PASSWORD
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req?.body?.password, salt);
            } catch (err) {
                res.status(500).json(err);
            }
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
            );
            res.status(200).json("Updated successfully!");
            // res.status(200).json(updatedUser);

        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allow to edit!");
    }
}

// DELETE
const deleteUser = async (req, res) => {

    const user = await User.findOne({ _id: req?.body?.user_id} );

    if(!user) return res.status(404).json("User not found");
    if(!user.status) return res.status(401).json("User not authorised!");

    if (user._id.equals(req.params.id) || user._type === Users.Admin ) {

        try {
            await User.deleteOne({_id: req.params.id});
            res.status(200).json("Deleted successfully!");
            // res.status(200).json(updatedUser);

        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allow to delete!");
    }
}

// GET
const getUser = async (req, res) => {

    const user = await User.findOne({ _id: req.params.id} );

    if(!user) return res.status(404).json("User not found");
    if(!user.status) return res.status(401).json("User not authorised!");

    if (user._id.equals(req.params.id) || user._type === Users.Admin ) {

        try {
            const user = await User.findById(req.params.id);

            const {password, ...otherDetails} = user._doc;
            res.status(200).json({...otherDetails});

        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allow to get!");
    }
}

// GET ALL
const getUsers = async (req, res) => {

    const user = await User.findOne({ _id: req.params.id} );

    if(!user) return res.status(404).json("User not found");
    if(!user.status) return res.status(401).json("User not authorised!");

    if (user._id.equals(req.params.id) || user._type === Users.Admin ) {

        try {
            const userProjection = {
                "_id": 1,
                "dob" : 1,
                "name": 1,
                "email": 1,
                "_type": 1,
                "avtar": 1,
                "status": 1,
                "gender" : 1,
                "createdAt": 1,
                "mobile_number" : 1,
                "email_verified" : 1,
            };

            const users = await User.find({}, userProjection);
            return res.status(200).json(users);

        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
}