"use client";
import { GetMostUsedOperatingSystems } from "@/dal/analytics/types";

import { TrendingUp } from "lucide-react";
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

export function MostUsedOperatingSystemsChart({
  data,
}: {
  data: GetMostUsedOperatingSystems;
}) {
  const chartConfig = data
    .map((item) => ({
      [item.osName]: {
        label: item.osName,
        color: "hsl(var(--chart-1))",
      },
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {}) satisfies ChartConfig;

  const chartData = data.map((item) => ({
    browser: item.osName,
    visitors: item._count.osName,
    fill: "hsl(var(--chart-1))",
  }));
  const mostUsedOperatingSystem = data.find(
    (item) =>
      item._count.osName === Math.max(...data.map((item) => item._count.osName))
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>İşletim Sistemleri</CardTitle>
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
          En çok kullanılan işletim sistemi:{" "}
          {mostUsedOperatingSystem?.osName ?? "Bilinmiyor"}
        </div>
      </CardFooter>
    </Card>
  );
}
