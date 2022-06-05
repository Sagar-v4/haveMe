const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const socialDetailsSchema = new mongoose.Schema({

    social_id: String,
    social_name: String,
});

const Users = Object.freeze({

    User: 'user',
    Admin: 'admin',
});

const userTypeSchema = new mongoose.Schema({

    type: String,
    enum: Object.values(Users)
});

const Genders = Object.freeze({

    Male: 'male',
    Female: 'female',
    Other: 'other',
});

const genderSchema = new mongoose.Schema({

    type: String,
    enum: Object.values(Genders),
});

const userSchema = new mongoose.Schema({

        social_detail: {socialDetailsSchema},
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
            type: String
        },
        name: {
            type: String,
            require: [true, "Name is required"]
        },
        dob: {
            type: Date
        },
        gender: {genderSchema},
        user_type: {
            type: userTypeSchema,
            require: [true, "User type is required"]
        },
        avtar: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_960_720.png",
        },
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
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
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