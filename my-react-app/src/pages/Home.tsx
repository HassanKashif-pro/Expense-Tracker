// Home.js
import React from "react";
import "../styles/Home.css";

export default function Home() {
  console.log("Home component rendered"); // Check console output
  return (
    <div className="main-home">
      <header className="header-main">
        <p
          style={{
            color: "#2260FF",
            fontSize: "28px",
            fontWeight: "700",
            margin: "0",
            marginTop: "25px",
          }}
        >
          Welcome,
        </p>
        <p style={{ color: "#598EFF", margin: "0", paddingBottom: "20px" }}>
          Let's check your expenses today !
        </p>
      </header>
      <div className="content">
        <div className="dashboard">
          <div className="top-row">
            <div className="card balance">Balance: $5,502.45</div>
            <div className="card incomes">Incomes: $9,450.00</div>
            <div className="card expenses">Expenses: $3,945.55</div>
          </div>

          <div className="middle-row">
            <div className="card portfolio-analytics">Portfolio Analytics</div>
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
