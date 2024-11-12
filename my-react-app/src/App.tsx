import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Expense from "./pages/Expense";
import History from "./pages/History";
import Signin from "./pages/SignIn.tsx";
import Signup from "./pages/SignUp.tsx";
import Stats from "./pages/Stats.tsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/history" element={<History />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
