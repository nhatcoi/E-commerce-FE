import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "src/components/ui/table";
import { Loader2 } from "lucide-react";
import { useGetProductsQuery } from "src/store/productApi.js";
import { useGetOrdersQuery } from "src/store/orderApi.js";
import { useGetUsersQuery } from "src/store/authApi.js";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DASHBOARD_CONSTANTS = {
  TITLE: {
    TOTAL_SALES: "Total Sales",
    TOTAL_INCOME: "Total Income",
    ORDERS_PAID: "Orders Paid",
    TOTAL_VISITOR: "Total Visitor",
    RECENT_ORDER: "Recent Order",
    TOP_PRODUCTS: "Top Products",
    TOP_COUNTRIES: "Top Countries By Sales",
    VIEW_ALL: "View all",
  },
  METRICS: {
    PERCENTAGE: {
      SALES: "1.58%",
      INCOME: "1.56%",
      ORDERS: "0.00%",
      VISITORS: "1.58%",
    }
  }
};

// Utility function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const StatisticCard = ({ title, value, percentage, trend, chart }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center space-x-1">
            <span className={`text-xs ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {percentage}
            </span>
          </div>
        </div>
        <div className="h-12 w-32">{chart}</div>
      </div>
    </CardContent>
  </Card>
);

const TopProductItem = ({ image, name, country, price, discount }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center space-x-4">
      <img src={image} alt={name} className="h-12 w-12 rounded object-cover" />
      <div>
        <p className="text-sm font-medium">{name}</p>
        <div className="flex items-center space-x-2">
          <img src={country} alt="country flag" className="h-4 w-4" />
          <span className="text-xs text-muted-foreground">Coupon Code 5lat</span>
        </div>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-medium">{formatCurrency(price)}</p>
      <p className="text-xs text-red-500">-{discount}%</p>
    </div>
  </div>
);

const CountryItem = ({ flag, name, revenue, trend }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center space-x-3">
      <img src={flag} alt={name} className="h-6 w-6 rounded-full" />
      <span className="text-sm font-medium">{name}</span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">{formatCurrency(revenue)}</span>
      <span className={`text-xs ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
        {trend === 'up' ? '↑' : '↓'}
      </span>
    </div>
  </div>
);

const SmallLineChart = ({ data, dataKey, stroke = "#16a34a" }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <Line 
        type="monotone" 
        dataKey={dataKey} 
        stroke={stroke} 
        strokeWidth={2} 
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
);

const RecentOrderChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data}>
      <defs>
        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis 
        dataKey="name" 
        stroke="#888888"
        fontSize={12}
        tickLine={false}
        axisLine={false}
      />
      <YAxis 
        stroke="#888888"
        fontSize={12}
        tickLine={false}
        axisLine={false}
        tickFormatter={(value) => `$${value}`}
      />
      <CartesianGrid 
        strokeDasharray="3 3"
        stroke="#e5e7eb"
        vertical={false}
      />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="revenue"
        stroke="#3b82f6"
        fillOpacity={1}
        fill="url(#colorRevenue)"
      />
    </AreaChart>
  </ResponsiveContainer>
);

export default function Dashboard() {
  const { data: productsData, isLoading: isLoadingProducts } = useGetProductsQuery({});
  const { data: ordersData, isLoading: isLoadingOrders } = useGetOrdersQuery({});
  const { data: usersData, isLoading: isLoadingUsers } = useGetUsersQuery();

  const smallChartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 450 },
    { name: 'May', value: 470 },
    { name: 'Jun', value: 480 },
  ];

  const recentOrderData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 4500 },
    { name: 'May', revenue: 4700 },
    { name: 'Jun', revenue: 4800 },
    { name: 'Jul', revenue: 4600 },
    { name: 'Aug', revenue: 5200 },
    { name: 'Sep', revenue: 5100 },
    { name: 'Oct', revenue: 4800 },
    { name: 'Nov', revenue: 4900 },
    { name: 'Dec', revenue: 4700 },
  ];

  const statistics = [
    {
      title: DASHBOARD_CONSTANTS.TITLE.TOTAL_SALES,
      value: "34,945",
      percentage: DASHBOARD_CONSTANTS.METRICS.PERCENTAGE.SALES,
      trend: "up",
      chart: <SmallLineChart data={smallChartData} dataKey="value" stroke="#16a34a" />
    },
    {
      title: DASHBOARD_CONSTANTS.TITLE.TOTAL_INCOME,
      value: formatCurrency(37802),
      percentage: DASHBOARD_CONSTANTS.METRICS.PERCENTAGE.INCOME,
      trend: "up",
      chart: <SmallLineChart data={smallChartData} dataKey="value" stroke="#ea580c" />
    },
    {
      title: DASHBOARD_CONSTANTS.TITLE.ORDERS_PAID,
      value: "34,945",
      percentage: DASHBOARD_CONSTANTS.METRICS.PERCENTAGE.ORDERS,
      trend: "neutral",
      chart: <SmallLineChart data={smallChartData} dataKey="value" stroke="#6b7280" />
    },
    {
      title: DASHBOARD_CONSTANTS.TITLE.TOTAL_VISITOR,
      value: "34,945",
      percentage: DASHBOARD_CONSTANTS.METRICS.PERCENTAGE.VISITORS,
      trend: "up",
      chart: <SmallLineChart data={smallChartData} dataKey="value" stroke="#2563eb" />
    }
  ];

  const topProducts = [
    {
      image: "/products/patinax.jpg",
      name: "Patinax Fragrance Long...",
      country: "/flags/spain.png",
      price: 27.00,
      discount: 15
    },
    {
      image: "/products/nulo.jpg", 
      name: "Nulo MedalSeries Adult Cat...",
      country: "/flags/india.png",
      price: 27.00,
      discount: 15
    },
    {
      image: "/products/pedigree.jpg",
      name: "Pedigree Puppy Dry Dog...",
      country: "/flags/uk.png", 
      price: 27.00,
      discount: 15
    },
    {
      image: "/products/biscotto.jpg",
      name: "Biscotto Premier Cookie...",
      country: "/flags/brazil.png",
      price: 27.00,
      discount: 15
    },
    {
      image: "/products/pedigree-adult.jpg",
      name: "Pedigree Adult Dry Dog...",
      country: "/flags/france.png",
      price: 27.00,
      discount: 15
    }
  ];

  const topCountries = [
    {
      flag: "/flags/turkey.png",
      name: "Turkish Flag",
      revenue: 6972,
      trend: "up"
    },
    {
      flag: "/flags/belgium.png",
      name: "Belgium",
      revenue: 6972,
      trend: "up"
    },
    {
      flag: "/flags/sweden.png", 
      name: "Sweden",
      revenue: 6972,
      trend: "down"
    },
    {
      flag: "/flags/vietnam.png",
      name: "Vietnamese",
      revenue: 6972,
      trend: "up"
    },
    {
      flag: "/flags/australia.png",
      name: "Australia",
      revenue: 6972,
      trend: "down"
    },
    {
      flag: "/flags/saudi.png",
      name: "Saudi Arabia",
      revenue: 6972,
      trend: "down"
    }
  ];

  if (isLoadingProducts || isLoadingOrders || isLoadingUsers) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-8">
      {/* Statistics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statistics.map((stat) => (
          <StatisticCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts and Lists Grid */}
      <div className="grid gap-4 md:grid-cols-12">
        {/* Recent Order Chart */}
        <Card className="col-span-7">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{DASHBOARD_CONSTANTS.TITLE.RECENT_ORDER}</CardTitle>
            <Button variant="ghost" className="text-sm">
              {DASHBOARD_CONSTANTS.TITLE.VIEW_ALL} →
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <RecentOrderChart data={recentOrderData} />
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="col-span-5">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{DASHBOARD_CONSTANTS.TITLE.TOP_PRODUCTS}</CardTitle>
            <Button variant="ghost" className="text-sm">
              {DASHBOARD_CONSTANTS.TITLE.VIEW_ALL} →
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <TopProductItem key={index} {...product} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card className="col-span-5">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{DASHBOARD_CONSTANTS.TITLE.TOP_COUNTRIES}</CardTitle>
            <Button variant="ghost" className="text-sm">
              {DASHBOARD_CONSTANTS.TITLE.VIEW_ALL} →
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCountries.map((country, index) => (
                <CountryItem key={index} {...country} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}