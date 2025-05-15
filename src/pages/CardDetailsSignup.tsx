
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
import { CreditCard, HelpCircle, Smartphone, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

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

const mobileVerificationSchema = z.object({
  mobileNumber: z.string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number cannot exceed 15 digits")
    .regex(/^\d+$/, "Mobile number must contain only digits"),
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

type CardDetailsFormValues = z.infer<typeof cardDetailsSchema>;
type MobileVerificationFormValues = z.infer<typeof mobileVerificationSchema>;

const CardDetailsSignup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [step, setStep] = useState<'card' | 'mobile' | 'otp'>('card');
  const [otpSent, setOtpSent] = useState(false);
  const [cardDetails, setCardDetails] = useState<CardDetailsFormValues | null>(null);

  const cardForm = useForm<CardDetailsFormValues>({
    resolver: zodResolver(cardDetailsSchema),
    defaultValues: {
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const mobileForm = useForm<MobileVerificationFormValues>({
    resolver: zodResolver(mobileVerificationSchema),
    defaultValues: {
      mobileNumber: '',
      otp: '',
    },
  });

  const submitCardDetails = async (data: CardDetailsFormValues) => {
    setIsSubmitting(true);

    try {
      // Here we would typically validate the card details
      console.log("Card details submitted:", data);
      
      // Store card details for final confirmation
      setCardDetails(data);
      
      // Show toast and proceed to mobile number entry
      toast({
        title: "Card details received",
        description: "Please enter your mobile number for verification.",
      });
      
      setTimeout(() => {
        setStep('mobile');
      }, 1500);

    } catch (error) {
      console.error("Error processing card details:", error);
      toast({
        title: "Error processing card details",
        description: "Please check your card information and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendOTP = async (data: { mobileNumber: string }) => {
    setIsSendingOTP(true);
    
    try {
      // In a real application, this would make an API call to send the OTP
      console.log("Sending OTP to:", data.mobileNumber);
      
      // Simulate OTP sent
      setTimeout(() => {
        toast({
          title: "OTP Sent",
          description: `A verification code has been sent to ${data.mobileNumber}`,
        });
        
        setOtpSent(true);
        setStep('otp');
      }, 1500);
      
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({
        title: "Failed to send OTP",
        description: "Please check your mobile number and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSendingOTP(false);
    }
  };

  const verifyOTP = async (data: { otp: string }) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would make an API call to verify the OTP
      console.log("Verifying OTP:", data.otp);
      
      // Simulate OTP verification
      setTimeout(() => {
        toast({
          title: "Card Verified Successfully",
          description: "Your card has been securely added to your account.",
        });
        
        // Navigate to dashboard after successful verification
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast({
        title: "Invalid OTP",
        description: "The verification code you entered is incorrect.",
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
              {step === 'card' && (
                <CreditCard className="h-10 w-10 text-white/80" />
              )}
              {step === 'mobile' && (
                <Smartphone className="h-10 w-10 text-white/80" />
              )}
              {step === 'otp' && (
                <Shield className="h-10 w-10 text-white/80" />
              )}
            </div>
            <CardTitle className="text-2xl text-center">
              {step === 'card' && "Add Payment Method"}
              {step === 'mobile' && "Enter Your Mobile Number"}
              {step === 'otp' && "Verify Your Mobile Number"}
            </CardTitle>
            <CardDescription className="text-center text-white/80">
              {step === 'card' && "Your details are protected with end-to-end encryption"}
              {step === 'mobile' && "We'll send a verification code to your phone"}
              {step === 'otp' && "Enter the 6-digit code sent to your mobile"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            {step === 'card' && (
              <Form {...cardForm}>
                <form onSubmit={cardForm.handleSubmit(submitCardDetails)} className="space-y-6">
                  <FormField
                    control={cardForm.control}
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
                    control={cardForm.control}
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
                      control={cardForm.control}
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
                      control={cardForm.control}
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
                    {isSubmitting ? "Processing..." : "Continue to Mobile Verification"}
                  </Button>
                </form>
              </Form>
            )}
            
            {step === 'mobile' && (
              <Form {...mobileForm}>
                <form onSubmit={mobileForm.handleSubmit(sendOTP)} className="space-y-6">
                  <div className="p-4 bg-slate-50 rounded-lg mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-500 h-5 w-5" />
                      <p className="text-sm font-medium">Card details received</p>
                    </div>
                    {cardDetails && (
                      <p className="text-sm text-muted-foreground mt-1">
                        **** **** **** {cardDetails.cardNumber.replace(/\s/g, '').slice(-4)}
                      </p>
                    )}
                  </div>
                
                  <FormField
                    control={mobileForm.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <Input 
                              placeholder="Enter your mobile number" 
                              {...field} 
                              className="border-2 focus:ring-2 focus:ring-blue-400"
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          We'll send a verification code to this number
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isSendingOTP}
                  >
                    {isSendingOTP ? "Sending..." : "Send Verification Code"}
                  </Button>
                </form>
              </Form>
            )}
            
            {step === 'otp' && (
              <Form {...mobileForm}>
                <form onSubmit={mobileForm.handleSubmit(verifyOTP)} className="space-y-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex flex-col items-center space-y-2">
                      <Shield className="h-12 w-12 text-primary" />
                      <h3 className="text-xl font-medium text-center">Verification Code</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        We've sent a 6-digit code to your mobile number
                      </p>
                    </div>
                    
                    {cardDetails && (
                      <div className="p-4 bg-slate-50 rounded-lg w-full">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="text-green-500 h-5 w-5" />
                          <p className="text-sm font-medium">Card details received</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          **** **** **** {cardDetails.cardNumber.replace(/\s/g, '').slice(-4)}
                        </p>
                      </div>
                    )}
                    
                    <FormField
                      control={mobileForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex flex-col space-y-2 w-full">
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Verifying..." : "Complete Verification"}
                      </Button>
                      
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setStep('mobile')}
                        className="text-sm"
                      >
                        Change Mobile Number
                      </Button>
                      
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => sendOTP({ mobileNumber: mobileForm.getValues("mobileNumber") })}
                        disabled={isSendingOTP}
                        className="text-sm"
                      >
                        {isSendingOTP ? "Resending..." : "Resend Code"}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-center bg-slate-50 rounded-b-lg">
            <div className="text-sm text-muted-foreground text-center">
              <p>Your information is securely encrypted</p>
              <p className="mt-1">We comply with PCI DSS standards for secure handling of data</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CardDetailsSignup;
