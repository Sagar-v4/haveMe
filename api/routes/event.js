
const router = require("express").Router();
const {createEvent, updateEvent, getEvent, getEvents, deleteEvent, getUserEvents, updateEventQR, getEventQR, } = require("../controllers/event");

// TEST
router.get("/", (req, res) => {
    res.send("event route...");
})

// CREATE
router.post("/", createEvent);

// UPDATE
router.put("/:id", updateEvent);

// UPDATE QR
router.put("/:id/qr", updateEventQR);

// DELETE
router.delete("/:id", deleteEvent);

// GET
router.get("/:id", getEvent);

// GET
router.get("/:id/qr", getEventQR);

// GET ALL user
router.get("/:id/user", getUserEvents);

// GET ALL admin
router.get("/:id/all", getEvents);

module.exports = router;