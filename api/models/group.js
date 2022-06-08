const mongoose = require('mongoose');

const {QRCodes} = require("./qrcode");
const {eventModes} = require("./event");
const {Users, Genders} = require("./user");
const {selectionTypes} = require("./selection");
const {assistantPermissions} = require("./assistant");

const memberSchema = new mongoose.Schema({

    user_id: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
    },
    status: {
        type: Boolean,
        default: true,
    }
},{
    timestamps: true,
});

const groupSchema = new mongoose.Schema({

    _name: String,
    _description: String,
    user_id: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
    },
    _member: [memberSchema]
},{
    timestamps: true,
});


module.exports = mongoose.model('Group', groupSchema);