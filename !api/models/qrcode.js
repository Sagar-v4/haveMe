const mongoose = require('mongoose');

const {eventModes} = require("./event");
const {Users, Genders} = require("./user");
const {selectionTypes} = require("./selection");
const {assistantPermissions} = require("./assistant");

const QRCodes = Object.freeze({
    Event: 'event',
    Group: 'group',
});

const qrcodeSchema = new mongoose.Schema(

    {
        code: {
            type: String,
            require: [true, "Code is required"],
            unique: [true, "Code must be unique"]
        },
        user_id: {
            ref: 'User',
            require: [true, "User id is required"],
            type: mongoose.Schema.Types.ObjectId
        },
        _type: {
            type: String,
            enum: Object.values(QRCodes),
        },
        event_id: {
            ref: 'Event',
            type: mongoose.Schema.Types.ObjectId
        },
        group_id: {
            ref: 'Group',
            type: mongoose.Schema.Types.ObjectId
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

Object.assign(qrcodeSchema.statics, {
    QRCodes

});

module.exports = mongoose.model('QRCode', qrcodeSchema);