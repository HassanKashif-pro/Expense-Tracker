import React, { useEffect, useState } from "react";
import "../styles/history.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formSchema } from "./Income";
import { format } from "date-fns";
import Header from "@/components/Header";

const History = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const fetchIncomes = async () => {
    try {
      const response = await axios.get("http://localhost:4000/income", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      setIncomeData(response.data);
    } catch (error: any) {
      console.error("Error fetching incomes:", error.message);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/expense", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      setExpenseData(response.data);
    } catch (error: any) {
      console.error("Error fetching expenses:", error.message);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      amount: 0,
      type: "Other",
      description: "",
      date: new Date().toISOString().split("T")[0], // Default to today's date
    },
  });

  useEffect(() => {
    fetchIncomes();
    fetchExpenses();
  }, []);

  // Combine and sort incomes and expenses by date
  const combinedTransactions = [...incomeData, ...expenseData].sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="history-main">
      <Header />
      <div className="card" style={{ height: "100%", margin: "20px" }}>
        <h1 className="expense-title">Transaction History</h1>
        <div className="history-header">
          <div className="header-title">Title</div>
          <div className="header-amount">Amount</div>
          <div className="header-type">Type</div>
          <div className="header-date">Date</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {combinedTransactions.length > 0 ? (
            combinedTransactions.map((transaction: any) => {
              const formattedDate = format(
                new Date(transaction.date),
                "dd/MM/yyyy"
              );
              const isIncome = incomeData.some(
                (income: any) => income.id === transaction.id
              );
              return (
                <div className="miniCards-wrapper" key={transaction.id}>
                  <div className="history-Cards">
                    <div className="history-title">{transaction.title}</div>
                    <div className="history-amount">{transaction.amount}$</div>
                    <div className="history-description">
                      {transaction.type}
                    </div>
                    <div className="history-date">{formattedDate}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No transactions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
