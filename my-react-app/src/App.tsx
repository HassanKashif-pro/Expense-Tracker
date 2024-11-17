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
import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";
import Income from "./pages/Income";
import IloveBalls from "./components/side-Items";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes that don't require the sidebar */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Routes that include the sidebar */}
        <Route element={<IloveBalls />}>
          <Route path="/home" element={<Home />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/history" element={<History />} />
          <Route path="/income" element={<Income />} />
        </Route>

        {/* Redirect any unknown routes to sign-in */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
