import express from "express";
import mongoose from "mongoose";
const cors = require("cors");
import dotenv from "dotenv";
import incomeRoutes from "../routes/incomeRoutes"; // Import income routes
import expenseRoutes from "../routes/expenseRoutes"; // Import income routes
import signupRouter from "../routes/signupRoutes";
import signinRouter from "../routes/signinRoutes";
dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Check if MongoDB URI is defined
if (!mongoURI) {
  console.error("Error: MONGO_URI is not defined in .env");
  process.exit(1); // Exit if no MongoDB URI
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit on failure
  });

// Define routes
app.use("/signup", signupRouter); // Use user routes
app.use("/signin", signinRouter); // Use user routes
app.use("/income", incomeRoutes); // Use income routes
app.use("/expense", expenseRoutes); // Use income routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
