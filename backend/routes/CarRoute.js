const express = require("express");
const router = express.Router();

const baseController = require("../controllers/baseController");
const Model = require("../models/Car");

router.post("/car", baseController.create(Model));
router.get("/car", baseController.getAll(Model));
router.get("/car/:id", baseController.getById(Model));
router.put("/car/:id", baseController.update(Model));
router.delete("/car/:id", baseController.del(Model));

module.exports = router;
