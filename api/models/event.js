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
            require: [true, "User id is required"],
            type: mongoose.Schema.Types.ObjectId
        },
        name: {
            type: String,
            require: [true, "Event name is required"]
        },
        mode: {
            type: String,
            enum: Object.values(eventModes),
        },
        description: String,
        selection: [{
            ref: 'Selection',
            type: mongoose.Schema.Types.ObjectId,
        }],
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
        assistant: [{
            ref: 'Assistant',
            type: mongoose.Schema.Types.ObjectId,
        }],
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
        expire: {
            type: Date,
            min: Date.now()
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