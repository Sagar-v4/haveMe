const mongoose = require('mongoose');

const selectionTypes = Object.freeze({
    Checkbox: 'checkbox',
    Radio: 'radio',
});

const selectionSchema = new mongoose.Schema({

    selection_name: String,
    selection_type: {
        type: String,
        enum: Object.values(selectionTypes),
    },
    selection_options: [String],
});

const eventPermissions = Object.freeze({
    // Checkbox: 'checkbox',
    // Radio: 'radio',
});

const assistantSchema = new mongoose.Schema({

    assistant_id: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
    },
    assistant_permission: {
        type: [String],
        enum: Object.values(eventPermissions),
    },
});

const eventSchema = new mongoose.Schema({

        code: {
            type: String,
            required: [true, "Code is required"],
            unique: [true, "Code must be unique"]
        },
        name: {
            max: 100,
            type: String,
            required: [true, "Event name is required"],
            // unique: [true, "Event name must be unique"]
        },
        user_id: {
            ref: 'User',
            required: [true, "User id is required"],
            type: mongoose.Schema.Types.ObjectId
        },
        selection: {
            default: [],
            type: [selectionSchema]
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
        },
        assistant: {
            default: [],
            type: [assistantSchema]
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
        },
        expire: {
            type: Date,
            min: Date.now()
        },

    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
);

Object.assign(eventSchema.statics, {
    eventPermissions,
    selectionTypes
});

//Compile the schema into models
module.exports = mongoose.model('Event', eventSchema);