const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const baseController = require("../controllers/baseController");
const Model = require("../models/{{ModelName}}");

router.post("/{{modelName}}", authMiddleware, baseController.create(Model));
router.get("/{{modelName}}", authMiddleware, baseController.getAll(Model));
router.get("/{{modelName}}/:id", authMiddleware, baseController.getById(Model));
router.put("/{{modelName}}/:id", authMiddleware, baseController.update(Model));
router.delete("/{{modelName}}/:id", authMiddleware, baseController.del(Model));

module.exports = router;
