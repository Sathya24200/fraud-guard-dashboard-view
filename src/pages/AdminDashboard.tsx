import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { useAuth } from "@/context/AuthContext";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Shield, CreditCard, Search, AlertTriangle, ShieldAlert, ShieldCheck, ShieldX } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data for the dashboard
const fraudStats = [
  { name: "Jan", frauds: 65 },
  { name: "Feb", frauds: 59 },
  { name: "Mar", frauds: 80 },
  { name: "Apr", frauds: 81 },
  { name: "May", frauds: 56 },
  { name: "Jun", frauds: 55 },
];

const userData = [
  { name: "Active Users", value: 840 },
  { name: "Inactive Users", value: 160 },
];

const fraudTypeData = [
  { name: "Card Testing", value: 35, description: "Fraudsters test stolen card numbers with small purchases" },
  { name: "Identity Theft", value: 25, description: "Using stolen personal information to open accounts" },
  { name: "Account Takeover", value: 20, description: "Unauthorized access to existing accounts" },
  { name: "Chargeback Fraud", value: 15, description: "Purchases made with intention to dispute" },
  { name: "Other", value: 5, description: "Miscellaneous fraud attempts" },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

const AdminDashboard = () => {
  const { user, isAdmin, getAllUsers } = useAuth();
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);

  // Calculate total for percentages
  const totalFraudValue = fraudTypeData.reduce((acc, item) => acc + item.value, 0);

  useEffect(() => {
    // Redirect if not admin
    if (user && !isAdmin()) {
      navigate('/dashboard');
    } else if (!user) {
      navigate('/login');
    } else {
      // Fetch all users if admin
      const users = getAllUsers();
      setAllUsers(users);
    }
  }, [user, isAdmin, navigate, getAllUsers]);

  if (!user || !isAdmin()) return null;

  return (
    <div 
      className="py-8"
      style={{
        background: `url('/lovable-uploads/e032c89f-90ba-4560-b133-dbc7f106e096.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container">
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitoring system performance and security metrics</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-500/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,000</div>
              <p className="text-xs text-muted-foreground">+10% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-500/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Fraud Attempts</CardTitle>
              <Shield className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">396</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-500/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Transactions Processed</CardTitle>
              <CreditCard className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,456</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-yellow-500/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Search className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96.8%</div>
              <p className="text-xs text-muted-foreground">+2% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle>Fraud Attempts (Monthly)</CardTitle>
              <CardDescription>Number of detected fraud attempts per month</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ frauds: { color: "#8884d8" } }} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fraudStats}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="frauds" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>Active vs. Inactive Users</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ 
                "Active Users": { color: "#82ca9d" },
                "Inactive Users": { color: "#8884d8" }
              }} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Pie
                      data={userData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {userData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-2 border-primary/20 shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Fraud Types</CardTitle>
            <CardDescription>Distribution of different fraud categories</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/2">
              <ChartContainer config={{
                "Card Testing": { color: COLORS[0] },
                "Identity Theft": { color: COLORS[1] },
                "Account Takeover": { color: COLORS[2] },
                "Chargeback Fraud": { color: COLORS[3] },
                "Other": { color: COLORS[4] },
              }} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Pie
                      data={fraudTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {fraudTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            
            <div className="lg:w-1/2 space-y-4">
              <h3 className="text-lg font-medium mb-4">Fraud Type Details</h3>
              {fraudTypeData.map((type, index) => (
                <div key={index} className="flex items-start space-x-2 p-3 rounded-lg bg-white/60 border border-gray-200 shadow-sm">
                  {index === 0 && <ShieldAlert className="flex-shrink-0 h-5 w-5 text-red-500" />}
                  {index === 1 && <ShieldX className="flex-shrink-0 h-5 w-5 text-orange-500" />}
                  {index === 2 && <AlertTriangle className="flex-shrink-0 h-5 w-5 text-yellow-500" />}
                  {index === 3 && <ShieldCheck className="flex-shrink-0 h-5 w-5 text-blue-500" />}
                  {index === 4 && <Shield className="flex-shrink-0 h-5 w-5 text-gray-500" />}
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{type.name}</span>
                      <Badge variant="outline" className="bg-blue-50">
                        {type.value}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                  </div>
                </div>
              ))}
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 mt-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Detection Rate
                </h4>
                <p className="text-sm mt-1">Our system successfully detected 98.2% of all fraud attempts in the last month.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Credentials Table */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-primary/20 shadow-lg mb-8">
          <CardHeader>
            <CardTitle>User Credentials</CardTitle>
            <CardDescription>Complete list of registered users and their details</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>All registered users in the system</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allUsers.map((userItem) => (
                  <TableRow key={userItem.id}>
                    <TableCell className="font-medium">{userItem.id}</TableCell>
                    <TableCell>{userItem.name}</TableCell>
                    <TableCell>{userItem.email}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        userItem.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {userItem.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                        Active
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
