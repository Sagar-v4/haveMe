const mongoose = require('mongoose');

// const {eventModes} = require("./event");
// const {Users, Genders} = require("./user");
// const {selectionTypes} = require("./selection");

const assistantPermissions = Object.freeze({
    Edit: "edit",
    Group: "group",
    QRCode: "qrcode",
    Assist: "assist",
    Presence: "presence",
    Selection: "selection",
});

const assistantSchema = new mongoose.Schema(

    {
        user_id: {
            ref: 'User',
            require: [true, "User id is required"],
            type: mongoose.Schema.Types.ObjectId,
        },
        event_id: {
            ref: 'Event',
            require: [true, "Event id is required"],
            type: mongoose.Schema.Types.ObjectId
        },
        // permission: {
        //     default: [],
        //     type: [String],
        //     enum: Object.values(assistantPermissions),
        // }
    },
    {
        timestamps: true,
    }
);
Object.assign(assistantSchema.statics, {
    assistantPermissions
});

//Compile the schema into models
module.exports = mongoose.model('Assistant', assistantSchema);