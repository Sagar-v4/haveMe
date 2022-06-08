const mongoose = require('mongoose');

const {QRCodes} = require("./qrcode");
const {eventModes} = require("./event");
const {selectionTypes} = require("./selection");
const {assistantPermissions} = require("./assistant");

const socialDetailsSchema = new mongoose.Schema(

    {
        social_id: String,
        _name: String,
    },
    {
        timestamps: true,
    }
);

const Users = Object.freeze({
    User: 'user',
    Admin: 'admin',
});

const Genders = Object.freeze({
    Male: 'male',
    Female: 'female',
    Other: 'other',
});

const userSchema = new mongoose.Schema(

    {
        social_detail: [socialDetailsSchema],
        email: {
            type: String,
            lowercase: true,
            unique: [true, "Email must be unique"]
        },
        email_verified: {
            type: Boolean,
            default: false
        },
        password: {
            min: 6,
            type: String
        },
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        mobile_number: Number,
        dob: {
            type: Date
        },
        gender: {
            type: String,
            enum: Object.values(Genders),
        },
        user_type: {
            type: String,
            default: Users.User,
            enum: Object.values(Users),
            require: [true, "User type is required"]
        },
        avtar: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_960_720.png",
        },
        assist: [{
            ref: 'Assistant',
            type: mongoose.Schema.Types.ObjectId,
        }],
        group: [{
            ref: 'Group',
            type: mongoose.Schema.Types.ObjectId,
        }],
        forgot_code: {
            type: Number,
            min: 100000,
            max: 999999
        },
        forgot_time: {
            type: Date
        },
        status: {
            type: Boolean,
            default: true
        },

    },
    {
        timestamps: true,
    }
);

Object.assign(userSchema.statics, {
    Genders,
    Users
});

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
module.exports = mongoose.model('User', userSchema);