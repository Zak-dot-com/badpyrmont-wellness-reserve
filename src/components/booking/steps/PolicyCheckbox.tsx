
import React from 'react';
import { Check } from "lucide-react";

interface PolicyCheckboxProps {
  checked: boolean;
  onClick: () => void;
  label: string;
}

const PolicyCheckbox = ({ checked, onClick, label }: PolicyCheckboxProps) => (
  <div 
    onClick={onClick}
    className="flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors hover:bg-gray-50"
  >
    <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
      checked ? 'bg-amber-500' : 'bg-gray-200'
    }`}>
      <Check className={`h-4 w-4 ${checked ? 'text-white' : 'text-gray-400'}`} />
    </div>
    <span className="text-sm text-gray-700">{label}</span>
  </div>
);

export default PolicyCheckbox;
