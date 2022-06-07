const User = require("../models/user");
const Event = require("../models/event");
const Presence = require("../models/presence");

const { Users, Genders } = require("../models/user");
const { eventPermissions, selectionTypes } = require("../models/event");

// CREATE
const createPresence = async (req, res) => {

    const newPresence = new Presence(req?.body);

    const user = await User.findOne({_id : newPresence.user_id});
    const event = await Event.findOne({_id : newPresence.event_id});

    if(!user) return res.status(404).json("User not found!");
    if(!event) return res.status(404).json("Event not found!");

    if(event.expire >= newPresence.createdAt) {

        try {
            const savedPresence = await newPresence.save();

            res.status(200).json(savedPresence);
            // res.status(200).json("Presence created successfully!");
        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        return res.status(403).json("Invalid expiry date!");
    }

}

// UPDATE (AFTER SOLVING ASSIST)
const updatePresence = async (req, res) => {

    const user = await User.findOne({  _id: req?.body?.user_id } );
    const event = await Event.findOne({ _id: req.params.id } );

    if(!user) return res.status(404).json("User not found!");
    if(!event) return res.status(404).json("Event not found!");

    if (user._id.equals(event.user_id) || user.user_type === Users.Admin) {

        try {
            const updatedEvent = await Event.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
            );
            res.status(200).json("Updated successfully!");
            // res.status(200).json(updatedEvent);

        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allow to edit!");
    }
}

// DELETE (AFTER SOLVING ASSIST)
const deletePresence = async (req, res) => {

    const user = await User.findOne({  _id: req?.body?.user_id } );
    const event = await Event.findOne({ _id: req.params.id } );

    if(!user) return res.status(404).json("User not found!");
    if(!event) return res.status(404).json("Event not found!");

    if (user._id.equals(event.user_id) || user.user_type === Users.Admin) {

        try {
            await Event.deleteOne({_id: req.params.id});
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
const getPresence = async (req, res) => {

    try {
        const presence = await Presence.findById(req.params.id);
        res.status(200).json(presence._doc);

    } catch (err) {
        res.status(500).json(err);
    }
}

// GET ALL PRESENCE
const getPresences = async (req, res) => {

    const user = await User.findOne({_id: req.params.id});
    if(!user) return res.status(404).json("User not found!");
    if((user.user_type) !== (Users.Admin)) return res.status(403).json("You are not allowed!");

    try {
        const presenceProjection = {
            "_id": 1,
            "user_id": 1,
            "event_id": 1,
            "selected": 1,
            "message": 1,
            "createdAt": 1,
        };

        const presences = await Presence.find({}, presenceProjection);
        res.status(200).json(presences);
    } catch (err) {
        res.status(500).json(err);
    }
}

// GET ALL USER PRESENCE
const getUserPresences = async (req, res) => {

    const user = await User.findOne({_id: req.params.id});
    if (!user) return res.status(404).json("User not found!");

    try {
        const presenceProjection2 = {
            "_id": 1,
            "user_id": 1,
            "event_id": 1,
            "selected": 1,
            "message": 1,
            "createdAt": 1,
        };
console.log("here");
        const presences = await Presence.find({"user_id": user._id}, presenceProjection2);
        res.status(200).json(presences);
    } catch (err) {
        res.status(500).json(err);
    }
}

// GET ALL EVENT PRESENCE
const getEventPresences = async (req, res) => {

    const event = await Event.findOne({_id: req.params.id});
    const user = await User.findOne({_id: req?.body?.user_id});

    if (!user) return res.status(404).json("User not found!");
    if (!event) return res.status(404).json("Event not found!");

    if (user._id.equals(event.user_id) || user.user_type === Users.Admin) {

        try {
            const presenceProjection = {
                "_id": 1,
                "user_id": 1,
                "event_id": 1,
                "selected": 1,
                "message": 1,
                "createdAt": 1,
            };

            const presences = await Presence.find({"event_id": event._id}, presenceProjection);
            res.status(200).json(presences);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
}

module.exports = {
    createPresence,
    updatePresence,
    deletePresence,
    getPresence,
    getPresences,
    getUserPresences,
    getEventPresences,
}