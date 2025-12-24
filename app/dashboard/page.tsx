"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { orders, products, users, monthlySales } from "@/lib/data";
import {
  CreditCard,
  DollarSign,
  Package,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MonochromeBarChart } from "@/components/charts/monochrome-bar-chart";
import { ClippedAreaChart } from "@/components/charts/clip-area-chart";
import { RainbowGlowGradientLineChart } from "@/components/charts/rainbow-glow-gradient-line";
import { RoundedPieChart } from "@/components/charts/rounded-pie-chart";

const salesConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
};

const ordersConfig = {
  orders: {
    label: "Orders",
    color: "hsl(var(--primary))",
  },
};

const visitorConfig = {
  visitors: {
    label: "Visitors",
    color: "#0B84CE",
  },
};

export default function DashboardPage() {
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalUsers = users.length;

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-all duration-300 border-none bg-accent/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-emerald-500 font-medium flex items-center mr-1">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +20.1%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 border-none bg-accent/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalOrders}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-emerald-500 font-medium flex items-center mr-1">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +180.1%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 border-none bg-accent/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-rose-500 font-medium flex items-center mr-1">
                <ArrowDownRight className="h-3 w-3 mr-1" /> -4%
              </span>
              from last week
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 border-none bg-accent/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalUsers}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-emerald-500 font-medium flex items-center mr-1">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +19%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <MonochromeBarChart
          data={monthlySales}
          config={salesConfig}
          title="Revenue Growth"
          dataKey="sales"
          labelKey="month"
          description="Monthly revenue performance for 2023"
        />
        <ClippedAreaChart
          data={monthlySales}
          config={ordersConfig}
          title="Order Volume"
          dataKey="orders"
          labelKey="month"
          description="Total orders processed per month"
        />
        <RainbowGlowGradientLineChart
          data={monthlySales}
          config={visitorConfig}
          title="Visitor Trends"
          dataKey="orders"
          labelKey="month"
          description="Website traffic overview"
        />
        <RoundedPieChart />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm border-none bg-accent/5 overflow-hidden">
          <CardHeader className="bg-background/50 backdrop-blur-sm border-b">
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              You made {orders.length} orders this period.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[150px]">Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order.orderNumber}
                    className="hover:bg-accent/5 transition-colors"
                  >
                    <TableCell className="font-medium">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "delivered"
                            ? "default"
                            : order.status === "processing"
                            ? "secondary"
                            : "outline"
                        }
                        className="capitalize -ml-2"
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {order.shippingAddress.firstName}{" "}
                          {order.shippingAddress.lastName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {order.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ${order.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-none bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Top Products
            </CardTitle>
            <CardDescription>Most popular products this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {products.map((product) => (
                <div key={product.id} className="flex items-center">
                  <div className="relative h-12 w-12 rounded-lg overflow-hidden border bg-background shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="ml-4 space-y-1 overflow-hidden">
                    <p className="text-sm font-medium leading-none truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {product.category.name} • {product.sku}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-emerald-600">
                    +${product.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
