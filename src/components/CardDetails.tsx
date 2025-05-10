
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Eye, EyeOff, Lock } from "lucide-react";

const CardDetails = () => {
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  
  // Mock card data
  const cardData = {
    type: "Visa",
    number: "4532 •••• •••• 7895",
    fullNumber: "4532 1598 7462 7895",
    name: "John Doe",
    expiry: "09/27",
    cvv: "•••",
    realCvv: "347",
    limit: 10000,
    available: 7240.50
  };

  const toggleCardNumber = () => {
    setShowCardNumber(!showCardNumber);
  };

  const toggleCvv = () => {
    setShowCvv(!showCvv);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex justify-between">
          <div>
            <CardTitle>My Card</CardTitle>
            <CardDescription className="text-blue-100">Manage your card details</CardDescription>
          </div>
          <CreditCard className="h-6 w-6 text-blue-100" />
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Card Visualization */}
        <div className="relative h-52 bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 overflow-hidden">
          {/* Card background patterns */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full -ml-20 -mb-40"></div>
          
          {/* Card chip */}
          <div className="w-12 h-8 bg-yellow-500/80 rounded-md mb-6 flex items-center justify-center">
            <div className="w-10 h-6 bg-yellow-600/80 rounded-sm flex flex-col justify-between py-1 px-[2px]">
              <div className="border-b border-yellow-700/80 h-[2px]"></div>
              <div className="border-b border-yellow-700/80 h-[2px]"></div>
            </div>
          </div>
          
          {/* Card number */}
          <div className="mb-4 text-lg tracking-widest">
            {showCardNumber ? cardData.fullNumber : cardData.number}
            <button 
              onClick={toggleCardNumber} 
              className="ml-2 text-blue-300 hover:text-blue-200 transition-colors"
            >
              {showCardNumber ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          
          {/* Card holder & expiry */}
          <div className="flex justify-between">
            <div>
              <div className="text-xs text-blue-200 mb-1">CARD HOLDER</div>
              <div className="font-medium">{cardData.name}</div>
            </div>
            <div>
              <div className="text-xs text-blue-200 mb-1">EXPIRES</div>
              <div className="font-medium">{cardData.expiry}</div>
            </div>
            <div>
              <div className="text-xs text-blue-200 mb-1">CVV</div>
              <div className="font-medium flex items-center">
                {showCvv ? cardData.realCvv : cardData.cvv}
                <button 
                  onClick={toggleCvv} 
                  className="ml-2 text-blue-300 hover:text-blue-200 transition-colors"
                >
                  {showCvv ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
          
          {/* Card type */}
          <div className="absolute right-6 top-6 flex items-center gap-1 font-bold">
            <span className="text-white">{cardData.type}</span>
          </div>
        </div>
        
        {/* Card Details */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <div className="text-sm text-muted-foreground">Credit Limit</div>
              <div className="text-xl font-medium">${cardData.limit.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Available Credit</div>
              <div className="text-xl font-medium text-green-600">${cardData.available.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Lock className="h-4 w-4" /> 
              Freeze Card
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Report Lost/Stolen
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardDetails;
