const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Ensure the .env file is correctly loaded
const bcrypt = require("bcrypt");
const User = require("../models/User.ts"); // Adjust this path based on your project

const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

app.use(express.json()); // Middleware to parse JSON bodies

if (!mongoURI) {
  console.error("Error: MONGO_URI is not defined in .env");
  process.exit(1); // Stop the server if there's no URI
}

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: any) => console.error("Failed to connect to MongoDB", err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
