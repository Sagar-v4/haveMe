const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

        code: {
            type: String,
            required: [true, "Code is required"],
            unique: [true, "Code must be unique"]
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            unique: [true, "Name must be unique"]
        },
        user_id: {
            ref: 'user',
            required: [true, "User id is required"],
            type: mongoose.Schema.Types.ObjectId
        },
        selection: {
            type: String,   // [checkbox | radio]
            required: [true, "Selection is required"]
        },
        option: {
            type:[String],
            required: [true, "Option is required"]
        },
        assistance: {
            type:[String]
        },
        expire: {
            type: Date
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
module.exports = mongoose.model('event', eventSchema);