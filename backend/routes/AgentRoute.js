const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const baseController = require("../controllers/baseController");
const Model = require("../models/Agent");

router.post("/agent", authMiddleware, baseController.create(Model));
router.get("/agent", authMiddleware, baseController.getAll(Model));
router.get("/agent/:id", authMiddleware, baseController.getById(Model));
router.put("/agent/:id", authMiddleware, baseController.update(Model));
router.delete("/agent/:id", authMiddleware, baseController.del(Model));

module.exports = router;
