import Expense from "../models/ExpenseSchema";

export const addExpense = async (req: any, res: any) => {
  const { title, amount, type, description, date } = req.body;

  const expense = new Expense({
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
    await expense.save();
    res.status(200).json({ message: "expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(expense);
};

export const getExpense = async (req: any, res: any) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteExpense = async (req: any, res: any) => {
  const { id } = req.params;
  Expense.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: "expense Deleted" });
    })
    .catch(() => {
      res.status(500).json({ message: "Server Error" });
    });
};
