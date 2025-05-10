
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck, HelpCircle } from "lucide-react";

const Help = () => {
  return (
    <div className="container py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <HelpCircle className="h-12 w-12 text-primary mb-4" />
        <h1 className="text-3xl font-bold">Help Center</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Find answers to common questions about our fraud detection system and how to keep your transactions secure.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>How Our AI Protection Works</CardTitle>
            <CardDescription>Understanding our fraud detection system</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Our advanced AI-powered system analyzes your transaction patterns in real-time to detect suspicious activities:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Machine learning algorithms analyze hundreds of data points</li>
              <li>Real-time transaction analysis for immediate protection</li>
              <li>Pattern recognition to identify unusual spending behavior</li>
              <li>Constant updates to adapt to new fraud techniques</li>
              <li>Minimal false positives to ensure legitimate transactions go through</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Best Practices</CardTitle>
            <CardDescription>Keep your account safe with these tips</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use strong, unique passwords for your account</li>
              <li>Enable two-factor authentication when available</li>
              <li>Regularly monitor your transaction history</li>
              <li>Report suspicious transactions immediately</li>
              <li>Never share your login credentials or PIN</li>
              <li>Be cautious with public WiFi when making transactions</li>
              <li>Keep your contact information updated for alerts</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Common questions about our fraud detection system</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">What should I do if I notice a fraudulent transaction?</AccordionTrigger>
              <AccordionContent>
                Contact our support team immediately at support@fraudguard.example.com or call our 24/7 hotline at 1-800-FRAUD-HELP. We recommend you also change your password and review other recent transactions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">How does the system differentiate between unusual but legitimate transactions and fraud?</AccordionTrigger>
              <AccordionContent>
                Our AI system considers multiple factors including your transaction history, location, device information, and spending patterns. It's designed to minimize false positives while providing maximum security.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">Will I be notified if a transaction is blocked?</AccordionTrigger>
              <AccordionContent>
                Yes, you will receive an immediate notification via email and/or SMS (based on your notification preferences) if a transaction is blocked due to suspected fraud.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">Does the system store my credit card information?</AccordionTrigger>
              <AccordionContent>
                No, we use tokenization to protect your sensitive financial information. Your actual credit card numbers are never stored in our system.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">How can I improve my security score?</AccordionTrigger>
              <AccordionContent>
                You can improve your security score by enabling all security features, keeping your contact information updated, regularly reviewing transactions, and following our security best practices.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <div className="bg-primary/5 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <ShieldCheck className="h-12 w-12 text-primary mr-4" />
          <div>
            <h3 className="text-xl font-semibold">Need more help?</h3>
            <p className="text-muted-foreground">Our support team is available 24/7</p>
          </div>
        </div>
        <div className="text-center md:text-right">
          <p><strong>Email:</strong> support@fraudguard.example.com</p>
          <p><strong>Phone:</strong> 1-800-FRAUD-HELP</p>
        </div>
      </div>
    </div>
  );
};

export default Help;
