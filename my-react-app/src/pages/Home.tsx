// Home.js
import React from "react";
import "../styles/Home.css";

export default function Home() {
  console.log("Home component rendered"); // Check console output
  return (
    <div className="main-home">
      <header className="header-main">THIS IS THE HEADER</header>
      <div className="content">THIS IS THE TEXT</div>
    </div>
  ); // Basic element to confirm rendering
}
