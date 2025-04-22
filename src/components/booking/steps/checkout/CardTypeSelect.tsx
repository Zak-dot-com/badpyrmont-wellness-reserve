
import React from "react";

// Card logos - can be SVGs or emojis for a demo, switch to your assets as desired
const CARD_TYPES = [
  {
    value: "visa",
    label: "Visa",
    color: "#1a1f71",
    logo: (
      <svg width="28" height="20" viewBox="0 0 40 28"><rect fill="#1a1f71" rx="4" width="40" height="28"/><text x="20" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">VISA</text></svg>
    ),
  },
  {
    value: "mastercard",
    label: "Mastercard",
    color: "#ff5f00",
    logo: (
      <svg width="28" height="20" viewBox="0 0 40 28"><rect fill="#ff5f00" rx="4" width="40" height="28"/><circle cx="15" cy="14" r="7" fill="#eb001b"/><circle cx="25" cy="14" r="7" fill="#f79e1b"/><text x="20" y="26" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">MC</text></svg>
    ),
  },
  {
    value: "amex",
    label: "American Express",
    color: "#2e77bb",
    logo: (
      <svg width="28" height="20" viewBox="0 0 40 28"><rect fill="#2e77bb" rx="4" width="40" height="28"/><text x="20" y="16" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">AMEX</text></svg>
    ),
  },
];

export type CardType = typeof CARD_TYPES[number]["value"];

interface Props {
  value: CardType;
  onChange: (val: CardType) => void;
}

const CardTypeSelect: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="relative flex items-center gap-2">
      <select
        className="appearance-none pr-8 pl-2 min-w-[128px] h-10 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-hotel-primary focus:outline-none transition"
        value={value}
        onChange={e => onChange(e.target.value as CardType)}
      >
        {CARD_TYPES.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
      {/* Show logo of selected card */}
      <div className="absolute right-2 pointer-events-none top-1/2 -translate-y-1/2">
        <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="none"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </div>
      <span className="ml-2">
        {CARD_TYPES.find(t => t.value === value)?.logo}
      </span>
    </div>
  );
};

export { CARD_TYPES, CardTypeSelect };
