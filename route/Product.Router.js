const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller.js");
router.post("/", createProduct);
router.get("/all", getAllProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
module.exports = router;
