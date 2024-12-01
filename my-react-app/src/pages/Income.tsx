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
import {
  FaChartLine,
  FaBriefcase,
  FaEllipsisH,
  FaPiggyBank,
  FaExchangeAlt,
  FaCoins,
  FaGraduationCap,
  FaShoppingBasket,
  FaHeartbeat,
  FaReceipt,
  FaUtensils,
  FaTshirt,
  FaPlane,
} from "react-icons/fa";

const cardIcon = [
  { type: "Investment", icon: <FaChartLine /> },
  { type: "Salary", icon: <FaBriefcase /> },
  { type: "Savings", icon: <FaPiggyBank /> },
  { type: "Bank Transfer", icon: <FaExchangeAlt /> },
  { type: "Stocks", icon: <FaCoins /> },
  { type: "Education", icon: <FaGraduationCap /> },
  { type: "Groceries", icon: <FaShoppingBasket /> },
  { type: "Health", icon: <FaHeartbeat /> },
  { type: "Subscriptions", icon: <FaReceipt /> },
  { type: "Takeaways", icon: <FaUtensils /> },
  { type: "Clothing", icon: <FaTshirt /> },
  { type: "Traveling", icon: <FaPlane /> },
  { type: "Other", icon: <FaEllipsisH /> },
];

// Form schema definition
export const formSchema = z.object({
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
    fetchIncomes();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>, e) => {
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

        // Reset the form
        form.reset();

        // Fetch the updated incomes
        fetchIncomes();
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
      <div className="card" style={{ height: "100vh", margin: "20px" }}>
        <div className="expense-title">Income</div>
        <div className="total-card">
          TOTAL INCOME:{" "}
          <div>
            <h3>
              &nbsp; $
              {incomeData.reduce(
                (total: number, income: any) => total + income.amount,
                0
              )}
            </h3>
          </div>
        </div>

        {/* Cards Wrapper */}
        <div className="cards-wrapper">
          {/* Form Section */}
          <div className="form-card">
            <div className="form-header">Add Incomes Here</div>
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
                                format(new Date(field.value), "PPP")
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
                            onSelect={(date) =>
                              field.onChange(
                                date ? date.toISOString().split("T")[0] : ""
                              )
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Type Dropdown */}
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

          {/* Recent Incomes Section */}
          <div className="income-card">
            <div className="income-header">Recent Incomes</div>
            <ul>
              {incomeData.slice(-4).map((income: any, index: number) => {
                const formattedDate = format(
                  new Date(income.date),
                  "dd/MM/yyyy"
                );
                return (
                  <li key={index} className="expense-Cards">
                    <div className="expenseCard-header">
                      <div className="expenseCard-icon">
                        {/* Optional icon rendering */}
                      </div>
                      <div className="expenseCard-title">{income.title} -</div>
                      <div className="expenseCard-amount">${income.amount}</div>
                    </div>
                    <div className="expenseCard-footer">
                      <div className="expenseCard-type">{income.type}</div>
                      <div className="expenseCard-date">{formattedDate}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Income;
