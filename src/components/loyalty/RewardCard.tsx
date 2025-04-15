
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface RewardCardProps {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  imageUrl?: string;
  currentPoints: number;
  onRedeem?: () => void;
}

const RewardCard = ({ 
  id, 
  name, 
  description, 
  pointsCost, 
  imageUrl, 
  currentPoints,
  onRedeem 
}: RewardCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const navigate = useNavigate();
  
  const canAfford = currentPoints >= pointsCost;

  const handleRedeem = async () => {
    if (!canAfford) return;
    
    setIsRedeeming(true);
    try {
      // Insert redemption record
      const { error: redemptionError } = await supabase
        .from('redemptions')
        .insert({ reward_id: id });
        
      if (redemptionError) throw redemptionError;

      // Deduct points in transaction table
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          points: -pointsCost,
          transaction_type: 'redemption',
          description: `Redeemed: ${name}`
        });
        
      if (transactionError) throw transactionError;
      
      toast.success("Reward redeemed successfully!");
      if (onRedeem) onRedeem();
      setIsDialogOpen(false);
      navigate("/activity");
    } catch (error) {
      console.error("Error redeeming reward:", error);
      toast.error("Failed to redeem reward. Please try again.");
    } finally {
      setIsRedeeming(false);
    }
  };
  
  return (
    <>
      <Card className="overflow-hidden h-full flex flex-col">
        {imageUrl && (
          <div className="aspect-[5/3] relative">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute top-2 right-2 bg-amber-100 text-amber-900 px-2 py-1 rounded-md text-sm font-medium">
              {pointsCost} Points
            </div>
          </div>
        )}
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {!imageUrl && (
            <div className="text-lg font-semibold mb-2">
              {pointsCost} Points
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-0">
          <Button 
            onClick={() => setIsDialogOpen(true)} 
            disabled={!canAfford}
            className={canAfford ? "bg-amber-500 hover:bg-amber-600 w-full" : "w-full"}
            variant={canAfford ? "default" : "outline"}
          >
            {canAfford ? "Redeem" : "Not Enough Points"}
          </Button>
        </CardFooter>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Redemption</DialogTitle>
            <DialogDescription>
              You're about to redeem {name} for {pointsCost} points. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="font-medium">After redemption:</p>
            <p className="text-sm text-gray-500">Your points: {currentPoints} - {pointsCost} = {currentPoints - pointsCost}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isRedeeming}>
              Cancel
            </Button>
            <Button 
              onClick={handleRedeem} 
              className="bg-amber-500 hover:bg-amber-600"
              disabled={isRedeeming}
            >
              {isRedeeming ? "Processing..." : "Confirm Redemption"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RewardCard;
