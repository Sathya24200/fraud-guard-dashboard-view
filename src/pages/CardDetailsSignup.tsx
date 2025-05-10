
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const cardDetailsSchema = z.object({
  cardNumber: z.string()
    .min(16, "Card number must be at least 16 digits")
    .max(19, "Card number cannot exceed 19 digits")
    .regex(/^\d+$/, "Card number must contain only digits"),
  cardholderName: z.string().min(2, "Cardholder name is required"),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry date must be in MM/YY format"),
  cvv: z.string()
    .min(3, "CVV must be 3-4 digits")
    .max(4, "CVV must be 3-4 digits")
    .regex(/^\d+$/, "CVV must contain only digits"),
});

type CardDetailsFormValues = z.infer<typeof cardDetailsSchema>;

const CardDetailsSignup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CardDetailsFormValues>({
    resolver: zodResolver(cardDetailsSchema),
    defaultValues: {
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const onSubmit = async (data: CardDetailsFormValues) => {
    setIsSubmitting(true);

    try {
      // Here we would typically send this data to a secure backend or payment processor
      // For demo purposes, we'll just simulate a successful submission
      console.log("Card details submitted:", data);
      
      // Show success toast
      toast({
        title: "Card details saved",
        description: "Your card has been securely saved.",
      });
      
      // Navigate to dashboard after successful submission
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error) {
      console.error("Error saving card details:", error);
      toast({
        title: "Error saving card details",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format credit card number with spaces
  const formatCreditCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  // Format expiry date with slash
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  return (
    <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center">
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

      <div className="w-full max-w-md">
        <Card className="backdrop-blur-sm border-2 border-primary/20 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center justify-center mb-4">
              <CreditCard className="h-10 w-10 text-white/80" />
            </div>
            <CardTitle className="text-2xl text-center">Add Payment Method</CardTitle>
            <CardDescription className="text-center text-white/80">
              Your details are protected with end-to-end encryption
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="cardholderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cardholder Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field} 
                          className="border-2 focus:ring-2 focus:ring-blue-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field: { onChange, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="1234 5678 9012 3456" 
                          onChange={(e) => {
                            const formatted = formatCreditCardNumber(e.target.value);
                            e.target.value = formatted;
                            onChange(e);
                          }}
                          maxLength={19}
                          className="border-2 focus:ring-2 focus:ring-blue-400 font-mono"
                          {...rest}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field: { onChange, ...rest } }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="MM/YY" 
                            onChange={(e) => {
                              const formatted = formatExpiryDate(e.target.value);
                              e.target.value = formatted;
                              onChange(e);
                            }}
                            maxLength={5}
                            className="border-2 focus:ring-2 focus:ring-blue-400 font-mono"
                            {...rest}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="•••" 
                            maxLength={4}
                            className="border-2 focus:ring-2 focus:ring-blue-400 font-mono"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Secure Submit"}
                </Button>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex justify-center bg-slate-50 rounded-b-lg">
            <div className="text-sm text-muted-foreground text-center">
              <p>Your payment information is securely encrypted</p>
              <p className="mt-1">We comply with PCI DSS standards for secure handling of card data</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CardDetailsSignup;
