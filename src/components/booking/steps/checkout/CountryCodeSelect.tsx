import React, { useMemo } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { ChevronDown } from 'lucide-react';

// Country list with emoji flags as fallback, proper unicode or icon for real implementation
const COUNTRIES = [
  {
    code: '+49',
    name: 'Germany',
    countryCode: 'DE',
    flag: '🇩🇪',
  },
  {
    code: '+1',
    name: 'United States',
    countryCode: 'US',
    flag: '🇺🇸',
  },
  {
    code: '+44',
    name: 'United Kingdom',
    countryCode: 'GB',
    flag: '🇬🇧',
  },
  {
    code: '+33',
    name: 'France',
    countryCode: 'FR',
    flag: '🇫🇷',
  },
  {
    code: '+39',
    name: 'Italy',
    countryCode: 'IT',
    flag: '🇮🇹',
  },
  {
    code: '+34',
    name: 'Spain',
    countryCode: 'ES',
    flag: '🇪🇸',
  },
  {
    code: '+43',
    name: 'Austria',
    countryCode: 'AT',
    flag: '🇦🇹',
  },
  {
    code: '+41',
    name: 'Switzerland',
    countryCode: 'CH',
    flag: '🇨🇭',
  },
  {
    code: '+7',
    name: 'Russia',
    countryCode: 'RU',
    flag: '🇷🇺',
  }
];

type Country = typeof COUNTRIES[number];

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const CountryCodeSelect: React.FC<Props> = ({ value, onChange }) => {
  const selected = useMemo(() => COUNTRIES.find(c => c.code === value) || COUNTRIES[0], [value]);

  return (
    <Select value={selected.code} onValueChange={onChange}>
      <SelectTrigger
        aria-label="Select country code"
        className="min-w-[100px] max-w-[120px] pr-2 pl-2 py-0.5 bg-white border border-gray-300 rounded-md flex items-center justify-between mr-2 h-10 focus:ring-2 ring-amber-400 transition"
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">{selected.flag}</span>
          <span className="text-sm font-medium text-gray-800">{selected.code}</span>
        </span>
        <ChevronDown size={16} className="ml-1 text-gray-500 pointer-events-none" />
      </SelectTrigger>
      <SelectContent className="max-h-72 bg-white text-gray-800 z-50 shadow-lg border border-gray-200 rounded-md">
        {COUNTRIES.map((c) => (
          <SelectItem 
            key={c.code} 
            value={c.code} 
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <span className="text-lg mr-2">{c.flag}</span>
            <span className="flex-grow text-sm">{c.name}</span>
            <span className="text-xs text-gray-500 ml-auto">{c.code}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CountryCodeSelect;
