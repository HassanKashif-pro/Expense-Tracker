import Expense from "../models/ExpenseSchema";
import Income from "../models/IncomeSchema";
import User from "../models/User";
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Ensure the .env file is correctly loaded
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI;
const cors = require("cors");

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

if (!mongoURI) {
  console.error("Error: MONGO_URI is not defined in .env");
  process.exit(1); // Stop the server if there's no URI
}

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
    const user = new User({}); // This should work
    const income = new Income({}); // This should work
    const expense = new Expense({}); // This should work
  })
  .catch((err: any) => console.error(err));

app.post("/signup", async (req: any, res: any) => {
  const { username, email, password } = req.body;

  // Validate the data
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(User);
    // Create a new user instance
    const newUser = new User({ username, email, password: hashedPassword });

    // Save user to the database
    await newUser.save();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    {
      console.error("Error signing up user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
