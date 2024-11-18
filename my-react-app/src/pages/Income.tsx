import Header from "@/components/Header";
import "../styles/Home.css";
import "../styles/expense.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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

// Form schema definition
const formSchema = z.object({
  Title: z.string().min(1, "Title is required"),
  Description: z.string().min(1, "Description is required"),
  Type: z.enum([
    "Investment",
    "Salary",
    "Other",
    "Savings",
    "Bank Transfer",
    "Stocks",
  ]),
  Amount: z.number().min(0, "Amount must be a positive number"),
  Date: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid date",
  }),
});

function Income() {
  // Initialize form with useForm hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Title: "",
      Description: "",
      Type: "Other",
      Amount: 0,
      Date: new Date(),
    },
  });

  // Handle form submission
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
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
                  name="Title"
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
                  name="Description"
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
                  name="Amount"
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
                  name="Date"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="input-forms"
                          type="date"
                          value={field.value.toISOString().split("T")[0]} // Format date for input
                          onChange={(e) =>
                            field.onChange(new Date(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Type Field (Dropdown) */}
                <FormField
                  control={form.control}
                  name="Type"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="custom-select" // Custom styling for the Select component
                        >
                          <SelectTrigger className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-300 shadow-lg rounded-md">
                            <SelectItem
                              value="Investment"
                              className="hover:bg-gray-100 px-4 py-2"
                            >
                              Investment
                            </SelectItem>
                            <SelectItem
                              value="Salary"
                              className="hover:bg-gray-100 px-4 py-2"
                            >
                              Salary
                            </SelectItem>
                            <SelectItem
                              value="Other"
                              className="hover:bg-gray-100 px-4 py-2"
                            >
                              Other
                            </SelectItem>
                            <SelectItem
                              value="Savings"
                              className="hover:bg-gray-100 px-4 py-2"
                            >
                              Savings
                            </SelectItem>
                            <SelectItem
                              value="Bank Transfer"
                              className="hover:bg-gray-100 px-4 py-2"
                            >
                              Bank Transfer
                            </SelectItem>
                            <SelectItem
                              value="Stocks"
                              className="hover:bg-gray-100 px-4 py-2"
                            >
                              Stocks
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
          <div className="income-card">This is the income card</div>
        </div>
      </div>
    </div>
  );
}

export default Income;
