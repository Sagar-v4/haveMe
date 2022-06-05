const mongoose = require('mongoose');

const selectedSchema = new mongoose.Schema({

    selection_id: {
        ref: 'Selection',
        require: [true, "Selection id is required"],
        type: mongoose.Schema.Types.ObjectId
    },
    _options: [String],
});

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
        selected: {
            default: [],
            type: [selectedSchema]
            /**
             * TYPE EXAMPLE
             * [
             *   {
             *       "type" : "checkbox",
             *       "name" : "Your fav sport?",
             *       "options" : [
             *           "cricket",
             *           "football",
             *           "basketball"
             *       ]
             *   },
             *   {
             *       "type" : "radio",
             *       "name" : "Your gender?",
             *       "options" : [
             *           "male",
             *           "female",
             *           "other"
             *       ]
             *   }
             * ]
             */
        },
        message: {
            max: 300,
            type: String
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

//Compile the schema into models
module.exports = mongoose.model('Presence', presenceSchema);