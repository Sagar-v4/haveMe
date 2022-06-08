const mongoose = require('mongoose');

const {QRCodes} = require("./qrcode");
const {eventModes} = require("./event");
const {Users, Genders} = require("./user");
const {assistantPermissions} = require("./assistant");

const selectionTypes = Object.freeze({
    Radio: 'radio',
    Checkbox: 'checkbox',
});

const selectionSchema = new mongoose.Schema({

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
    _name: String,
    _type: {
        type: String,
        enum: Object.values(selectionTypes),
    },
    _options: [String],
},{
    timestamps: true,
});


Object.assign(selectionSchema.statics, {
    selectionTypes,
});

//Compile the schema into models
module.exports = mongoose.model('Selection', selectionSchema);