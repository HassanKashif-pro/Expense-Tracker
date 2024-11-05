"use client";

import "../styles/SignIn.css";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.ts";

import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(20, { message: "Password cannot exceed 20 characters." }),
});

const SignIn = () => {
  const handleGoogle = async (e) => {
    e.preventDefault(); // Prevent default form submission if this is inside a form

    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user; // Get the signed-in user
      console.log("User Info:", user);
      // You can now redirect or store the user information
    } catch (error) {
      console.error("Error during sign-in:", error);
      // Handle error (e.g., show a message to the user)
    }
  }; // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values);
  }
  const OrSeparator = () => {
    return (
      <div className="or-separator">
        <div className="line"></div>
        <span>or</span>
        <div className="line"></div>
      </div>
    );
  };
  const handleSignUp = () => {
    window.location.href = "/signup";
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
                  render={({ field, fieldState }) => (
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
                  <Link href="#" className="forgot-password-link">
                    Forget password?
                  </Link>
                  <Button type="submit" className="login-btn">
                    Login
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
                  Sign in with Google
                </Button>
                <Button
                  className="register-btn"
                  style={{ marginTop: "" }}
                  onClick={handleSignUp}
                >
                  SIGN UP
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
