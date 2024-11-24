import { Router } from "express";
import { signIn } from "../controllers/Users";

const router = Router();

// Add the signup route
router.post("/", signIn);

export default router;
