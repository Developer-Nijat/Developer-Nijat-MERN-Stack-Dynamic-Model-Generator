const express = require("express");
const router = express.Router();

const baseController = require("../controllers/baseController");
const Model = require("../models/Author");

router.post("/author", baseController.create(Model));
router.get("/author", baseController.getAll(Model));
router.get("/author/:id", baseController.getById(Model));
router.put("/author/:id", baseController.update(Model));
router.delete("/author/:id", baseController.del(Model));

module.exports = router;
