const mongoose = require('mongoose');

const {QRCodes} = require("./qrcode");
const {Users, Genders} = require("./user");
const {selectionTypes} = require("./selection");
const {assistantPermissions} = require("./assistant");

const eventModes = Object.freeze({
    Public: 'public',
    Private: 'private',
});

const eventSchema = new mongoose.Schema(
    {
        user_id: {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId,
            require: [true, "User id is required"]
        },
        name: {
            type: String,
            require: [true, "Event name is required"]
        },
        mode: {
            type: String,
            enum: Object.values(eventModes),
            require: [true, "Event mode is required"]
        },
        description: {
            type: String,
            require: [true, "Event description is required"]
        },
        selection: {
            type: [{
                ref: 'Selection',
                type: mongoose.Schema.Types.ObjectId,
            }],
            default: []
        },
        /**
         * TYPE EXAMPLE
         * [
         *      {
         *          "name" : "Your fav sport?",
         *          "type" : "checkbox",
         *          "options" : [
         *              "cricket",
         *              "football",
         *              "basketball"
         *          ]
         *      },
         * ]
         */
        assistant: {
            type: [{
                ref: 'Assistant',
                type: mongoose.Schema.Types.ObjectId,
            }],
            default: []
        },
        /**
         * TYPE EXAMPLE
         * [
         *      {
         *          "user_id" : "45636843864",
         *          "permissions" : [
         *              "change code",
         *              "see presence",
         *          ]
         *      },
         * ]
         */

        group: {
            type: [{
                ref: 'Group',
                type: mongoose.Schema.Types.ObjectId,
            }],
            default: []
        },
        expire: {
            type: Date,
            min: Date.now(),
            require: [true, "Event expire date is required"]
        },

    },
    {
        timestamps: true,
    }
);

Object.assign(eventSchema.statics, {
    eventModes,
});

//Compile the schema into models
module.exports = mongoose.model('Event', eventSchema);
// module.exports = mongoose.model('Selection', selectionSchema);