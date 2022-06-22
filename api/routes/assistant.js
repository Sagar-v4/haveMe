const {getAssistant, getAssistants, createAssistant, updateAssistant, getEventAssistant, deleteAssistant} = require("../controllers/assistant");
const {createEvent} = require("../controllers/event");
const router = require("express").Router();

// TEST
router.get("/", (req, res) => {
    res.send("assistant route...");
})


// CREATE
router.post("/", createAssistant);

// UPDATE
router.put("/:id", updateAssistant);

// DELETE
router.delete("/:id", deleteAssistant);

// GET
router.get("/:id", getAssistant);

// GET
router.get("/:id/event", getEventAssistant);

// GET ALL
router.get("/:id/all", getAssistants);

module.exports = router;