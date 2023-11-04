const express = require("express");
const router = express.Router();
const {
  generateModelAndRoute,
  getModels,
} = require("../controllers/dynamicController");

router.get("/", (req, res) => res.json("Server working.."));
router.get("/models", getModels);
router.post("/generate-model", generateModelAndRoute);

module.exports = router;
