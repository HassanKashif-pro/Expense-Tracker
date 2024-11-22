import express from "express";
import { addIncome, getIncomes, deleteIncome } from "../controllers/Incomes";

const router = express.Router();

router.post("/", addIncome).get("/", getIncomes).delete("/:id", deleteIncome);
export default router;
