const router = require("express").Router();
const {register, login} = require("../controllers/auth");

// AUTH TESTING
router.get("/", (req, res) => {
    res.status(200).send("auth route...");
})

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);



module.exports = router;