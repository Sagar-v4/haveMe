
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("./model/user");
const LocalStrategy = require("passport-local").Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config();

passport.use( "local",
    new LocalStrategy({}, (email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
            if (err) throw err;
            if (!user) return done(null, false);
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) throw err;
                if (result === true) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        });
    })
);

passport.use("google",
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback"
        },
        (accessToken, refreshToken, profile, done) => {
            console.log("PROFILE: ", profile._json );
            User.findOne({ email: profile._json.email }).then(async (existingUser) => {
                if (existingUser) {
                    // we already have a record with the given profile ID
                    console.log("PROFILE EXIST");
                    done(null, existingUser);
                } else {
                    // we don't have a user record with this ID, make a new record!
                    console.log("PROFILE DOES NOT EXIST");

                    await User.create({
                        ids: {"google": profile._json.sub},
                        email: profile._json.email,
                        email_verified: profile._json.email_verified,
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

passport.use( "github",
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/callback"
        },
        (accessToken, refreshToken, profile, done) => {
            console.log("PROFILE: ", profile._json );
            User.findOne({ ids: {"github": profile._json.id}  }).then(async (existingUser) => {
                if (existingUser) {
                    // we already have a record with the given profile ID
                    console.log("PROFILE EXIST");
                    done(null, existingUser);
                } else {
                    // we don't have a user record with this ID, make a new record!
                    console.log("PROFILE DOES NOT EXIST");

                    await User.create({
                        ids: {"github": profile._json.id},
                        email: null,
                        email_verified: false,
                        password: null,
                        name: profile._json.name,
                        dob: null,
                        gender: null,
                        role: "user",
                        avtar: profile._json.avatar_url,
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