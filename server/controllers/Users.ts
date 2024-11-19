const bcrypt = require("bcrypt");
import User from "../models/UserSchema";
import { Request, Response } from "express";

// Sign Up Function
export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    // Validations
    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are required!" });
      return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists!" });
      return;
    }

    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be at least 6 characters long!" });
      return;
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Example placeholder for the Sign In function
export const signIn = async (req: Request, res: Response): Promise<void> => {
  res
    .status(501)
    .json({ message: "Sign In functionality not implemented yet." });
};
