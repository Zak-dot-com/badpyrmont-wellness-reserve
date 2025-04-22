
import React, { useMemo } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { ArrowDown } from 'lucide-react';

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
  // Add more countries as needed
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
        className="min-w-[82px] max-w-[110px] pr-8 pl-2 py-0.5 bg-white border border-gray-300 rounded-md flex items-center justify-between mr-2 h-10 focus:ring-2 ring-amber-400 transition"
        style={{ color: '#000', backgroundColor: '#fff' }}
      >
        <span className="flex items-center gap-1">
          <span className="text-lg">{selected.flag}</span>
          <span className="text-base">{selected.code}</span>
        </span>
        <ArrowDown size={16} className="ml-1 text-gray-500 pointer-events-none" />
      </SelectTrigger>
      <SelectContent className="max-h-72 bg-white text-black z-50 shadow-xl border border-gray-200">
        {COUNTRIES.map((c) => (
          <SelectItem key={c.code} value={c.code} className="flex items-center gap-2 px-2 py-2">
            <span className="text-lg mr-2">{c.flag}</span>
            <span className="mr-2">{c.name}</span>
            <span className="ml-auto text-xs text-gray-500">{c.code}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CountryCodeSelect;

