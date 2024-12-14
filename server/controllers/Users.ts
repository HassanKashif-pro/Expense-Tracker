const bcrypt = require("bcrypt");
import { error } from "console";
import User from "../models/UserSchema";
const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();
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

export const fetchSignUp = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const signUps = await User.find().sort({ createdAt: -1 });

    res.status(200).json(signUps);
  } catch (error) {
    console.error("Error fetching sign-up data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Example placeholder for the Sign In function
export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User not found!" });
      return;
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(400).json({ message: "Invalid password!" });
      return;
    }
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Error during user sign in:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
