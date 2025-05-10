
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useAuth } from "@/context/AuthContext";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { CreditCard, Shield, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock data
const transactionData = [
  { name: "Jan", amount: 2400 },
  { name: "Feb", amount: 1398 },
  { name: "Mar", amount: 4000 },
  { name: "Apr", amount: 3908 },
  { name: "May", amount: 4800 },
  { name: "Jun", amount: 3800 },
];

const recentTransactions = [
  { id: "T123", merchant: "Amazon", amount: 83.45, status: "Completed", date: "2025-05-09" },
  { id: "T124", merchant: "Netflix", amount: 14.99, status: "Completed", date: "2025-05-08" },
  { id: "T125", merchant: "Uber", amount: 24.50, status: "Completed", date: "2025-05-07" },
  { id: "T126", merchant: "Unknown Merchant", amount: 1299.99, status: "Blocked (Fraud)", date: "2025-05-06" },
  { id: "T127", merchant: "Starbucks", amount: 5.75, status: "Completed", date: "2025-05-05" },
];

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleNewTransaction = () => {
    toast.success("Transaction processed successfully");
  };

  const handleFraudulentTransaction = () => {
    toast.error("Potential fraud detected! Transaction blocked.", {
      description: "Our AI detected unusual activity and blocked this transaction.",
      action: {
        label: "Review",
        onClick: () => console.log("Review fraud details")
      }
    });
  };

  if (!user) return null;

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Your Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,240.50</div>
            <p className="text-xs text-muted-foreground">Updated just now</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Fraud Attempts Blocked</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94/100</div>
            <p className="text-xs text-muted-foreground">Very Good</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Your spending patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ amount: { color: "#82ca9d" } }} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={transactionData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#82ca9d"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Test Fraud Detection</CardTitle>
            <CardDescription>Simulate transactions to see our system in action</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Button 
                onClick={handleNewTransaction} 
                className="w-full mb-2"
              >
                Process Safe Transaction
              </Button>
              <Button 
                onClick={handleFraudulentTransaction} 
                variant="destructive" 
                className="w-full"
              >
                Attempt Fraudulent Transaction
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your most recent card activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium">ID</th>
                  <th className="text-left py-3 font-medium">Merchant</th>
                  <th className="text-right py-3 font-medium">Amount</th>
                  <th className="text-left py-3 font-medium">Status</th>
                  <th className="text-left py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b hover:bg-muted/50">
                    <td className="py-3">{tx.id}</td>
                    <td className="py-3">{tx.merchant}</td>
                    <td className="py-3 text-right">${tx.amount.toFixed(2)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        tx.status.includes("Blocked") 
                          ? "bg-destructive/10 text-destructive" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
