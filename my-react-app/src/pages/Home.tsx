// Home.js
import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { Component } from "@/components/ui/lineChart";
import Header from "@/components/Header";
import axios from "axios";

export default function Home() {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
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
            <div className="card balance">
              <p style={{ margin: "0", fontSize: "20px" }}>Balance</p>
              <p
                style={{
                  color: "#2260FF",
                  fontSize: "30px",
                  margin: "0",
                  marginTop: "5px",
                  font: "100",
                }}
              ></p>
            </div>
            <div className="card incomes">
              <p
                style={{
                  margin: "0",
                  fontSize: "20px",
                }}
              >
                Income
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
            <div className="card expenses">
              <p style={{ margin: "0", fontSize: "20px" }}>Expenses</p>
              <p
                style={{
                  fontSize: "30px",
                  margin: "0",
                  marginTop: "5px",
                  font: "100",
                  color: "red",
                }}
              >
                - $
                {expenseData.reduce(
                  (total: number, income: any) => total + income.amount,
                  0
                )}
              </p>
            </div>
          </div>

          <div className="middle-row">
            <div className="card portfolio-analytics">
              <Component />
            </div>
            <div className="card your-cards">Recent Transactions</div>
          </div>
        </div>
      </div>
    </div>
  ); // Basic element to confirm rendering
}
