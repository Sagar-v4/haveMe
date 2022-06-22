const User = require("../models/user");
const Event  = require("../models/event");
const Group  = require("../models/group");
const { Users } = require("../models/user");
const {eventModes} = require("../models/event");
const {assistantPermissions} = require("./assistant");


// CREATE
const createGroup = async (req, res) => {

    const newGroup = new Group(req?.body);

    const user = await User.findOne({_id: newGroup?.user_id});

    if (!user) return res.status(404).json("User not found");
    if (!user.status) return res.status(401).json("User not authorised!");

    try {
        const savedGroup = await newGroup.save();

        res.status(200).json("Created successfully!");
        // res.status(200).json(savedGroup);

    } catch (err) {
        res.status(500).json(err);
    }
}

// UPDATE
const updateGroup = async (req, res) => {

    const user = await User.findOne({_id: req?.body?.user_id});

    if (!user) return res.status(404).json("User not found");
    if (!user.status) return res.status(401).json("User not authorised!");

    try {
        const updatedGroup = await Group.findByIdAndUpdate(
            req.params.id,
            {$set: req?.body},
        );
        res.status(200).json("Updated successfully!");
        // res.status(200).json(updatedGroup);

    } catch (err) {
        res.status(500).json(err);
    }
}

// DELETE
const deleteGroup = async (req, res) => {

    const user = await User.findOne({_id: req?.body?.user_id});

    if (!user) return res.status(404).json("User not found");
    if (!user.status) return res.status(401).json("User not authorised!");

    try {
        await Group.deleteOne({_id: req.params.id});
        res.status(200).json("Deleted successfully!");

    } catch (err) {
        res.status(500).json(err);
    }
}

// GET
const getGroup = async (req, res) => {

    const user = await User.findOne({ _id: req?.body?.user_id} );

    if(!user) return res.status(404).json("User not found");
    if(!user.status) return res.status(401).json("User not authorised!");

    if (user._id.equals(req.params.id) || user._type === Users.Admin ) {

        try {
            const grp = await Group.find({"user_id" : req.params.id});

            // const {password, ...otherDetails} = user._doc;
            res.status(200).json(grp);

        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allow to get!");
    }
}

// GET ALL
const getGroups = async (req, res) => {

    const user = await User.findOne({ _id: req?.body?.user_id} );

    if(!user) return res.status(404).json("User not found");
    if(!user.status) return res.status(401).json("User not authorised!");

    if (user._id.equals(req.params.id) && user._type === Users.Admin ) {

        try {
            const grpProjection = {
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

            const users = await Group.find({}, grpProjection);
            return res.status(200).json(users);

        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
}

module.exports = {
    createGroup,
    updateGroup,
    deleteGroup,
    getGroup,
    getGroups,
}