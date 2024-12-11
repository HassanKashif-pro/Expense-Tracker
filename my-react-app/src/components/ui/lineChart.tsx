"use client";

import { useState, useEffect } from "react";
import { getMonth, format } from "date-fns";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Transaction = {
  date: string;
  amount: number;
};

function aggregateDataByMonth(
  incomeData: Transaction[],
  expenseData: Transaction[]
) {
  const monthlyTotals: Record<number, { income: number; expense: number }> = {};

  // Process income data
  incomeData.forEach(({ date, amount }) => {
    const monthIndex = getMonth(new Date(date)); // 0 for January, 1 for February, etc.
    if (!monthlyTotals[monthIndex]) {
      monthlyTotals[monthIndex] = { income: 0, expense: 0 };
    }
    monthlyTotals[monthIndex].income += amount;
  });

  // Process expense data
  expenseData.forEach(({ date, amount }) => {
    const monthIndex = getMonth(new Date(date));
    if (!monthlyTotals[monthIndex]) {
      monthlyTotals[monthIndex] = { income: 0, expense: 0 };
    }
    monthlyTotals[monthIndex].expense += amount;
  });

  // Map to chart data format
  return Array.from({ length: 12 }, (_, index) => {
    const monthName = format(new Date(2024, index, 1), "MMMM");
    const data = monthlyTotals[index] || { income: 0, expense: 0 };
    return {
      month: monthName,
      desktop: data.expense, // Map to 'desktop' for the chart
      mobile: data.income, // Map to 'mobile' for the chart
    };
  });
}

const chartConfig = {
  desktop: {
    label: "Expenses",
    color: "#FF033E",
  },
  mobile: {
    label: "Incomes",
    color: "#0f9c0a",
  },
} satisfies ChartConfig;

export function Component() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeResponse, expenseResponse] = await Promise.all([
          fetch("http://localhost:4000/income").then((res) => res.json()),
          fetch("http://localhost:4000/expense").then((res) => res.json()),
        ]);

        const aggregatedData = aggregateDataByMonth(
          incomeResponse,
          expenseResponse
        );
        setChartData(aggregatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Gradient</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
