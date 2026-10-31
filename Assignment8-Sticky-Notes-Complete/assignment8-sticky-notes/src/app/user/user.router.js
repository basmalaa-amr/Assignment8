const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

router.get("/", userController.getUser);
router.delete("/", userController.deleteUser);
router.patch("/:id", userController.updateUser);

module.exports = router;
