
import React from 'react';
import { Button } from '@/components/ui/button';

type NavigationButtonsProps = {
  isEditMode: boolean;
  onBack: () => void;
  onContinue: () => void;
};

const NavigationButtons = ({
  isEditMode,
  onBack,
  onContinue
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between">
      <Button 
        variant="outline" 
        onClick={onBack}
        className="border-amber-500 text-amber-700 hover:bg-amber-50"
      >
        {isEditMode ? "Cancel" : "Back"}
      </Button>
      
      <Button 
        onClick={onContinue} 
        className="bg-amber-600 hover:bg-amber-700"
      >
        {isEditMode ? "Save Changes" : "Continue to Checkout"}
      </Button>
    </div>
  );
};

export default NavigationButtons;
