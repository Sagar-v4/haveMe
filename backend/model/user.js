const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

        ids: {
            type: [Map],
            of: String
        },
        email: {
            type: String,
            unique: [true, "Email must be unique"]
        },
        email_verified: {
            type: Boolean,
            default: false
        },
        password: {
            type: String
        },
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        dob: {
            type: Date
        },
        gender: {
            type: String
        },
        role: {
            type: String,  // [Admin | User]
            required: [true, "Role is required"]
        },
        avtar: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_960_720.png",
        },
        forgotCode: {
            type: Number,
            min: 100000,
            max: 999999
        },
        forgotTime: {
            type: Date
        },
        status: {
            type: Boolean,
            default: true
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

//Hash password
// userSchema.pre('save', async function (next) {
//     //hash password
//     if(this.password === null) next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });
//
// //match password
// userSchema.methods.isPasswordMatched = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

//Compile the schema into models
module.exports = mongoose.model('user', userSchema);