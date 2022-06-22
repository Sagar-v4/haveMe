
const router = require("express").Router();
const {createGroup, updateGroup, getGroup, getGroups, deleteGroup, } = require("../controllers/group");

// TEST
router.get("/", (req, res) => {
    res.send("group route...");
})

// CREATE
router.post("/", createGroup);

// UPDATE
router.put("/:id", updateGroup);

// DELETE
router.delete("/:id", deleteGroup);

// GET
router.get("/:id", getGroup);

// GET ALL
router.get("/:id/all", getGroups);

module.exports = router;