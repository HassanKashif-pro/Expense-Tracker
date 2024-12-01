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
  }, []);

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
          {incomeData.length > 0 ? (
            incomeData.map((transaction: any) => {
              const formattedDate = format(
                new Date(transaction.date),
                "dd/MM/yyyy"
              );
              return (
                <div className="miniCards-wrapper">
                  <div key={transaction.id} className="history-Cards">
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
