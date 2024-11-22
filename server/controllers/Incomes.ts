import { Income } from "../models/IncomeSchema";

export const addIncome = async (req: any, res: any) => {
  const { title, amount, type, description, date } = req.body;

  const income = new Income({
    title,
    amount,
    type,
    description,
    date,
  });

  try {
    //validations
    if (!title || !type || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await income.save();
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(income);
};

export const getIncomes = async (req: any, res: any) => {
  try {
    const incomes = await Income.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteIncome = async (req: any, res: any) => {
  const { id } = req.params;
  Income.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: "Income Deleted" });
    })
    .catch(() => {
      res.status(500).json({ message: "Server Error" });
    });
};
