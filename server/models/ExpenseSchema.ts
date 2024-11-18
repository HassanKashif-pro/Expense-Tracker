import mongoose from "mongoose";

export interface IExpense extends Document {
  title: string;
  description: string;
  amount: number;
  date: Date;
  type: string;
}

const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
  },
  { timestamps: true }
);
const Expense = mongoose.model<IExpense>("Expense", ExpenseSchema);

export default Expense;
