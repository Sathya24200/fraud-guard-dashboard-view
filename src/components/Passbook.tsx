
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CreditCard, ArrowDown, ArrowUp, Search } from "lucide-react";

// Mock passbook data
const passbookData = [
  { 
    id: "T001", 
    date: "2025-05-08", 
    description: "Salary Credit", 
    amount: 3200.00, 
    type: "credit", 
    balance: 5240.50 
  },
  { 
    id: "T002", 
    date: "2025-05-07", 
    description: "Amazon.com", 
    amount: 124.99, 
    type: "debit", 
    balance: 2040.50 
  },
  { 
    id: "T003", 
    date: "2025-05-06", 
    description: "Netflix Subscription", 
    amount: 14.99, 
    type: "debit", 
    balance: 2165.49 
  },
  { 
    id: "T004", 
    date: "2025-05-05", 
    description: "Transfer from John", 
    amount: 500.00, 
    type: "credit", 
    balance: 2180.48 
  },
  { 
    id: "T005", 
    date: "2025-05-04", 
    description: "Grocery Store", 
    amount: 86.42, 
    type: "debit", 
    balance: 1680.48 
  },
  { 
    id: "T006", 
    date: "2025-05-03", 
    description: "Gas Station", 
    amount: 45.00, 
    type: "debit", 
    balance: 1766.90 
  },
];

const Passbook = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(passbookData);
  const [activeTab, setActiveTab] = useState("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    filterData(term, activeTab);
  };

  const filterData = (term: string, tabType: string) => {
    let filtered = passbookData;
    
    // Filter by search term
    if (term) {
      filtered = filtered.filter(item => 
        item.description.toLowerCase().includes(term) || 
        item.id.toLowerCase().includes(term)
      );
    }
    
    // Filter by tab type
    if (tabType === "credit") {
      filtered = filtered.filter(item => item.type === "credit");
    } else if (tabType === "debit") {
      filtered = filtered.filter(item => item.type === "debit");
    }
    
    setFilteredData(filtered);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterData(searchTerm, value);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">Passbook</CardTitle>
            <CardDescription>Your transaction history</CardDescription>
          </div>
          <CreditCard className="h-6 w-6 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="px-4 py-2 border-b">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-100">All</TabsTrigger>
              <TabsTrigger value="credit" className="data-[state=active]:bg-green-100">Credits</TabsTrigger>
              <TabsTrigger value="debit" className="data-[state=active]:bg-red-100">Debits</TabsTrigger>
            </TabsList>
          </div>

          {["all", "credit", "debit"].map(tab => (
            <TabsContent key={tab} value={tab} className="m-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Description</th>
                      <th className="text-right py-3 px-4 font-medium">Amount</th>
                      <th className="text-right py-3 px-4 font-medium">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-4 text-sm">{item.date}</td>
                          <td className="py-3 px-4">
                            <div className="flex flex-col">
                              <span>{item.description}</span>
                              <span className="text-xs text-muted-foreground">#{item.id}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end space-x-1">
                              {item.type === "credit" ? (
                                <ArrowDown className="h-3 w-3 text-green-600" />
                              ) : (
                                <ArrowUp className="h-3 w-3 text-red-600" />
                              )}
                              <span className={item.type === "credit" ? "text-green-600" : "text-red-600"}>
                                ${item.amount.toFixed(2)}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right font-medium">
                            ${item.balance.toFixed(2)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-muted-foreground">
                          No transactions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Passbook;
