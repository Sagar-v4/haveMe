const User = require("../models/user");
const Event  = require("../models/event");
const Assistant  = require("../models/assistant");
const { Users } = require("../models/user");
const {eventModes} = require("../models/event");
const {assistantPermissions} = require("../models/assistant");


// CREATE
const createAssistant = async (req, res) => {

    const newAssistant = new Assistant(req?.body);

    const user = await User.findOne({_id: newAssistant?.user_id});

    if (!user) return res.status(404).json("User not found");
    if (!user.status) return res.status(401).json("User not authorised!");

    const event = await Event.findOne({_id: newAssistant?.event_id});
    if (!event) return res.status(404).json("Event not found!");

    const assistantExist = await Assistant.findOne({user_id: newAssistant?.user_id, event_id: newAssistant?.event_id});
    if (assistantExist) return res.status(404).json("Assistant already exist!");

    try {
        const savedAssist = await newAssistant.save();

        const assist = await Assistant.find({event_id: newAssistant?.event_id})
            // .group('user_id')
            .populate("user_id");
        // res.status(200).json("Created successfully by event admin!");
        res.status(200).json(assist);

    } catch (err) {
        res.status(500).json(err);
    }
}

// UPDATE
const updateAssistant = async (req, res) => {


    const user = await User.findOne({ _id: req?.body?.user_id} );

    if(!user) return res.status(404).json("User not found");
    if(!user.status) return res.status(401).json("User not authorised!");

    const permissions = req?.body?.permission;
    let valid = true;
    permissions.map(p => {
        console.log(p);
        if(!Object.values(assistantPermissions).includes(p)) {
           valid = false;
        }
    });

    if(!valid) return res.status(404).json("Invalid permission argument!");

    const eventAdmin = await Event.findOne({_id: req?.body?.event_id, user_id: req?.body?.user_added_id});

    if (eventAdmin) {

        try {
            const updatedAssistant = await Assistant.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
            );
            res.status(200).json("Updated successfully by event admin!");
            // res.status(200).json(updatedAssistant);

        } catch (err) {
            res.status(500).json(err);
        }
    } else {

        const assistant = await Assistant.findOne({
            user_id: req?.body?.user_added_id,
            event_id: req?.body?.event_id
        });
        if (!assistant) return res.status(404).json("Assistant not found!");

        if (Object.values(assistant.permission).includes(assistantPermissions.Assist) && assistant.status) {

            try {
                const updatedAssistant = await Assistant.findByIdAndUpdate(
                    req.params.id,
                    {$set: req.body},
                );
                res.status(200).json("Updated successfully by assistant!");
                // res.status(200).json(updatedAssistant);

            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(403).json("You are not allow to edit!");
        }
    }
}

// DELETE
const deleteAssistant = async (req, res) => {

    try {
        await Assistant.deleteOne({_id: req.params.id});
        res.status(200).json("Deleted successfully by event admin!");

    } catch (err) {
        res.status(500).json(err);
    }
}

// GET
const getAssistant = async (req, res) => {

    const user = await User.findOne({ _id: req.params.id} );

    if(!user) return res.status(404).json("User not found");
    if(!user.status) return res.status(401).json("User not authorised!");

    if (user._id.equals(req.params.id) || user._type === Users.Admin ) {

        try {
            let assist = await Assistant.find({user_id : req.params.id});



            console.log(assist);

            // const {password, ...otherDetails} = user._doc;
            res.status(200).json(assist);

        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allow to get!");
    }
}

// GET ALL BY EVENT
const getEventAssistant = async (req, res) => {

    const event = await Event.findOne({ _id: req.params.id} );

    if(!event) return res.status(404).json("Event not found");
    // if(!user.status) return res.status(401).json("User not authorised!");

    if (event._id.equals(req.params.id) ) {

        try {
            const assist = await Assistant.find({event_id : req.params.id})
                .populate("user_id")
                // .group('user_id');

            console.log(assist);

            // const {password, ...otherDetails} = user._doc;
            res.status(200).json(assist);

        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allow to get!");
    }
}

// GET ALL
const getAssistants = async (req, res) => {

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
    createAssistant,
    updateAssistant,
    deleteAssistant,
    getEventAssistant,
    getAssistant,
    getAssistants,
}