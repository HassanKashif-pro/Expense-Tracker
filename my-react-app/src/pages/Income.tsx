import Header from "@/components/Header";
import "../styles/Home.css";
import "../styles/expense.css";

function Income() {
  return (
    <div className="expense-main">
      <Header />
      <div className="card" style={{ height: "74vh", margin: "20px" }}>
        <div className="expense-title">Income</div>
        <div>Total Expenses</div>
      </div>
    </div>
  );
}

export default Income;
