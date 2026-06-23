const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./route/user.Route.js");
const productRoute = require("./route/Product.Router.js");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello pace-setter autos your liveserver is on!");
});
app.use("/api/auth", userRoute);
app.use("/api/products", productRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅successfully connected to MongoDB"))
  .catch((error) => console.log("❌ MongoDB connection error:", error));
