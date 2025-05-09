
import { Check } from 'lucide-react';

type SummaryItemDetailProps = {
  label: string;
  value: React.ReactNode;
};

export const SummaryItemDetail = ({ label, value }: SummaryItemDetailProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-700">{label}</h4>
      <p>{value}</p>
    </div>
  );
};

type SummaryAddOnListProps = {
  addons: string[];
  getAddonName?: (id: string) => string;
};

export const SummaryAddOnList = ({ addons, getAddonName }: SummaryAddOnListProps) => {
  if (!addons || addons.length === 0) return null;

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-700">Add-ons</h4>
      <ul className="mt-1">
        {addons.map((addon) => (
          <li key={addon} className="flex items-center gap-1.5 text-sm">
            <Check className="h-4 w-4 text-green-500" />
            {getAddonName ? getAddonName(addon) : addon}
          </li>
        ))}
      </ul>
    </div>
  );
};
