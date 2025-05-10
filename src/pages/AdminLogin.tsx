
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Shield, HelpCircle } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password, true);
      if (success) {
        navigate('/admin');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex h-[calc(100vh-10rem)] items-center justify-center relative">
      <div className="absolute top-4 right-4">
        <Button 
          variant="outline" 
          onClick={() => navigate("/help")} 
          className="bg-white bg-opacity-80 text-primary flex items-center gap-2"
        >
          <HelpCircle className="h-4 w-4" />
          Help Desk
        </Button>
      </div>
      
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-2 border-primary/20 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-slate-800 to-gray-700 text-white rounded-t-lg">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-10 w-10 text-blue-300" />
          </div>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          <CardDescription className="text-center text-gray-300">
            Secure access for FraudGuard administrators
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <Button type="submit" className="w-full bg-gradient-to-r from-slate-800 to-gray-700 hover:from-slate-900 hover:to-gray-800 transition-all duration-300" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            <div className="mt-4 w-full text-center">
              <Button variant="link" onClick={() => navigate('/login')}>
                User Login
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
