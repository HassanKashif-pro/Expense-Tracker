// Home.js
import React from "react";
import "../styles/Home.css";
import { Component } from "@/components/ui/lineChart";
import Header from "@/components/Header";

export default function Home() {
  console.log("Home component rendered"); // Check console output
  return (
    <div className="main-home">
      <Header />
      <div className="content">
        <div className="dashboard">
          <div className="top-row">
            <div className="card balance">
              <p style={{ color: "#598EFF", margin: "0" }}>Balance</p>
              <p
                style={{
                  color: "#2260FF",
                  fontSize: "30px",
                  margin: "0",
                  marginTop: "5px",
                  font: "100",
                }}
              >
                $5,502.45
              </p>
            </div>
            <div className="card incomes">
              <p style={{ color: "#598EFF", margin: "0" }}>Income</p>
              <p
                style={{
                  fontSize: "30px",
                  margin: "0",
                  marginTop: "5px",
                  font: "100",
                }}
              >
                $2,502.45
              </p>
            </div>
            <div className="card expenses">
              <p style={{ color: "#598EFF", margin: "0" }}>Expenses</p>
              <p
                style={{
                  fontSize: "30px",
                  margin: "0",
                  marginTop: "5px",
                  font: "100",
                }}
              >
                $1,502.45
              </p>
            </div>
          </div>

          <div className="middle-row">
            <div className="card portfolio-analytics">
              <Component />
            </div>
            <div className="card your-cards">Your Cards</div>
          </div>

          <div className="bottom-row">
            <div className="card recent-transactions">Recent Transactions</div>
            <div className="card stocks-of-the-day">Stocks of the Day</div>
          </div>
        </div>
      </div>
    </div>
  ); // Basic element to confirm rendering
}
