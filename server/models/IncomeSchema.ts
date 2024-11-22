import mongoose from "mongoose";

export interface IIncome extends Document {
  title: string;
  description: string;
  amount: number;
  date: Date;
  type: string;
}

const IncomeSchema = new mongoose.Schema(
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
export const Income = mongoose.model<IIncome>("Income", IncomeSchema);
