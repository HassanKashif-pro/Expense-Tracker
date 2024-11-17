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
      <div className="card" style={{ height: "74vh", margin: "20px" }}>
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
                        <Input placeholder="Enter title" {...field} />
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
                        <Input placeholder="Enter description" {...field} />
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
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Investment">
                              Investment
                            </SelectItem>
                            <SelectItem value="Salary">Salary</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                            <SelectItem value="Savings">Savings</SelectItem>
                            <SelectItem value="Bank Transfer">
                              Bank Transfer
                            </SelectItem>
                            <SelectItem value="Stocks">Stocks</SelectItem>
                          </SelectContent>
                        </Select>
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
