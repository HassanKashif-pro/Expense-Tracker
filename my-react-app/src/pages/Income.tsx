import Header from "@/components/Header";
import "../styles/Home.css";
import "../styles/expense.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns"; // Ensure this is imported correctly
import { Calendar } from "@/components/ui/calendar";

// Form schema definition
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum([
    "Investment",
    "Salary",
    "Other",
    "Savings",
    "Bank Transfer",
    "Stocks",
  ]),
  amount: z.preprocess(
    (value) => parseFloat(value as string),
    z.number().positive("Amount must be positive")
  ),
  date: z
    .string()
    .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Date must be in YYYY-MM-DD format",
    })
    .refine(
      (value) => {
        const date = new Date(value);
        return !isNaN(date.getTime());
      },
      {
        message: "Invalid date",
      }
    ),
});

function Income() {
  const [isLoading, setIsLoading] = useState(false);
  const [incomeData, setIncomeData] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      amount: 0,
      type: "Other",
      description: "",
      date: new Date().toISOString().split("T")[0], // Default to today's date
    },
  });
  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/income", {
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        setIncomeData(response.data);
      } catch (error: any) {
        console.error("Error fetching incomes:", error.message);
      }
    };

    fetchIncomes();
  }, []);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/income",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        alert("Income successfully recorded!");

        // Clear the form inputs after submission
        e.target.reset(); // Reset the form (works for native HTML forms)
      }
    } catch (error: any) {
      console.error(
        "Error recording income:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to record income. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="expense-main">
      <Header />
      <div className="card" style={{ height: "80vh", margin: "20px" }}>
        <div className="expense-title">Income</div>
        <div className="total-card">TOTAL INCOME</div>
        <div className="cards-wrapper">
          <div className="form-card">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Title Field */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="input-forms"
                          placeholder="Enter title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Description Field */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="input-forms"
                          placeholder="Enter description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Amount Field */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="input-forms"
                          type="number"
                          placeholder="Enter amount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Date Field */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" aria-label="Pick a date">
                              {field.value ? (
                                format(new Date(field.value), "PPP") // Display a human-readable format
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                              // Ensure field value is updated as an ISO string
                              field.onChange(
                                date ? date.toISOString().split("T")[0] : ""
                              );
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Type Field (Dropdown) */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Investment",
                              "Salary",
                              "Other",
                              "Savings",
                              "Bank Transfer",
                              "Stocks",
                            ].map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </Form>
          </div>
          <div className="income-card">
            This is the income card
            <ul>
              {incomeData.map((income: any, index) => (
                <li key={index}>
                  {income.title} - ${income.amount}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Income;
