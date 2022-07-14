const router = require("express").Router();
const passport = require("passport");
const {register, login} = require("../controllers/auth");

// AUTH TESTING
router.get("/", (req, res) => {
    res.status(200).send("auth route...");
})

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

//GOOGLE

router.get("login/success", (req, res) => {

    if(req.user) {
        res.status(200).json({
            success: true,
            message: "successful",
            user: req.user,
            // cookies: req.cookies,
            // jwt key:
        });
    }
});

router.get("login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/google", passport.authenticate("google", {scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "http://localhost:3000/",
        failureRedirect: "login/failed"
    })
);



module.exports = router;