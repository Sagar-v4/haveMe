const User = require("../model/user");
const bcrypt = require("bcryptjs");
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// REGISTER
const register = async (req, res, next) => {

    try {
        const user = User.findOne({ email: req?.body?.email} );
        if(user) return next(createError(404, "user already exist!"));

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req?.body?.password, salt);

        const newUser = new User({
            email: req?.body?.email,
            name: req?.body?.name,
            password: hash,
        });

        await newUser.save();
        res.status(201).send("User created!");
    } catch (e) {
        next(e);
    }
}

// LOGIN
const login = async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req?.body?.email} );
        if(!user) return next(createError(404, "user not found!"));

        const isPassCorrect = await bcrypt.compare(req?.body?.password, user.password);
        if(!isPassCorrect) return next(createError(400, "invalid email or password!"));

        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET_KEY,
            );

        // const {password, ...otherDetails} = user._doc;
        const {password, ...otherDetails} = user;

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({...otherDetails});
    } catch (e) {
        next(e);
    }
}

module.exports = {
    register,
    login,
}