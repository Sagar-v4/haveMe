const User = require("../models/user");
const Event = require("../models/event");
const { Users } = require("../models/user");
const { eventModes } = require("../models/event");

// CREATE
const createEvent = async (req, res) => {

    const newEvent = new Event(req?.body);

    const user = await User.findOne({_id: newEvent?.user_id});
    if (!user) return res.status(404).json("User not found");
    if (!user.status) return res.status(401).json("User not authorised!");

    if (!(newEvent.expire instanceof Date) || newEvent.expire <= Date.now())
        return res.status(500).json("Invalid expire date!");

    if (!Object.values(eventModes).includes(newEvent.mode))
        return res.status(500).json("Invalid mode!");

    try {
        const savedEvent = await newEvent.save();

        res.status(200).json("Created successfully!");
        // res.status(200).json(savedEvent);

    } catch (err) {
        res.status(500).json(err);
    }
}

// UPDATE
const updateEvent = async (req, res) => {

    const updateEvent = new Event(req?.body);

    const user = await User.findOne({_id: updateEvent?.user_id});
    if (!user) return res.status(404).json("User not found");
    if (!user.status) return res.status(401).json("User not authorised!");

    const event = await Event.findOne({_id: req.params.id});
    if (!event) return res.status(404).json("Event not found!");

    if (!(updateEvent.expire instanceof Date) || updateEvent.expire <= Date.now())
        return res.status(500).json("Invalid expire date!");

    if (!Object.values(eventModes).includes(updateEvent.mode))
        return res.status(500).json("Invalid mode!");

    if (user._id.equals(event.user_id) || user._type === Users.Admin) {

        try {
            const updatedEvent = await Event.findByIdAndUpdate(
                req.params.id,
                {$set: req?.body},
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

    const user = await User.findOne({_id: req?.body?.user_id});
    if (!user) return res.status(404).json("User not found");
    if (!user.status) return res.status(401).json("User not authorised!");

    const event = await Event.findOne({_id: req.params.id});
    if (!event) return res.status(404).json("Event not found!");

    if (user._id.equals(event.user_id) || user._type === Users.Admin) {

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

    const user = await User.findOne({_id: req?.body?.user_id});
    if (!user) return res.status(404).json("User not found");
    if (!user.status) return res.status(401).json("User not authorised!");

    const event = await Event.findOne({_id: req.params.id});
    if (!event) return res.status(404).json("Event not found!");

    if (user._id.equals(event.user_id) || user._type === Users.Admin) {
        try {
            res.status(200).json(event._doc);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allow to delete!");
    }
}

// GET ALL
const getEvents = async (req, res) => {

    const user = await User.findOne({_id: req.params.id});
    if (!user) return res.status(404).json("User not found");
    if (!user.status) return res.status(401).json("User not authorised!");

    if (user._id.equals(req.params.id) || user._type === Users.Admin) {

        try {
            const eventProjection = {
                "_id": 1,
                "mode": 1,
                "name": 1,
                "group": 1,
                "expire": 1,
                "user_id": 1,
                "selection": 1,
                "assistant": 1,
                "createdAt": 1,
                "description": 1,
            };

            const events = await Event.find({"user_id": user._id}, eventProjection);
            res.status(200).json(events);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allow to delete!");
    }
}

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvent,
    getEvents,
}