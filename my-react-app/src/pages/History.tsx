import React from "react";
import "../styles/history.css";
import "../styles/expense.css";

const History = () => {
  // Sample data for demonstration purposes
  const transactions = [
    { id: 1, date: "2023-10-01", description: "Groceries", amount: "-$50.00" },
    { id: 2, date: "2023-10-05", description: "Salary", amount: "+$2000.00" },
    { id: 3, date: "2023-10-10", description: "Utilities", amount: "-$100.00" },
  ];

  return (
    <div className="history-main">
      <h1 className="expense-title">Transaction History</h1>
      <div className="cards-wrapper">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="expense-Cards">
            <div className="expenseCard-header">
              <div className="expenseCard-title">{transaction.description}</div>
              <div className="expenseCard-date">{transaction.date}</div>
            </div>
            <div className="expenseCard-amount">{transaction.amount}</div>
            <div className="expenseCard-footer">
              {/* Additional footer content can go here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
