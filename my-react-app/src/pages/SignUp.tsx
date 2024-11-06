"use client";

import "../styles/SignIn.css";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.ts";
import { z } from "zod";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(20, { message: "Password cannot exceed 20 characters." }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." }),
});

interface AuthData {
  userId: string;
  username: string;
}

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authData, setAuthData] = useState<AuthData | null>(null);

  // Initialize form with react-hook-form and zod for validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  // Function to send user data to the server
  const signUp = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAuthData(response.data); // Store response if needed
      alert("Successfully signed up!");
    } catch (error) {
      console.error(
        "Error signing up:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to sign up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    signUp(values);
  };

  const handleGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const OrSeparator = () => (
    <div className="or-separator">
      <div className="line"></div>
      <span>or</span>
      <div className="line"></div>
    </div>
  );

  const handleSignIn = () => {
    window.location.href = "/signin";
  };

  return (
    <div className="Main-section">
      <div className="Side-section-wrapper">
        <div className="Side-section-left">
          <h1 style={{ top: "0", left: "30px" }} className="podkova-font">
            Expenso
          </h1>
          <div>
            <img
              src="/S.png"
              alt="Logo"
              style={{
                height: "75%",
                width: "100%",
                position: "relative",
                top: "10%",
              }}
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
              top: "0",
              position: "absolute",
              color: "#fff",
              fontSize: "20px",
            }}
          >
            <h1>Welcome</h1>
            <p> Start Managing Your Finances Today</p>
          </div>
          <div className="Register-Forms">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="FormLabel">Email Here</FormLabel>
                      <FormControl>
                        <div className="input-wrapper">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="custom-icon"
                          />
                          <Input
                            type="email"
                            placeholder="example@email.com"
                            {...field}
                            className="custom-input"
                          />
                        </div>
                      </FormControl>
                      {fieldState.error && (
                        <p
                          style={{
                            margin: "0",
                            position: "relative",
                            color: "red",
                          }}
                        >
                          {fieldState.error.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="FormLabel">Password Here</FormLabel>
                      <FormControl>
                        <div className="input-wrapper">
                          <FontAwesomeIcon
                            icon={faLock}
                            className="custom-icon"
                          />
                          <Input
                            type="password"
                            placeholder="at least 8 characters"
                            {...field}
                            className="custom-input"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="FormLabel">Username Here</FormLabel>
                      <FormControl>
                        <div className="input-wrapper">
                          <FontAwesomeIcon
                            icon={faUser}
                            className="custom-icon"
                          />
                          <Input
                            type="username"
                            placeholder="display name"
                            autoComplete="new-password"
                            {...field}
                            className="custom-input"
                          />
                        </div>
                      </FormControl>
                      {fieldState.error && (
                        <p
                          style={{
                            margin: "0",
                            position: "relative",
                            color: "red",
                          }}
                        >
                          {fieldState.error.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <div className="form-footer">
                  <Button type="submit" className="login-btn">
                    {isLoading ? "Signing Up..." : "Sign Up"}
                  </Button>
                </div>
                <OrSeparator />
                <Button
                  onClick={handleGoogle}
                  className="google-btn"
                  style={{ marginBottom: "30px" }}
                >
                  <FontAwesomeIcon
                    icon={faGoogle}
                    style={{
                      marginRight: "20px",
                      right: "10px",
                    }}
                  />
                  Sign up with Google
                </Button>
                <Button className="register-btn" onClick={handleSignIn}>
                  SIGN In
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
