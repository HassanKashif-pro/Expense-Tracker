import { Router } from "express";
import { signUp } from "../controllers/Users";

const router = Router();

// Add the signup route
router.post("/", signUp);

export default router;
