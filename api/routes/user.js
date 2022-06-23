const {deleteUser, updateUser, getUser, getUsers} = require("../controllers/user");
const router = require("express").Router();

// TEST
router.get("/", (req, res) => {
    res.send("user route...");
})

// UPDATE
router.put("/:id", updateUser);

// DELETE
router.delete("/:id", deleteUser);

// GET
router.get("/:id", getUser);

// GET ALL
router.get("/:id/all", getUsers);

module.exports = router;