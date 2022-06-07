const mongoose = require('mongoose');

const selectionTypes = Object.freeze({
    Checkbox: 'checkbox',
    Radio: 'radio',
    Text: 'text',
});

const selectionSchema = new mongoose.Schema({

    _name: String,
    _type: {
        type: String,
        enum: Object.values(selectionTypes),
    },
    _options: [String],
},{
    timestamps: true,
});

const assistantPermissions = Object.freeze({
    Edit: 'edit',
    Group: 'group',
    QRCode: 'qrcode',
    Assist: 'assist',
    Presence: 'presence',
    Selection: 'selection',
});

const eventModes = Object.freeze({
    Public: 'public',
    Private: 'private',
});

const assistantSchema = new mongoose.Schema({

    _id: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
    },
    _permission: {
        type: [String],
        enum: Object.values(assistantPermissions),
    },
},{
    timestamps: true,
});

const eventSchema = new mongoose.Schema({

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
        name: {
            max: 100,
            type: String,
            require: [true, "Event name is required"]
        },
        mode: {
            type: String,
            enum: Object.values(eventModes),
        },
        description: String,
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
    selectionTypes,
    selectionSchema
});

//Compile the schema into models
module.exports = mongoose.model('Event', eventSchema);
// module.exports = mongoose.model('Selection', selectionSchema);