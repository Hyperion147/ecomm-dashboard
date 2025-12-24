"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis } from "recharts";
import React, { SVGProps } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { JetBrains_Mono } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface MonochromeBarChartProps {
  data: any[];
  config: ChartConfig;
  title?: string;
  description?: string;
  dataKey: string;
  labelKey: string;
}

export function MonochromeBarChart({
  data,
  config,
  title,
  description,
  dataKey,
  labelKey,
}: MonochromeBarChartProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(
    undefined
  );

  const activeData = React.useMemo(() => {
    if (activeIndex === undefined) return null;
    return data[activeIndex];
  }, [activeIndex, data]);

  return (
    <Card className="shadow-none border-none bg-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title && (
            <span className="text-sm font-medium text-muted-foreground mr-2">
              {title}
            </span>
          )}
          <span
            className={cn(jetBrainsMono.className, "text-2xl tracking-tighter")}
          >
            {activeData ? activeData[dataKey] : data[data.length - 1][dataKey]}
          </span>
          <Badge variant="secondary">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>5.2%</span>
          </Badge>
        </CardTitle>
        <CardDescription>{description || "vs. last period"}</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <ChartContainer config={config}>
            <BarChart
              accessibilityLayer
              data={data}
              onMouseLeave={() => setActiveIndex(undefined)}
            >
              <XAxis
                dataKey={labelKey}
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Bar
                dataKey={dataKey}
                fill="var(--secondary-foreground)"
                shape={
                  <CustomBar
                    setActiveIndex={setActiveIndex}
                    activeIndex={activeIndex}
                  />
                }
              ></Bar>
            </BarChart>
          </ChartContainer>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

interface CustomBarProps extends SVGProps<SVGSVGElement> {
  setActiveIndex: (index?: number) => void;
  index?: number;
  activeIndex?: number;
  value?: string;
}

const CustomBar = (props: CustomBarProps) => {
  const { fill, x, y, width, height, index, activeIndex, value } = props;

  // Custom variables
  const xPos = Number(x || 0);
  const realWidth = Number(width || 0);
  const isActive = index === activeIndex;
  const collapsedWidth = 4;
  // centered bar x-position
  const barX = isActive ? xPos : xPos + (realWidth - collapsedWidth) / 2;
  // centered text x-position
  const textX = xPos + realWidth / 2;
  // Custom bar shape
  return (
    <g onMouseEnter={() => props.setActiveIndex(index)}>
      {/* rendering the bar with custom postion and animated width */}
      <motion.rect
        style={{
          willChange: "transform, width", // helps with performance
        }}
        y={y}
        initial={{ width: collapsedWidth, x: barX }}
        animate={{ width: isActive ? realWidth : collapsedWidth, x: barX }}
        transition={{
          duration: activeIndex === index ? 0.5 : 1,
          type: "spring",
        }}
        height={height}
        fill={fill}
      />
      {/* Render value text on top of bar */}
      {isActive && (
        <motion.text
          style={{
            willChange: "transform, opacity", // helps with performance
          }}
          className={jetBrainsMono.className}
          key={index}
          initial={{ opacity: 0, y: -10, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(3px)" }}
          transition={{ duration: 0.1 }}
          x={textX}
          y={Number(y) - 5}
          textAnchor="middle"
          fill={fill}
        >
          {value}
        </motion.text>
      )}
    </g>
  );
};
