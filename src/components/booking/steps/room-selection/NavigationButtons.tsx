
import React from 'react';
import { Button } from '@/components/ui/button';

type NavigationButtonsProps = {
  isEditMode: boolean;
  onBack: () => void;
  onContinue: () => void;
};

const NavigationButtons = ({ isEditMode, onBack, onContinue }: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between pt-6">
      <Button 
        onClick={onBack}
        variant="outline"
        size="lg"
      >
        {isEditMode ? "Cancel" : "Back"}
      </Button>
      <Button 
        onClick={onContinue}
        className="bg-amber-800 hover:bg-amber-900"
        size="lg"
      >
        {isEditMode ? "Save Changes" : "Continue to Checkout"}
      </Button>
    </div>
  );
};

export default NavigationButtons;
