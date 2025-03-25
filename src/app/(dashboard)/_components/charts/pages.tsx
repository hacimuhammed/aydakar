"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
import { GetMostVisitedPages } from "@/dal/analytics/types";

export function MostVisitedPagesChart({ data }: { data: GetMostVisitedPages }) {
  // Path'leri normalize edelim
  const normalizedData = data.map((item) => ({
    ...item,
    path: item.path.startsWith("/") ? item.path : `/${item.path}`,
  }));

  const chartConfig = normalizedData
    .map((item, index) => ({
      [item.path]: {
        label: item.path,
        color: `hsl(var(--chart-${((index + 1) % 5) + 1}))`,
      },
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {}) satisfies ChartConfig;

  const chartData = data.map((item, index) => ({
    path: item.path,
    visitors: item._count.path,
    fill: `hsl(var(--chart-${((index + 1) % 5) + 1}) )`,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sayfa Ziyaretleri</CardTitle>
        <CardDescription>
          Bu grafik, en çok ziyaret edilen sayfaları gösterir.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="path"
              type="category"
              width={150}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
