const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controller/user.Controller.js");

router.post("/register", register);
router.post("/login", login);
router.get("/users", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
module.exports = router;
