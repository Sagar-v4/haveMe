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

    const selectionExist = await Selection.findOne({user_id: newSelection?.user_id, event_id: newSelection?.event_id});
    if (selectionExist) return res.status(404).json("Selection already exist!");

    const eventAdmin = await Event.findOne({_id: newSelection?.event_id, user_id: newSelection?.user_added_id});

    if (eventAdmin) {

        try {
            const savedSelect = await newSelection.save();

            res.status(200).json("Created successfully by event admin!");
            // res.status(200).json(savedSelect);

        } catch (err) {
            res.status(500).json(err);
        }
    } else {

        const selection = await Selection.findOne({
            user_id: newSelection?.user_added_id,
            event_id: newSelection?.event_id
        });
        if (!selection) return res.status(404).json("Selection not found!");

        if (Object.values(selection.permission).includes(selectionPermissions.Select) && selection.status) {

            try {
                const savedSelect = await newSelection.save();

                res.status(200).json("Created successfully by selection!");
                // res.status(200).json(savedSelect);

            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(403).json("You are not allow to add!");
        }
    }
}

// UPDATE
const updateSelection = async (req, res) => {


    const user = await User.findOne({ _id: req?.body?.user_id} );

    if(!user) return res.status(404).json("User not found");
    if(!user.status) return res.status(401).json("User not authorised!");

    const permissions = req?.body?.permission;
    let valid = true;
    permissions.map(p => {
        console.log(p);
        if(!Object.values(selectionPermissions).includes(p)) {
            valid = false;
        }
    });

    if(!valid) return res.status(404).json("Invalid permission argument!");

    const eventAdmin = await Event.findOne({_id: req?.body?.event_id, user_id: req?.body?.user_added_id});

    if (eventAdmin) {

        try {
            const updatedSelection = await Selection.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
            );
            res.status(200).json("Updated successfully by event admin!");
            // res.status(200).json(updatedSelection);

        } catch (err) {
            res.status(500).json(err);
        }
    } else {

        const selection = await Selection.findOne({
            user_id: req?.body?.user_added_id,
            event_id: req?.body?.event_id
        });
        if (!selection) return res.status(404).json("Selection not found!");

        if (Object.values(selection.permission).includes(selectionPermissions.Select) && selection.status) {

            try {
                const updatedSelection = await Selection.findByIdAndUpdate(
                    req.params.id,
                    {$set: req.body},
                );
                res.status(200).json("Updated successfully by selection!");
                // res.status(200).json(updatedSelection);

            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(403).json("You are not allow to edit!");
        }
    }
}

// DELETE
const deleteSelection = async (req, res) => {

    const deleteSelection = new Selection(req?.body);

    const user = await User.findOne({_id: deleteSelection?.user_id});

    if (!user) return res.status(404).json("User not found");

    const event = await Event.findOne({_id: deleteSelection?.event_id});
    if (!event) return res.status(404).json("Event not found!");

    const eventAdmin = await Event.findOne({_id: deleteSelection?.event_id, user_id: deleteSelection?.user_added_id});

    if (eventAdmin) {

        try {
            await Selection.deleteOne({_id: req.params.id});
            res.status(200).json("Deleted successfully by event admin!");

        } catch (err) {
            res.status(500).json(err);
        }
    } else {

        const selection = await Selection.findOne({
            user_id: deleteSelection?.user_added_id,
            event_id: deleteSelection?.event_id
        });
        if (!selection) return res.status(404).json("Selection not found!");

        if (Object.values(selection.permission).includes(selectionPermissions.Select) && selection.status) {

            try {
                await Selection.deleteOne({_id: req.params.id});
                res.status(200).json("Deleted successfully by selection!");

            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(403).json("You are not allow to add!");
        }
    }
}

// GET
const getSelection = async (req, res) => {

    const user = await User.findOne({ _id: req?.body?.user_id} );

    if(!user) return res.status(404).json("User not found");
    if(!user.status) return res.status(401).json("User not authorised!");

    if (user._id.equals(req.params.id) || user._type === Users.Admin ) {

        try {
            const user = await Selection.find({"user_id" : req.params.id});

            // const {password, ...otherDetails} = user._doc;
            res.status(200).json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allow to get!");
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