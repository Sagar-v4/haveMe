const User = require("../models/user");
const Event = require("../models/event");
const { Users, Genders } = require("../models/user");
const { eventPermissions, selectionTypes } = require("../models/event");

// CREATE
const createEvent = async (req, res) => {

    const newEvent = new Event(req?.body);

    const event = await Event.findOne({"code" : newEvent.code});
    if(event) return res.status(500).json("Event code duplication!");

    if(!(newEvent.expire instanceof Date) || newEvent.expire <= Date.now())
        return res.status(500).json("Invalid expire date!");

    try {
        const savedEvent = await newEvent.save();

        // res.status(200).json("Event created successfully!");
        res.status(200).json(savedEvent);

    } catch(err) {
        res.status(500).json(err);
    }
}

// UPDATE
const updateEvent = async (req, res) => {

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

// DELETE
const deleteEvent = async (req, res) => {

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
const getEvent = async (req, res) => {

    try {
        const event = await Event.findById(req.params.id);

        res.status(200).json(event._doc);

    } catch (err) {
        res.status(500).json(err);
    }
}

// GET ALL
const getEvents = async (req, res) => {

    const user = await User.findOne({_id: req.params.id});
    if (!user) return res.status(404).json("User not found!");

    try {
        const eventProjection = {
            "_id": 1,
            "code": 1,
            "name": 1,
            "user_id": 1,
            "selection": 1,
            "expire": 1,
            "assistant": 1,
            "createdAt": 1,
        };

        const events = await Event.find({ "user_id": user._id }, eventProjection);
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvent,
    getEvents,
}