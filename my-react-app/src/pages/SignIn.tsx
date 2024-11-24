import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "../styles/SignIn.css"; // Assuming your CSS file contains styles.

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleGoogle = async (e) => {
    e.preventDefault();
    // Logic for Google Sign-In
    console.log("Google Sign-In Clicked");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email address.";
      isValid = false;
    }
    if (formData.password.length < 8 || formData.password.length > 20) {
      newErrors.password = "Password must be between 8 and 20 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted", formData);
      // Perform login or submit form data
    }
  };

  const handleSignUp = () => {
    window.location.href = "/signup";
  };

  const OrSeparator = () => (
    <div className="or-separator">
      <div className="line"></div>
      <span>or</span>
      <div className="line"></div>
    </div>
  );

  return (
    <div className="Main-section">
      <div className="Side-section-wrapper">
        <div className="Side-section-left">
          <h1 style={{ top: "0", left: "30px" }} className="podkova-font">
            Expenso
          </h1>
          <div>
            <img
              src="/R.png"
              alt="Logo"
              style={{ height: "95%", width: "100%", position: "relative" }}
            />
          </div>
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              margin: "0",
              bottom: "35px",
              position: "absolute",
            }}
          >
            <p style={{ margin: "0" }}>
              Welcome to&nbsp;
              <span style={{ color: "blue", fontWeight: "800" }}>Expenso</span>
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
              top: "20px",
              marginRight: "90px",
              position: "absolute",
              color: "#fff",
              fontSize: "15px",
            }}
          >
            <h1 style={{ fontWeight: "600", fontSize: "35px" }}>Welcome</h1>
            <p> Start Managing Your Finances Today</p>
          </div>
          <div className="Register-Forms">
            <form onSubmit={handleSubmit}>
              <div className="form-item">
                <label className="FormLabel">Email Here</label>
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faEnvelope} className="custom-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="custom-input"
                  />
                </div>
                {errors.email && (
                  <p style={{ color: "red", margin: "0" }}>{errors.email}</p>
                )}
              </div>

              <div className="form-item">
                <label className="FormLabel">Password Here</label>
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faLock} className="custom-icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="at least 8 characters"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="custom-input"
                  />
                </div>
                {errors.password && (
                  <p style={{ color: "red", margin: "0" }}>{errors.password}</p>
                )}
              </div>

              <div className="form-footer">
                <a href="#" className="forgot-password-link">
                  Forget password?
                </a>
                <button type="submit" className="login-btn">
                  Login
                </button>
              </div>
              <OrSeparator />
              <button
                onClick={handleGoogle}
                className="google-btn"
                style={{ marginBottom: "30px" }}
              >
                <FontAwesomeIcon
                  icon={faGoogle}
                  style={{ marginRight: "20px" }}
                />
                Sign in with Google
              </button>
              <button
                onClick={handleSignUp}
                className="register-btn"
                style={{ marginTop: "10px" }}
              >
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
