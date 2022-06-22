const User = require("../models/user");
const Event  = require("../models/event");
const Selection  = require("../models/selection");
const { Users } = require("../models/user");
const {eventModes} = require("../models/event");
const {selectionTypes} = require("../models/selection");


// CREATE
const createSelection = async (req, res) => {

    const newSelection = new Selection(req?.body);

    const user = await User.findOne({_id: newSelection?.user_id});

    if (!user) return res.status(404).json("User not found");
    if (!user.status) return res.status(401).json("User not authorised!");

    const event = await Event.findOne({_id: newSelection?.event_id});
    if (!event) return res.status(404).json("Event not found!");

    try {
        const savedSelect = await newSelection.save();

        res.status(200).json("Created successfully!");
        // res.status(200).json(savedSelect);

    } catch (err) {
        res.status(500).json(err);
    }
}

// UPDATE
const updateSelection = async (req, res) => {

    const user = await User.findOne({_id: req?.body?.user_id});

    if (!user) return res.status(404).json("User not found");
    if (!user.status) return res.status(401).json("User not authorised!");

    const event = await Event.findOne({_id: req?.body?.event_id});
    if (!event) return res.status(404).json("Event not found!");

    const selection = await Selection.findOne({_id: req?.params?.selection});
    if (!selection) return res.status(404).json("Selection not found!");

    if (selection._id.equals(req?.body?.selection_id) || user._type === Users.Admin) {

        try {
            const updatedSelection = await Selection.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
            );
            res.status(200).json("Updated successfully!");
            // res.status(200).json(updatedSelection);

        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allow to edit!");
    }
}

// DELETE
const deleteSelection = async (req, res) => {

    const user = await User.findOne({_id: req?.body?.user_id});

    if (!user) return res.status(404).json("User not found");
    if (!user.status) return res.status(401).json("User not authorised!");

    const event = await Event.findOne({_id: req?.body?.event_id});
    if (!event) return res.status(404).json("Event not found!");

    const selection = await Selection.findOne({_id: req?.params?.id});
    if (!selection) return res.status(404).json("Selection not found!");

    if (selection._id.equals(req?.body?.selection_id) || user._type === Users.Admin) {

        try {
            await Selection.deleteOne({_id: req.params.selection});
            res.status(200).json("Deleted successfully by event admin!");

        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allow to add!");
    }
}

// GET
const getSelection = async (req, res) => {

    const user = await User.findOne({_id: req?.body?.user_id});

    if (!user) return res.status(404).json("User not found");
    if (!user.status) return res.status(401).json("User not authorised!");

    const event = await Event.findOne({_id: req?.body?.event_id});
    if (!event) return res.status(404).json("Event not found!");

    try {
        const selection = await Selection.find({"event_id": req.params.event});

        // const {password, ...otherDetails} = user._doc;
        res.status(200).json(selection);

    } catch (err) {
        res.status(500).json(err);
    }
}

// GET ALL
const getSelections = async (req, res) => {

    const user = await User.findOne({ _id: req?.body?.user_id} );

    if(!user) return res.status(404).json("User not found");
    if(!user.status) return res.status(401).json("User not authorised!");

    if (user._id.equals(req.params.id) && user._type === Users.Admin ) {

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
    createSelection,
    updateSelection,
    deleteSelection,
    getSelection,
    getSelections,
}