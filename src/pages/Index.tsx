
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, BarChart, FileText, HelpCircle, CreditCard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-b from-slate-50 to-blue-100 dark:from-slate-950 dark:to-blue-900">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] right-[10%] w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[30%] w-72 h-72 bg-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 py-16 relative z-10">
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

        {/* Hero section */}
        <motion.div
          className="flex flex-col items-center text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-sm"></div>
              <div className="bg-white dark:bg-slate-900 rounded-full p-4 relative">
                <ShieldCheck className="h-12 w-12 text-blue-600" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              FraudGuard
            </span>
          </h1>

          <p className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white">
            AI-Powered Credit Card 
            <span className="text-primary"> Fraud Detection</span>
          </p>
          
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            Protecting your transactions with advanced AI algorithms that detect and prevent fraudulent activities in real-time.
          </p>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {user ? (
              <Button 
                size="lg" 
                onClick={() => navigate(isAdmin() ? "/admin" : "/dashboard")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button 
                  size="lg" 
                  onClick={() => navigate("/login")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Sign In
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => navigate("/help")}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Learn More
                </Button>
              </>
            )}
          </div>
        </motion.div>

        {/* Features section */}
        <motion.div 
          className="mt-20 grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="rounded-2xl border-2 border-blue-100 dark:border-blue-800 bg-white dark:bg-slate-800 p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            variants={itemVariants}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <ShieldCheck className="h-8 w-8 text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Real-time Protection</h3>
            <p className="text-muted-foreground">
              Advanced algorithms protect your transactions from fraudulent activities in real-time with 99.9% accuracy.
            </p>
          </motion.div>

          <motion.div 
            className="rounded-2xl border-2 border-purple-100 dark:border-purple-800 bg-white dark:bg-slate-800 p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            variants={itemVariants}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
              <BarChart className="h-8 w-8 text-purple-600 dark:text-purple-300" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Advanced Analytics</h3>
            <p className="text-muted-foreground">
              Comprehensive dashboards provide insights into transaction patterns and identify potential security threats.
            </p>
          </motion.div>

          <motion.div 
            className="rounded-2xl border-2 border-pink-100 dark:border-pink-800 bg-white dark:bg-slate-800 p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            variants={itemVariants}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900">
              <CreditCard className="h-8 w-8 text-pink-600 dark:text-pink-300" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Card Management</h3>
            <p className="text-muted-foreground">
              Easily manage your cards, monitor transactions, and receive instant alerts for suspicious activity.
            </p>
          </motion.div>
        </motion.div>

        {/* Testimonial section */}
        <motion.div 
          className="mt-24 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 border border-blue-100 dark:border-slate-700"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold mb-6">Trusted by Financial Institutions Worldwide</h2>
            <blockquote className="text-lg italic">
              "FraudGuard has revolutionized how we approach fraud detection. The AI-powered system has reduced our fraud cases by 92% while maintaining an excellent customer experience."
            </blockquote>
            <p className="mt-4 font-semibold">- Sarah Johnson, Chief Security Officer at Global Banking Inc.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
