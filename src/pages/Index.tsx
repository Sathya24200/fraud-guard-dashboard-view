
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, BarChart, FileText } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  return (
    <div className="container px-4 py-10 md:py-16">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          AI-Powered Credit Card 
          <span className="text-primary"> Fraud Detection</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          Protecting your transactions with advanced AI algorithms that detect and prevent fraudulent activities in real-time.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {user ? (
            <Button size="lg" onClick={() => navigate(isAdmin() ? "/admin" : "/dashboard")}>
              Go to Dashboard
            </Button>
          ) : (
            <>
              <Button size="lg" onClick={() => navigate("/login")}>
                Sign In
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/help")}>
                Learn More
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-3">
        <div className="rounded-lg border p-6 text-center shadow-sm">
          <ShieldCheck className="mx-auto h-10 w-10 text-primary" />
          <h3 className="mt-4 text-xl font-bold">Protection</h3>
          <p className="mt-2 text-muted-foreground">
            Advanced algorithms protect your transactions from fraudulent activities in real-time.
          </p>
        </div>
        <div className="rounded-lg border p-6 text-center shadow-sm">
          <BarChart className="mx-auto h-10 w-10 text-primary" />
          <h3 className="mt-4 text-xl font-bold">Analytics</h3>
          <p className="mt-2 text-muted-foreground">
            Comprehensive dashboards provide insights into transaction patterns and security threats.
          </p>
        </div>
        <div className="rounded-lg border p-6 text-center shadow-sm">
          <FileText className="mx-auto h-10 w-10 text-primary" />
          <h3 className="mt-4 text-xl font-bold">Reports</h3>
          <p className="mt-2 text-muted-foreground">
            Detailed reports on blocked transactions and security incidents for review.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
