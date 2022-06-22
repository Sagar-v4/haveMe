const mongoose = require('mongoose');

// const {eventModes} = require("./event");
// const {Users, Genders} = require("./user");
// const {selectionTypes} = require("./selection");
// const {assistantPermissions} = require("./assistant");

const selectedSchema = new mongoose.Schema(

    {
        selection_id: {
            ref: 'Selection',
            require: [true, "Selection id is required"],
            type: mongoose.Schema.Types.ObjectId
        },
        option: [String],
    },
    {
        timestamps: true,
    }
);

const presenceSchema = new mongoose.Schema(
    {
        event_id: {
            ref: 'Event',
            require: [true, "Event id is required"],
            type: mongoose.Schema.Types.ObjectId
        },
        user_id: {
            ref: 'User',
            require: [true, "User id is required"],
            type: mongoose.Schema.Types.ObjectId
        },
        // selected: {
        //     type: [selectedSchema],
        //     require: [true, "Selection is required"],
        // },
        /**
         * TYPE EXAMPLE
         * [
         *   {
         *       "_id" : "54f5g645re",
         *       "_options" : [
         *           "cricket",
         *           "football",
         *           "basketball"
         *       ]
         *   },
         *   {
         *       "_id" : "54f5g645re",
         *       "_options" : [
         *           "male",
         *           "female",
         *           "other"
         *       ]
         *   }
         * ]
         */
        message: {
            type: String,
            default: null
        },
        verified: {
            type: Boolean,
            default: false
        }

    },
    {
        timestamps: true,
    }
);

//Compile the schema into models
module.exports = mongoose.model('Presence', presenceSchema);