import { Button } from "@/components/ui/button";
import "../styles/SignIn.css";
import { Form } from "@/components/ui/form";

const SignIn = () => {
  return (
    <div className="Main-section">
      <div className="Side-section-wrapper">
        <div className="Side-section-left">
          <h1 style={{ top: "0", left: "30px" }}>Expenso</h1>
          <div>
            <img src="/R.png" />
          </div>
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              bottom: "50px",
              position: "absolute",
            }}
          >
            <p>
              Welcome to&nbsp;&nbsp;
              <span style={{ color: "blue" }}>Expenso</span>
            </p>
            <span
              style={{ color: "#4285F4", position: "relative", left: "15px" }}
            >
              Experience Effortless Financial Tracking
            </span>
          </div>
        </div>
        <div className="Side-section-right">
          <div
            style={{
              top: "0",
              position: "absolute",
              right: "19%",
              color: "#fff",
            }}
          >
            <h1>Welcome</h1>
            <p>Start Managing Your Finances Today</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
