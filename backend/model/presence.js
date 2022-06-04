const mongoose = require('mongoose');

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
        option: {
            type:[String],
            required: [true, "Option is required"]
        },
        message: {
            type: String
        },

        accountVerificationToken: String,
        accountVerificationTokenExpires: Date,
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
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
module.exports = mongoose.model('presence', presenceSchema);