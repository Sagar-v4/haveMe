const router = require("express").Router();
const {updateUser, deleteUser, getUser, getUsers} = require("../controllers/user");
const {verifyToken, verifyUser, verifyAdmin} = require("../utils/verifyToken");

// CHECK AUTHENTICATION
router.get(
    "/checkauthentication",
    verifyToken,
    (req, res, next) => {
        res.send("you are logged in!")
    });

// CHECK USER
router.get(
    "/checkuser/:id",
    verifyUser,
    (req, res, next) => {
        res.send("hello user, you are logged in and can delete your account!")
    });

// CHECK ADMIN
router.get(
    "/checkadmin/:id",
    verifyAdmin,
    (req, res, next) => {
        res.send("hello admin, you are logged in and can delete all accounts!")
    });

// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE
router.delete("/:id", verifyUser, deleteUser);

// GET
router.get("/:id", verifyUser, getUser);

// GET ALL
router.get("/", verifyAdmin, getUsers);



module.exports = router;