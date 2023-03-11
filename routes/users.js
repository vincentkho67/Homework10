const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const User = require("../models/users");

router.get("/", UserController.findUser);
router.get("/:id", UserController.findById);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;