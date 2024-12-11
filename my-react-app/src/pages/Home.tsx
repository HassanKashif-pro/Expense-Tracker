// Home.js
import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import "../styles/History.css";
import { Component } from "@/components/ui/lineChart";
import Header from "@/components/Header";
import axios from "axios";

export default function Home() {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

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

      const dynamicChartData = aggregateDataByMonth(
        incomeResponse.data,
        expenseResponse.data
      );
      setChartData(dynamicChartData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <div className="main-home">
      <Header />
      <div className="content">
        <div className="dashboard">
          <div className="top-row">
            <div
              className="card"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
                height: "70px",
              }}
            >
              <p style={{ margin: "0", fontSize: "20px", fontWeight: "520" }}>
                Balance:
              </p>
              <p
                style={{
                  color: "#2260FF",
                  fontSize: "30px",
                  font: "100",
                }}
              >
                {(() => {
                  const totalIncome = incomeData.reduce(
                    (total: number, income: any) => total + income.amount,
                    0
                  );
                  const totalExpense = expenseData.reduce(
                    (total: number, expense: any) => total + expense.amount,
                    0
                  );
                  const balance = totalIncome - totalExpense;
                  return balance < 0 ? `-$${Math.abs(balance)}` : `$${balance}`;
                })()}
              </p>
            </div>
            <div
              className="card"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                height: "70px",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontSize: "20px",
                  fontWeight: "520",
                }}
              >
                Income:
              </p>
              <p
                style={{
                  fontSize: "30px",
                  margin: "0",
                  marginTop: "5px",
                  font: "100",
                  color: "green",
                }}
              >
                $
                {incomeData.reduce(
                  (total: number, income: any) => total + income.amount,
                  0
                )}
              </p>
            </div>
            <div
              className="card"
              style={{
                display: "flex",
                flexDirection: "row",
                height: "70px",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <p style={{ margin: "0", fontSize: "20px", fontWeight: "520" }}>
                Expenses:
              </p>
              <p
                style={{
                  fontSize: "30px",
                  font: "100",
                  color: "red",
                }}
              >
                -$
                {expenseData.reduce(
                  (total: number, income: any) => total + income.amount,
                  0
                )}
              </p>
            </div>
          </div>

          <div className="middle-row">
            <div className="card portfolio-analytics">
              <Component chartData={chartData} />
            </div>

            <div className="card your-cards">
              <h3>Recent Transactions</h3>
              {(() => {
                const transactions = [
                  ...incomeData.slice(-3).map((transaction: any) => ({
                    ...transaction,
                    type: "Income",
                  })),
                  ...expenseData.slice(-3).map((transaction: any) => ({
                    ...transaction,
                    type: "Expense",
                  })),
                ].sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                );

                if (transactions.length === 0) {
                  return <p>No recent transactions available.</p>;
                }

                return transactions.map((transaction, index) => {
                  const formattedDate = new Date(
                    transaction.date
                  ).toLocaleDateString();

                  return (
                    <div key={index} className="history-Cards">
                      <div className="history-title">{transaction.title}</div>
                      <div
                        className="history-amount"
                        style={{
                          color:
                            transaction.type === "Income" ? "green" : "red",
                        }}
                      >
                        {transaction.type === "Expense"
                          ? `-$${transaction.amount}`
                          : `$${transaction.amount}`}
                      </div>
                      <div className="history-description">
                        {transaction.type}
                      </div>
                      <div className="history-date">{formattedDate}</div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function aggregateDataByMonth(data: any, data1: any) {
  throw new Error("Function not implemented.");
}
