
const router = require("express").Router();
const {createEvent, updateEvent, getEvent, getEvents, deleteEvent, } = require("../controllers/event");

// TEST
router.get("/", (req, res) => {
    res.send("event route...");
})

// CREATE
router.post("/", createEvent);

// UPDATE
router.put("/:id", updateEvent);

// DELETE
router.delete("/:id", deleteEvent);

// GET
router.get("/:id", getEvent);

// GET ALL
router.get("/:id/all", getEvents);

module.exports = router;