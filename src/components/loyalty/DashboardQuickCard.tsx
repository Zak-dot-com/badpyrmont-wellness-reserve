
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardQuickCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
  linkTo: string;
  color?: string;
}

const DashboardQuickCard = ({
  title,
  icon: Icon,
  description,
  linkTo,
  color = "text-amber-500",
}: DashboardQuickCardProps) => {
  return (
    <Link to={linkTo}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardContent className="flex flex-col items-center text-center p-6">
          <div className={`p-3 rounded-full mb-4 ${color.replace('text-', 'bg-').replace('500', '100')}`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DashboardQuickCard;
