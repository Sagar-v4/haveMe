
const router = require("express").Router();
const {createPresence, updatePresence, deletePresence, getPresence, getPresences, getUserPresences, getEventPresences} = require("../controllers/presence");

// TEST
router.get("/", (req, res) => {
    res.send("presence route...");
})

// CREATE
router.post("/", createPresence);

// UPDATE
router.put("/:id", updatePresence);

// DELETE
router.delete("/:id", deletePresence);

// GET
router.get("/:id", getPresence);

// GET ALL
router.get("/:id/all", getPresences);

// GET ALL USER PRESENCE
router.get("/:id/user", getUserPresences);

// GET ALL EVENT PRESENCE
router.get("/:id/event", getEventPresences);

module.exports = router;