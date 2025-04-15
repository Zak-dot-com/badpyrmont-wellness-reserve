
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface TierCardProps {
  tier: "Silver" | "Gold" | "Platinum";
  points: number;
}

const TierCard = ({ tier, points }: TierCardProps) => {
  // Define tier thresholds and colors
  const tiers = {
    Silver: { min: 0, max: 1000, color: "text-gray-500", bgColor: "bg-gray-200", progress: "bg-gray-400" },
    Gold: { min: 1000, max: 5000, color: "text-amber-500", bgColor: "bg-amber-100", progress: "bg-amber-400" },
    Platinum: { min: 5000, max: Infinity, color: "text-emerald-600", bgColor: "bg-emerald-100", progress: "bg-emerald-400" },
  };

  const currentTier = tiers[tier];
  const nextTier = tier === "Silver" ? "Gold" : tier === "Gold" ? "Platinum" : null;
  const nextTierThreshold = tier === "Silver" ? 1000 : tier === "Gold" ? 5000 : Infinity;
  
  // Calculate progress to next tier
  const pointsToNextTier = nextTierThreshold - points;
  const progressPercent = nextTier 
    ? Math.min(Math.round((points - currentTier.min) / (nextTierThreshold - currentTier.min) * 100), 100)
    : 100;

  return (
    <Card className={cn("overflow-hidden border-t-4", {
      "border-t-gray-400": tier === "Silver",
      "border-t-amber-400": tier === "Gold",
      "border-t-emerald-400": tier === "Platinum",
    })}>
      <CardHeader className={cn("pb-2", currentTier.bgColor)}>
        <CardTitle className="flex items-center gap-2">
          <Award className={cn("h-5 w-5", currentTier.color)} />
          <span className={currentTier.color}>{tier} Member</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-2xl font-bold mb-2">{points.toLocaleString()} Points</div>
        {nextTier ? (
          <>
            <div className="text-sm text-gray-500 mb-1">
              {pointsToNextTier.toLocaleString()} points to {nextTier}
            </div>
            <Progress value={progressPercent} className={cn("h-2", currentTier.progress)} />
          </>
        ) : (
          <div className="text-sm text-gray-500">
            You've reached our highest tier!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TierCard;
