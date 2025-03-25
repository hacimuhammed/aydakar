"use client";

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { GetMostUsedBrowsers } from "@/dal/analytics/types";

export function MostUsedBrowsersChart({ data }: { data: GetMostUsedBrowsers }) {
  const chartConfig = data
    .map((item) => ({
      [item.clientName]: {
        label: item.clientName,
        color: "hsl(var(--chart-1))",
      },
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {}) satisfies ChartConfig;

  const chartData = data.map((item) => ({
    browser: item.clientName,
    visitors: item._count.clientName,
    fill: "hsl(var(--chart-1))",
  }));
  const mostUsedBrowser = chartData.find(
    (item) =>
      item.visitors === Math.max(...chartData.map((item) => item.visitors))
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tarayıcılar</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="browser"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          En çok kullanılan tarayıcı: {mostUsedBrowser?.browser ?? "Bilinmiyor"}
        </div>
      </CardFooter>
    </Card>
  );
}
