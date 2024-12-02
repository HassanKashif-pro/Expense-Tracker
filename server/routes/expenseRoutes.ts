import express from "express";
import { addExpense, deleteExpense, getExpense } from "../controllers/expenses";

const router = express.Router();

router.post("/", addExpense).get("/", getExpense).delete("/:id", deleteExpense);
export default router;
