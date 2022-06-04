const router = require("express").Router();
const passport = require("passport");
const {register, login} = require("../controllers/auth");

router.get("register", register);
router.get("login", login);

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

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000/");
});

// router.post('/login',
//     passport.authenticate('local', { failureRedirect: '/login' }),
//     function(req, res) {
//     console.log(req.body);
//         res.redirect('/');
//     });


router.post(
    "/local/callback",
    passport.authenticate("local", {
        successRedirect: "http://localhost:3000/",
        failureRedirect: "login/failed"
    })
);

router.get("/google", passport.authenticate("google", {scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "http://localhost:3000/",
        failureRedirect: "login/failed"
    })
);

router.get("/github", passport.authenticate("github", {scope: ["user:email"] }));

router.get(
    "/github/callback",
    passport.authenticate("github", {
        successRedirect: "http://localhost:3000/",
        failureRedirect: "login/failed"
    })
);

module.exports = router;