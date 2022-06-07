const mongoose = require('mongoose');

const selectedSchema = new mongoose.Schema({

    selected_name: String,
    selected_type: String,
    selected_options: [String],
});

const presenceSchema = new mongoose.Schema(

    {
        event_id: {
            ref: 'event',
            required: [true, "Event id is required"],
            type: mongoose.Schema.Types.ObjectId
        },
        user_id: {
            ref: 'user',
            required: [true, "User id is required"],
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