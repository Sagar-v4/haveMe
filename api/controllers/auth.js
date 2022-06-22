const User = require("../models/user");
const bcrypt = require("bcrypt");

// REGISTER
const register = async (req, res) => {
    try {
        // CHECK IF USER ALREADY EXIST
        const user = await User.findOne({email: req?.body?.email});
        if (user) return res.status(404).json("User already exist!");

        // HASHING PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req?.body?.password, salt);

        // CREATING NEW USER
        const newUser = await new User({
            email: req?.body?.email,
            name: req?.body?.name,
            password: hash,
        });

        // USER SAVE & RESPONSE
        await newUser.save();
        res.status(201).json("User created!");
        // res.status(201).json("User created!");

    } catch (err) {
        res.status(500).json(err);
    }
}

// LOGIN
const login = async (req, res) => {

    try {
        // FOND USER
        const user = await User.findOne({ email: req?.body?.email} );
        if(!user) return res.status(404).json("User not found!");

        if(!user.status) return res.status(401).json("User not authorised!");

        // VERIFY PASSWORD
        const isPassCorrect = await bcrypt.compare(req?.body?.password, user.password);
        if(!isPassCorrect) return res.status(400).json("Invalid email or password!");

        // RESPONSE
        const {password, ...otherDetails} = user._doc;
        res.status(200).json({...otherDetails});

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    register,
    login,
}