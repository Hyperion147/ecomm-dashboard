"use client"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { useRef, useState } from "react";
import { useSpring, useMotionValueEvent } from "motion/react";

interface ClippedAreaChartProps {
  data: any[];
  config: ChartConfig;
  title?: string;
  description?: string;
  dataKey: string;
  labelKey: string;
}

export function ClippedAreaChart({
  data,
  config,
  title,
  description,
  dataKey,
  labelKey,
}: ClippedAreaChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [axis, setAxis] = useState(0);

  // motion values
  const springX = useSpring(0, {
    damping: 30,
    stiffness: 100,
  });
  const springY = useSpring(data[data.length - 1][dataKey] as number, {
    damping: 30,
    stiffness: 100,
  });

  useMotionValueEvent(springX, "change", (latest) => {
    setAxis(latest as number);
  });

  const displayValue = Number(springY.get()).toFixed(0);

  return (
    <Card className="shadow-none border-none bg-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title && (
            <span className="text-sm font-medium text-muted-foreground mr-2">
              {title}
            </span>
          )}
          <span className="font-mono">${displayValue}</span>
          <Badge variant="secondary" className="ml-2">
            <TrendingUp className="h-4 w-4" />
            <span>+8.2%</span>
          </Badge>
        </CardTitle>
        <CardDescription>{description || "Total performance"}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer ref={chartRef} className="h-54 w-full" config={config}>
          <AreaChart
            className="overflow-visible"
            accessibilityLayer
            data={data}
            onMouseMove={(state) => {
              const x = state.activeCoordinate?.x;
              const dataValue = state.activePayload?.[0]?.value;
              if (x && dataValue !== undefined) {
                springX.set(x);
                springY.set(dataValue as number);
              }
            }}
            onMouseLeave={() => {
              springX.set(chartRef.current?.getBoundingClientRect().width || 0);
              springY.set(data[data.length - 1][dataKey]);
            }}
            margin={{
              right: 0,
              left: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              horizontalCoordinatesGenerator={(props) => {
                const { height } = props;
                return [0, height - 30];
              }}
            />
            <XAxis
              dataKey={labelKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Area
              dataKey={dataKey}
              type="monotone"
              fill={`url(#gradient-clipped-area-${dataKey})`}
              fillOpacity={0.4}
              stroke={`var(--color-${dataKey})`}
              clipPath={`inset(0 ${
                Number(chartRef.current?.getBoundingClientRect().width) - axis
              } 0 0)`}
            />
            <line
              x1={axis}
              y1={0}
              x2={axis}
              y2={"85%"}
              stroke={`var(--color-${dataKey})`}
              strokeDasharray="3 3"
              strokeLinecap="round"
              strokeOpacity={0.2}
            />
            <rect
              x={axis - 50}
              y={0}
              width={50}
              height={18}
              fill={`var(--color-${dataKey})`}
            />
            <text
              x={axis - 25}
              fontWeight={600}
              y={13}
              fontSize={12}
              textAnchor="middle"
              fill="var(--primary-foreground)"
            >
              ${displayValue}
            </text>
            {/* ghost line */}
            <Area
              dataKey={dataKey}
              type="monotone"
              fill="none"
              stroke={`var(--color-${dataKey})`}
              strokeOpacity={0.1}
            />
            <defs>
              <linearGradient
                id={`gradient-clipped-area-${dataKey}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={`var(--color-${dataKey})`}
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor={`var(--color-${dataKey})`}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
