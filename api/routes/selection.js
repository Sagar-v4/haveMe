
const router = require("express").Router();
const {createSelection, updateSelection, getSelection, getSelections, deleteSelection, } = require("../controllers/selection");

// TEST
router.get("/", (req, res) => {
    res.send("selection route...");
})

// CREATE
router.post("/", createSelection);

// UPDATE
router.put("/:selection", updateSelection);

// DELETE
router.delete("/:selection", deleteSelection);

// GET
router.get("/:event", getSelection);

// GET ALL
router.get("/:id/all", getSelections);

module.exports = router;