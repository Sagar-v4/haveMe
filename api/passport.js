
const dotenv = require("dotenv");
const passport = require("passport");
const User = require("./models/user");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/api/auth/google/callback"
        },
        (accessToken, refreshToken, profile, done) => {
            console.log("PROFILE: ", profile._json );
            User.findOne({ email: profile._json.email }).then(async (existingUser) => {
                if (existingUser) {
                    // we already have a record with the given profile ID
                    console.log("PROFILE EXIST");
                    // localStorage.setItem("user", JSON.stringify(existingUser));
                    done(null, existingUser);
                } else {
                    // we don't have a user record with this ID, make a new record!
                    console.log("PROFILE DOES NOT EXIST");

                    await User.create({
                        // ids: {"google": profile._json.sub},
                        email: profile._json.email,
                        // email_verified: profile._json.email_verified,
                        password: null,
                        name: profile._json.name,
                        dob: null,
                        gender: null,
                        role: "user",
                        avtar: profile._json.picture,
                        forgotCode: null,
                        forgotTime: null,
                    })
                        .then((user) => done(null, user));
                }
            });
        }
    )
);

// session - serialization
passport.serializeUser((user, cb) => {
    cb(null, user._id);
});

// session - deserialization
passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
        const userInformation = {
            userId: user._id,
            userName: user.name
        };
        cb(err, userInformation);
    });
});