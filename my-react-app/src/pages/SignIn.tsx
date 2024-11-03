"use client";

import "../styles/SignIn.css";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(20, { message: "Password cannot exceed 20 characters." }),
});

const SignIn = () => {
  // 1. Define your form.
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
              padding: "20px",
            }}
          >
            <h1>Welcome</h1>
            <p>Start Managing Your Finances Today</p>
          </div>
          <div className="Register-Forms">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="FormLabel">Email Here</FormLabel>
                      <FormControl>
                        <Input
                          prefix={<FontAwesomeIcon icon={faUser} />}
                          type="email"
                          placeholder="example@email.com"
                          {...field}
                          className="custom-input"
                          style={{ marginBottom: "20px" }}
                        />
                      </FormControl>
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
                        <Input
                          prefix={<FontAwesomeIcon icon={faLock} />}
                          type="password"
                          placeholder="at least 8 characters"
                          {...field}
                          className="custom-input"
                        />
                      </FormControl>
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
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
