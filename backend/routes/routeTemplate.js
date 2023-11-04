const express = require("express");
const router = express.Router();

const baseController = require("../controllers/baseController");
const Model = require("../models/{{ModelName}}");

router.post("/{{modelName}}", baseController.create(Model));
router.get("/{{modelName}}", baseController.getAll(Model));
router.get("/{{modelName}}/:id", baseController.getById(Model));
router.put("/{{modelName}}/:id", baseController.update(Model));
router.delete("/{{modelName}}/:id", baseController.del(Model));

module.exports = router;
