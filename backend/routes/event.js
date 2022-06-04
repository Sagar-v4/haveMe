const router = require("express").Router();
const {createEvent, updateEvent, deleteEvent, getEvent, getEvents} = require("../controllers/event");
const {verifyToken, verifyUser, verifyAdmin} = require("../utils/verifyToken");

// CREATE
router.post("/", verifyUser, createEvent);

// UPDATE
router.put("/:id", verifyUser, updateEvent);

// DELETE
router.delete("/:id", verifyUser, deleteEvent);

// GET
router.get("/:id", verifyUser, getEvent);

// GET ALL
router.get("/", verifyAdmin, getEvents);



module.exports = router;