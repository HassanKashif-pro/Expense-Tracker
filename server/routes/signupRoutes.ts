import { Router } from "express";
import { fetchSignUp, signUp } from "../controllers/Users";

const router = Router();

// Add the signup route
router.post("/", signUp);
router.get("/", fetchSignUp);

export default router;
