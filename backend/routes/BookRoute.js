const express = require("express");
const router = express.Router();

const baseController = require("../controllers/baseController");
const Model = require("../models/Book");

router.post("/book", baseController.create(Model));
router.get("/book", baseController.getAll(Model));
router.get("/book/:id", baseController.getById(Model));
router.put("/book/:id", baseController.update(Model));
router.delete("/book/:id", baseController.del(Model));

module.exports = router;
