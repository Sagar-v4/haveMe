const mongoose = require('mongoose');

// const {Users, Genders} = require("./user");
// const {selectionTypes} = require("./selection");
// const {assistantPermissions} = require("./assistant");


const eventModes = Object.freeze({
    Public: 'public',
    Private: 'private',
});

const eventSchema = new mongoose.Schema(

    {
        code: {
            type: String,
            default: null,
            sparse: true,
            unique: [true, "Code must be unique"]
        },
        user_id: {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId,
            require: [true, "User id is required"]
        },
        name: {
            type: String,
            require: [true, "Event name is required"]
        },
        description: {
            type: String,
            require: [true, "Event description is required"]
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
        // assistant: {
        //     type: [{
        //         ref: 'Assistant',
        //         type: mongoose.Schema.Types.ObjectId,
        //     }],
        //     default: []
        // },
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
            min: Date.now,
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