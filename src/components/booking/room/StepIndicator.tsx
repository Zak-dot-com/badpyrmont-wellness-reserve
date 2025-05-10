
import React from 'react';
import { cn } from '@/lib/utils';

type StepIndicatorProps = {
  activeStep: 'dates' | 'room' | 'checkout';
  onStepClick: (step: 'dates' | 'room' | 'checkout') => void;
};

const StepIndicator = ({ activeStep, onStepClick }: StepIndicatorProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-center">
        <div className="flex items-center">
          <div 
            className={cn("flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer", 
              activeStep === 'dates' ? "border-amber-500 bg-amber-50" : "border-gray-300 bg-white")} 
            onClick={() => onStepClick('dates')}
          >
            <span className={cn("text-sm font-semibold", 
              activeStep === 'dates' ? "text-amber-700" : "text-gray-500")}>1</span>
          </div>
          
          <div className={cn("w-12 h-0.5", 
            activeStep !== 'dates' ? "bg-amber-500" : "bg-gray-300")}></div>
          
          <div 
            className={cn("flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer", 
              activeStep === 'room' ? "border-amber-500 bg-amber-50" : 
              activeStep === 'checkout' ? "border-amber-500 bg-white" : "border-gray-300 bg-white")} 
            onClick={() => onStepClick('room')}
          >
            <span className={cn("text-sm font-semibold", 
              activeStep === 'room' ? "text-amber-700" : 
              activeStep === 'checkout' ? "text-amber-700" : "text-gray-500")}>2</span>
          </div>
          
          <div className={cn("w-12 h-0.5", 
            activeStep === 'checkout' ? "bg-amber-500" : "bg-gray-300")}></div>
          
          <div 
            className={cn("flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer", 
              activeStep === 'checkout' ? "border-amber-500 bg-amber-50" : "border-gray-300 bg-white")} 
            onClick={() => onStepClick('checkout')}
          >
            <span className={cn("text-sm font-semibold", 
              activeStep === 'checkout' ? "text-amber-700" : "text-gray-500")}>3</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-2">
        <div className="flex space-x-16 text-sm">
          <span 
            className={cn("cursor-pointer", 
              activeStep === 'dates' ? "text-amber-700 font-medium" : "text-gray-500")}
            onClick={() => onStepClick('dates')}
          >
            Dates
          </span>
          <span 
            className={cn("cursor-pointer", 
              activeStep === 'room' ? "text-amber-700 font-medium" : "text-gray-500")}
            onClick={() => onStepClick('room')}
          >
            Room
          </span>
          <span 
            className={cn("cursor-pointer", 
              activeStep === 'checkout' ? "text-amber-700 font-medium" : "text-gray-500")}
            onClick={() => onStepClick('checkout')}
          >
            Checkout
          </span>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
