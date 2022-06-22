const mongoose = require('mongoose');

// const {eventModes} = require("./event");
// const {selectionTypes} = require("./selection");
// const {assistantPermissions} = require("./assistant");

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
    Null: null,
    User: 'user',
    Admin: 'admin',
});

const Genders = Object.freeze({
    Null: null,
    Male: 'male',
    Female: 'female',
    Other: 'other',
});

const userSchema = new mongoose.Schema(

    {
        // social_detail: {
        //     type: [socialDetailsSchema],
        //     default: []
        // },
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
            type: String,
            default: null
        },
        name: {
            type: String,
            require: [true, "Name is required"]
        },
        mobile_number: {
            type: Number,
            default: null
        },
        dob: {
            type: Date,
            default: null,
        },
        gender: {
            type: String,
            default: Genders.Null,
            enum: Object.values(Genders)
        },
        _type: {
            type: String,
            default: Users.Null,
            enum: Object.values(Users),
            require: [true, "User type is required"]
        },
        avtar: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_960_720.png",
        },
        forgot_code: {
            type: Number,
            min: 100000,
            max: 999999,
            default: null
        },
        forgot_time: {
            type: Date,
            default: null
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


// Check User completed profile
// userSchema.methods.profileCompleted = async function (user_id) {
//     entrants.find({ pincode: { $ne: null } })
// };

//Compile the schema into models
module.exports = mongoose.model('User', userSchema);