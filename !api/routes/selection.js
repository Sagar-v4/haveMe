
const router = require("express").Router();
const {createSelection, updateSelection, getSelection, getSelections, deleteSelection, } = require("../controllers/selection");

// TEST
router.get("/", (req, res) => {
    res.send("selection route...");
})

// CREATE
router.post("/", createSelection);

// UPDATE
router.put("/:id", updateSelection);

// DELETE
router.delete("/:id", deleteSelection);

// GET
router.get("/:id", getSelection);

// GET ALL
router.get("/:id/all", getSelections);

module.exports = router;