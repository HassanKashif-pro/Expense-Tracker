import React, { useEffect, useState } from "react";
import "../styles/history.css";
import axios from "axios";
import { format } from "date-fns";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { FaFilter } from "react-icons/fa";

const History = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);

  // States for selected year and month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const fetchTransactions = async () => {
    try {
      const [incomeResponse, expenseResponse] = await Promise.all([
        axios.get("http://localhost:4000/income", {
          headers: { "Cache-Control": "no-cache" },
        }),
        axios.get("http://localhost:4000/expense", {
          headers: { "Cache-Control": "no-cache" },
        }),
      ]);

      setIncomeData(incomeResponse.data);
      setExpenseData(expenseResponse.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Combine and filter transactions based on year and month
  const combinedTransactions = [...incomeData, ...expenseData]
    .filter((transaction: any) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getFullYear() === selectedYear &&
        transactionDate.getMonth() + 1 === selectedMonth
      );
    })
    .sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  // Generate year and month options
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="history-main">
      <Header />
      <div className="card" style={{ height: "100%", margin: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 className="expense-title">Transaction History</h1>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="filter-dropdown"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="filter-dropdown"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {new Date(0, month - 1).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
            <Button className="filter-btn">
              <FaFilter style={{ marginRight: "8px" }} />
              Filter
            </Button>
          </div>
        </div>

        <div className="history-header">
          <div className="header-title">Title</div>
          <div className="header-amount">Amount</div>
          <div className="header-type">Type</div>
          <div className="header-date">Date</div>
        </div>

        {loading ? (
          <p>Loading transactions...</p>
        ) : combinedTransactions.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {combinedTransactions.map((transaction: any) => {
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
                    <div
                      className="history-amount"
                      style={{ color: isIncome ? "green" : "red" }}
                    >
                      {transaction.amount}$
                    </div>
                    <div className="history-description">
                      {transaction.type}
                    </div>
                    <div className="history-date">{formattedDate}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No transactions found for the selected month and year.</p>
        )}
      </div>
    </div>
  );
};

export default History;
