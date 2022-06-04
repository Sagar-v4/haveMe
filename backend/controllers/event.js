
const Event = require("../model/event");

// CREATE
const createEvent = async (req, res, next) => {

    const newEvent = new Event(req.body);

    try{
        const saveEvent = await newEvent.save();
        res.status(200).json(saveEvent);
    } catch (e) {
        next(e);
    }
}

// UPDATE
const updateEvent = async (req, res, next) => {

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedEvent);
    } catch (e) {
        next(e);
    }
}

// DELETE
const deleteEvent = async (req, res, next) => {

    try {
        await Event.findByIdAndDelete(
            req.params.id,
        );
        res.status(200).json("Event deleted");
    } catch (e) {
        next(e);
    }
}

// GET
const getEvent = async (req, res, next) => {

    try {
        const event = await Event.findById(
            req.params.id,
        );
        res.status(200).json(event);
    } catch (e) {
        next(e);
    }
}

// GET ALL
const getEvents = async (req, res, next) => {

    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (e) {
        next(e);
    }
}

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvent,
    getEvents,
}