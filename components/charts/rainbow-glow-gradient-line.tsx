"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface RainbowGlowGradientLineChartProps {
  data: any[];
  config: ChartConfig;
  title?: string;
  description?: string;
  dataKey: string;
  labelKey: string;
}

export function RainbowGlowGradientLineChart({
  data,
  config,
  title,
  description,
  dataKey,
  labelKey,
}: RainbowGlowGradientLineChartProps) {
  return (
    <Card className="shadow-none border-none bg-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title && (
            <span className="text-sm font-medium text-muted-foreground mr-2">
              {title}
            </span>
          )}
          <Badge
            variant="outline"
            className="text-emerald-500 bg-emerald-500/10 border-none ml-2"
          >
            <TrendingUp className="h-4 w-4" />
            <span>+12.5%</span>
          </Badge>
        </CardTitle>
        <CardDescription>
          {description || "January - June 2024"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey={labelKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey={dataKey}
              type="bump"
              stroke="url(#rainbow-glow-uv)"
              dot={false}
              strokeWidth={3}
              filter="url(#rainbow-line-glow)"
            />
            <defs>
              <linearGradient id="rainbow-glow-uv" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#92a9afff" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#224CD1" stopOpacity={0.8} />
              </linearGradient>
              <filter
                id="rainbow-line-glow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
