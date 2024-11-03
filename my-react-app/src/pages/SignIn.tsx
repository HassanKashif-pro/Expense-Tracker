"use client";

import "../styles/SignIn.css";
import { Button } from "@/components/ui/button";
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
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="Main-section">
      <div className="Side-section-wrapper">
        <div className="Side-section-left">
          <h1 style={{ top: "0", left: "30px" }} className="podkova-font">
            Expenso
          </h1>
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
              right: "19%",
              color: "#fff",
            }}
          >
            <h1>Welcome</h1>
            <p>Start Managing Your Finances Today</p>
          </div>
          <div className="Register-Forms">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Here</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Here</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="at least 8 characters"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
