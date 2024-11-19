import express from "express";
import { addIncome, getIncomes, deleteIncome } from "../controllers/Incomes";

const router = express.Router();

router
  .post("/income", addIncome)
  .get("/incomes", getIncomes)
  .delete("/income/:id", deleteIncome);
export default router;
