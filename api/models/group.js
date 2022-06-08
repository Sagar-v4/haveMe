const mongoose = require('mongoose');

const {QRCodes} = require("./qrcode");
const {eventModes} = require("./event");
const {Users, Genders} = require("./user");
const {selectionTypes} = require("./selection");
const {assistantPermissions} = require("./assistant");

const memberSchema = new mongoose.Schema(

    {
        user_id: {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId,
        },
        status: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
    }
);

const groupSchema = new mongoose.Schema(

    {
        user_id: {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId,
        },
        name: {
            type: String,
            require: [true, "Group name is required"]
        },
        description: {
            type: String,
            require: [true, "Group description name is required"]
        },
        member: [memberSchema]
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('Group', groupSchema);