"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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
import { GetMostReferrers } from "@/dal/analytics/types";

export function MostReferrersChart({ data }: { data: GetMostReferrers }) {
  // Path'leri normalize edelim
  const normalizedData = data.map((item) => ({
    ...item,
    referrer: item.referrer?.startsWith("/")
      ? item.referrer
      : `/${item.referrer}`,
  }));

  const chartConfig = normalizedData
    .map((item, index) => ({
      [item.referrer ?? "Unknown"]: {
        label: item.referrer ?? "Unknown",
        color: `hsl(var(--chart-${((index + 1) % 5) + 1}))`,
      },
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {}) satisfies ChartConfig;

  const chartData = data.map((item, index) => ({
    referrer: item.referrer ?? "Unknown",
    visitors: item._count.referrer,
    fill: `hsl(var(--chart-${((index + 1) % 5) + 1}) )`,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Referanslar</CardTitle>
        <CardDescription>
          Bu grafik, en çok referans alan sayfaları gösterir.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="referrer"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
              hide
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="visitors"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey="referrer"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="visitors"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
