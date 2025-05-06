import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth-context';
import * as React from "react"
import { 
  User, 
  Calendar, 
  Building2, 
  PillIcon, 
  ActivityIcon, 
  AlertTriangle,
  BarChart3Icon,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import Recharts components directly
import {
  Bar, 
  BarChart, 
  CartesianGrid, 
  Line, 
  LineChart, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  XAxis,
  ResponsiveContainer,
  PolarGrid,
  RadialBar,
  RadialBarChart
} from "recharts";

// Import our Chart components 
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

interface DashboardStats {
  appointments: number;
  prescriptions: number;
  healthGoals: number;
  notifications: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    appointments: 0,
    prescriptions: 0,
    healthGoals: 0,
    notifications: 0,
  });

  // Fitness app review data for visualization
  const fitnessReviewData = [
    { name: "Excellent", value: 42 },
    { name: "Good", value: 28 },
    { name: "Average", value: 15 },
    { name: "Poor", value: 8 },
    { name: "Very Poor", value: 5 }
  ];

  const fitnessActivityData = [
    { day: "Mon", steps: 4200, calories: 320 },
    { day: "Tue", steps: 5800, calories: 450 },
    { day: "Wed", steps: 6500, calories: 580 },
    { day: "Thu", steps: 3900, calories: 310 },
    { day: "Fri", steps: 4800, calories: 410 },
    { day: "Sat", steps: 8200, calories: 680 },
    { day: "Sun", steps: 7500, calories: 620 }
  ];

  // Exercise minutes data - multi-line chart
  const exerciseMinutesData = [
    { day: "Mon", current: 45, previous: 42, goal: 50 },
    { day: "Tue", current: 32, previous: 28, goal: 50 },
    { day: "Wed", current: 68, previous: 45, goal: 50 },
    { day: "Thu", current: 100, previous: 50, goal: 50 },
    { day: "Fri", current: 72, previous: 55, goal: 50 },
    { day: "Sat", current: 65, previous: 60, goal: 50 },
    { day: "Sun", current: 78, previous: 67, goal: 50 }
  ];

  // Visitor statistics data - area chart
  const visitorStatsMonthly = [
    { date: "Jan", mobile: 245, desktop: 190 },
    { date: "Feb", mobile: 380, desktop: 310 },
    { date: "Mar", mobile: 305, desktop: 225 },
    { date: "Apr", mobile: 340, desktop: 280 },
    { date: "May", mobile: 385, desktop: 325 },
    { date: "Jun", mobile: 420, desktop: 370 }
  ];

  // Daily visitor data (more detailed)
  const dailyVisitorData = [
    { date: "May 1", mobile: 290, desktop: 210 },
    { date: "May 2", mobile: 320, desktop: 240 },
    { date: "May 3", mobile: 380, desktop: 290 },
    { date: "May 4", mobile: 420, desktop: 310 },
    { date: "May 5", mobile: 390, desktop: 280 },
    { date: "May 6", mobile: 330, desktop: 260 },
    { date: "May 7", mobile: 300, desktop: 220 },
    { date: "May 8", mobile: 310, desktop: 230 }
  ];

  // Bar chart data - monthly comparison
  const barChartData = [
    { month: "Jan", thisYear: 340, lastYear: 240 },
    { month: "Feb", thisYear: 450, lastYear: 320 },
    { month: "Mar", thisYear: 380, lastYear: 280 },
    { month: "Apr", thisYear: 320, lastYear: 250 },
    { month: "May", thisYear: 390, lastYear: 310 },
    { month: "Jun", thisYear: 420, lastYear: 350 }
  ];

  // Donut chart data
  const donutChartData = [
    { name: "Mobile App", value: 725 },
    { name: "Website", value: 400 }
  ];

  const DONUT_COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

  // Create unique IDs for gradients to prevent conflicts
  const mobileGradientId = "colorMobile-" + Math.random().toString(36).substr(2, 9);
  const desktopGradientId = "colorDesktop-" + Math.random().toString(36).substr(2, 9);
  const mobileGradientId2 = "colorMobile2-" + Math.random().toString(36).substr(2, 9);

  useEffect(() => {
    // TODO: Fetch actual stats from API
    setStats({
      appointments: 2,
      prescriptions: 1,
      healthGoals: 3,
      notifications: 1,
    });
  }, []);

  const handleEmergencyClick = () => {
    // Navigate to emergency page instead of using the link
    navigate('/emergency');
  };

  const quickLinks = [
    {
      title: 'Hospitals',
      icon: <Building2 className="w-6 h-6" />,
      link: '/hospitals', // Corrected from '/hospital-list' to match App.tsx route
      color: 'bg-purple-500',
    },
    {
      title: 'Pharmacy',
      icon: <PillIcon className="w-6 h-6" />,
      link: '/medical-pharmacy', // This already matches MedicalPharmacy.tsx
      color: 'bg-red-500',
    },
    {
      title: 'Health Goals',
      icon: <ActivityIcon className="w-6 h-6" />,
      link: '/health-goals', // This already matches HealthGoals.tsx
      color: 'bg-yellow-500',
    },
    {
      title: 'Emergency',
      icon: <AlertTriangle className="w-6 h-6" />,
      onClick: handleEmergencyClick, // This uses a click handler which is fine
      color: 'bg-orange-500',
    },
  ];

  // Chart configurations
  const exerciseChartConfig = {
    current: {
      label: "This week",
      color: "#ffffff",
    },
    previous: {
      label: "Last week",
      color: "#6b7280",
    },
  };

  const visitorChartConfig = {
    mobile: {
      label: "Mobile",
      color: "#3b82f6",
    },
    desktop: {
      label: "Desktop",
      color: "#1d4ed8",
    },
  };

  const barChartConfig = {
    thisYear: {
      label: "This Year",
      color: "#3b82f6",
    },
    lastYear: {
      label: "Last Year",
      color: "#93c5fd",
    },
  };

  return (
    <div className="min-h-screen bg-pure-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-pure-black rounded-lg shadow-md border border-gray-800 p-6 mb-8">
          <h1 className="text-2xl font-bold text-pure-white">
            {user ? `Welcome back, ${user.name}!` : 'Welcome to your health dashboard!'}
          </h1>
          <p className="mt-1 text-gray-400">
            {user ? "Here's what's happening with your health today." : "Explore your health insights and resources below."}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-pure-black overflow-hidden shadow-md rounded-lg border border-gray-800">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      Upcoming Appointments
                    </dt>
                    <dd className="text-lg font-semibold text-pure-white">
                      {stats.appointments}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-pure-black overflow-hidden shadow-md rounded-lg border border-gray-800">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <PillIcon className="h-6 w-6 text-red-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      Active Prescriptions
                    </dt>
                    <dd className="text-lg font-semibold text-pure-white">
                      {stats.prescriptions}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-pure-black overflow-hidden shadow-md rounded-lg border border-gray-800">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ActivityIcon className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      Health Goals
                    </dt>
                    <dd className="text-lg font-semibold text-pure-white">
                      {stats.healthGoals}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-pure-black overflow-hidden shadow-md rounded-lg border border-gray-800">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart3Icon className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      Notifications
                    </dt>
                    <dd className="text-lg font-semibold text-pure-white">
                      {stats.notifications}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise Minutes Chart - Complete standalone container */}
        <Card className="bg-pure-black shadow-md border border-gray-800 mb-24"> {/* Increased bottom margin significantly */}
          <CardHeader className="pb-0">
            <CardTitle>Exercise Minutes</CardTitle>
            <CardDescription>
              Your exercise minutes are ahead of where you normally are.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[180px] pb-10"> {/* Added bottom padding */}
              <ChartContainer config={exerciseChartConfig}>
                <LineChart data={exerciseMinutesData} margin={{ top: 10, right: 10, left: 10, bottom: 50 }}> {/* Significantly increased bottom margin */}
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                  <Line 
                    type="monotone"
                    dataKey="current" 
                    stroke="#ffffff"
                    strokeWidth={2}
                    dot={{
                      fill: "#ffffff",
                      strokeWidth: 2,
                      r: 4,
                    }}
                    activeDot={{
                      r: 6,
                      fill: "#ffffff",
                      stroke: "#ffffff",
                    }}
                  />
                  <Line 
                    type="monotone"
                    dataKey="previous" 
                    stroke="#6b7280"
                    strokeWidth={2}
                    dot={{
                      fill: "#6b7280",
                      strokeWidth: 2,
                      r: 4,
                    }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
          <CardFooter className="pt-4 pb-8"> {/* Added more padding to the footer */}
            <div className="text-sm text-gray-400">
              Data from last 7 days
            </div>
          </CardFooter>
        </Card>

        {/* Quick Links */}
        <div className="bg-pure-black shadow-md rounded-lg p-6 border border-gray-800 mb-8 mt-16">
          <h2 className="text-lg font-medium text-pure-white mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => (
              link.onClick ? (
                <div
                  key={link.title}
                  onClick={link.onClick}
                  className="relative rounded-lg border border-gray-800 bg-pure-black px-6 py-5 shadow-md flex items-center space-x-3 hover:border-gray-600 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-healthcare-blue cursor-pointer"
                >
                  <div className={`flex-shrink-0 rounded-full p-3 ${link.color}`}>
                    <div className="text-white">{link.icon}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-pure-white">
                      {link.title}
                    </p>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.title}
                  to={link.link}
                  className="relative rounded-lg border border-gray-800 bg-pure-black px-6 py-5 shadow-md flex items-center space-x-3 hover:border-gray-600 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-healthcare-blue"
                >
                  <div className={`flex-shrink-0 rounded-full p-3 ${link.color}`}>
                    <div className="text-white">{link.icon}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-pure-white">
                      {link.title}
                    </p>
                  </div>
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Fitness App Review Feedback */}
        <div className="bg-pure-black shadow-md rounded-lg p-6 border border-gray-800 mb-8">
          <h2 className="text-lg font-medium text-pure-white mb-4">Fitness App Review Feedback</h2>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Review Distribution */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-pure-white">User Review Distribution</CardTitle>
                <CardDescription className="text-gray-400">
                  Overall app satisfaction rating
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fitnessReviewData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                      <XAxis dataKey="name" stroke="#888888" />
                      <Bar 
                        dataKey="value" 
                        fill="#3b82f6" 
                        radius={[4, 4, 0, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-gray-400">
                  Based on feedback from 98 users
                </div>
              </CardFooter>
            </Card>

            {/* Activity Tracking */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-pure-white">Weekly Activity Stats</CardTitle>
                <CardDescription className="text-gray-400">
                  Steps and calories tracked this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fitnessActivityData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                      <XAxis dataKey="day" stroke="#888888" />
                      <Bar 
                        dataKey="steps" 
                        fill="#10b981" 
                        radius={[4, 4, 0, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full text-sm">
                  <div className="text-gray-400">Daily Goal: 8,000 steps</div>
                  <div className="text-green-500">Average: 5,842 steps</div>
                </div>
              </CardFooter>
            </Card>

            {/* Goal Progress */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-pure-white">Goal Completion</CardTitle>
                <CardDescription className="text-gray-400">
                  Progress toward your health targets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="text-gray-400">Steps Goal</div>
                      <div className="text-green-500">73%</div>
                    </div>
                    <Progress value={73} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="text-gray-400">Calories Burned</div>
                      <div className="text-green-500">64%</div>
                    </div>
                    <Progress value={64} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="text-gray-400">Water Intake</div>
                      <div className="text-yellow-500">46%</div>
                    </div>
                    <Progress value={46} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="text-gray-400">Activity Minutes</div>
                      <div className="text-blue-500">58%</div>
                    </div>
                    <Progress value={58} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-gray-400">
                  Updated 2 hours ago
                </div>
              </CardFooter>
            </Card>

            {/* App Engagement */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-pure-white">App Engagement</CardTitle>
                <CardDescription className="text-gray-400">
                  Feature usage analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">Step Tracking</div>
                    <div className="w-2/3">
                      <Progress value={92} className="h-2" />
                    </div>
                    <div className="text-sm text-green-500">92%</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">Workout Plans</div>
                    <div className="w-2/3">
                      <Progress value={78} className="h-2" />
                    </div>
                    <div className="text-sm text-green-500">78%</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">Nutrition Tracking</div>
                    <div className="w-2/3">
                      <Progress value={54} className="h-2" />
                    </div>
                    <div className="text-sm text-yellow-500">54%</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">Sleep Analysis</div>
                    <div className="w-2/3">
                      <Progress value={63} className="h-2" />
                    </div>
                    <div className="text-sm text-blue-500">63%</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">Community Features</div>
                    <div className="w-2/3">
                      <Progress value={41} className="h-2" />
                    </div>
                    <div className="text-sm text-yellow-500">41%</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* New Charts Section */}
        <div className="bg-pure-black shadow-md rounded-lg p-6 border border-gray-800 mb-8">
          <h2 className="text-lg font-medium text-pure-white mb-4">Health Engagement Analytics</h2>
          
          <div className="grid grid-cols-1 gap-8 mb-8">
            {/* Bar Chart - Multiple */}
            {(() => {
              const chartData = [
                { month: "January", telehealth: 186, inPerson: 80 },
                { month: "February", telehealth: 305, inPerson: 200 },
                { month: "March", telehealth: 237, inPerson: 120 },
                { month: "April", telehealth: 73, inPerson: 190 },
                { month: "May", telehealth: 209, inPerson: 130 },
                { month: "June", telehealth: 214, inPerson: 140 },
              ];

              const chartConfig = {
                telehealth: {
                  label: "Telehealth",
                  color: "#1a56db", // Deep blue
                },
                inPerson: {
                  label: "In-Person",
                  color: "#60a5fa", // Lighter blue
                },
              } as ChartConfig;

              return (
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Health Consultation Methods</CardTitle>
                    <CardDescription>Telehealth vs. In-Person visits (January - June 2024)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig}>
                      <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="telehealth" fill="#1a56db" radius={4} />
                        <Bar dataKey="inPerson" fill="#60a5fa" radius={4} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                      Telehealth adoption increased by 15.2% <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                      Patients increasingly prefer virtual consultations for routine check-ups
                    </div>
                  </CardFooter>
                </Card>
              );
            })()}
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Bar Chart - Interactive */}
            {(() => {
              // Using a shorter version of the data
              const chartData = [
                { date: "2024-04-01", appUsage: 222, webPortal: 150 },
                { date: "2024-04-15", appUsage: 120, webPortal: 170 },
                { date: "2024-05-01", appUsage: 165, webPortal: 220 },
                { date: "2024-05-15", appUsage: 473, webPortal: 380 },
                { date: "2024-06-01", appUsage: 178, webPortal: 200 },
                { date: "2024-06-15", appUsage: 307, webPortal: 350 },
              ];

              const chartConfig = {
                views: {
                  label: "Sessions",
                },
                appUsage: {
                  label: "Mobile App",
                  color: "#1e3a8a", // Dark blue
                },
                webPortal: {
                  label: "Web Portal",
                  color: "#3b82f6", // Medium blue
                },
              } as ChartConfig;

              const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("appUsage");

              const total = React.useMemo(
                () => ({
                  appUsage: chartData.reduce((acc, curr) => acc + curr.appUsage, 0),
                  webPortal: chartData.reduce((acc, curr) => acc + curr.webPortal, 0),
                }),
                []
              );

              return (
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                      <CardTitle>Patient Portal Usage</CardTitle>
                      <CardDescription>
                        Health app vs. web portal engagement
                      </CardDescription>
                    </div>
                    <div className="flex">
                      {["appUsage", "webPortal"].map((key) => {
                        const chart = key as keyof typeof chartConfig;
                        return (
                          <button
                            key={chart}
                            data-active={activeChart === chart}
                            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                            onClick={() => setActiveChart(chart)}
                          >
                            <span className="text-xs text-muted-foreground">
                              {chartConfig[chart].label}
                            </span>
                            <span className="text-lg font-bold leading-none sm:text-3xl">
                              {total[key as keyof typeof total].toLocaleString()}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </CardHeader>
                  <CardContent className="px-2 sm:p-6">
                    <ChartContainer
                      config={chartConfig}
                      className="aspect-auto h-[250px] w-full"
                    >
                      <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                          left: 12,
                          right: 12,
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          minTickGap={32}
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            });
                          }}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              className="w-[150px]"
                              nameKey="views"
                              labelFormatter={(value) => {
                                return new Date(value).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                });
                              }}
                            />
                          }
                        />
                        <Bar dataKey={activeChart} fill={chartConfig[activeChart].color} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              );
            })()}

            {/* Radial Chart - Grid */}
            {(() => {
              const chartData = [
                { category: "Physical", completionRate: 75, fill: "#0c4a6e" }, // Dark blue
                { category: "Nutrition", completionRate: 62, fill: "#0369a1" }, // Medium-dark blue
                { category: "Mental", completionRate: 48, fill: "#0ea5e9" }, // Medium blue
                { category: "Sleep", completionRate: 83, fill: "#38bdf8" }, // Light blue
                { category: "Preventive", completionRate: 55, fill: "#7dd3fc" }, // Very light blue
              ];

              const chartConfig = {
                completionRate: {
                  label: "Completion Rate",
                },
                Physical: {
                  label: "Physical Activity",
                  color: "#0c4a6e",
                },
                Nutrition: {
                  label: "Nutrition Goals",
                  color: "#0369a1",
                },
                Mental: {
                  label: "Mental Wellness",
                  color: "#0ea5e9",
                },
                Sleep: {
                  label: "Sleep Quality",
                  color: "#38bdf8",
                },
                Preventive: {
                  label: "Preventive Care",
                  color: "#7dd3fc",
                },
              } as ChartConfig;

              return (
                <Card className="bg-gray-900 border-gray-800 flex flex-col">
                  <CardHeader className="items-center pb-0">
                    <CardTitle>Health Goal Completion</CardTitle>
                    <CardDescription>Wellness metrics by category</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0">
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square max-h-[250px]"
                    >
                      <RadialBarChart data={chartData} innerRadius={30} outerRadius={100}>
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel nameKey="category" />}
                        />
                        <PolarGrid gridType="circle" />
                        <RadialBar dataKey="completionRate" />
                      </RadialBarChart>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 font-medium leading-none">
                      Overall goal completion rate: 64.6% <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                      Sleep goals showing highest adherence, mental wellness needs focus
                    </div>
                  </CardFooter>
                </Card>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}