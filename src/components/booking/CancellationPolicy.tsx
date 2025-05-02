
import React from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CancellationPolicyProps = {
  showTooltip?: boolean;
  showFull?: boolean;
}

const CancellationPolicy = ({ showTooltip = false, showFull = true }: CancellationPolicyProps) => {
  const policyContent = (
    <div className="space-y-2">
      <p className="text-gray-700">
        <span className="font-semibold text-amber-700">Free cancellation</span> up to 1 month before the scheduled date.
      </p>
      <p className="text-gray-700">
        <span className="font-semibold text-amber-700">50% fee</span> if canceled 2–4 weeks before.
      </p>
      <p className="text-gray-700">
        <span className="font-semibold text-amber-700">70% fee</span> if canceled 1–2 weeks before.
      </p>
      <p className="text-gray-700">
        <span className="font-semibold text-amber-700">100% fee</span> if canceled within 1 week.
      </p>
    </div>
  );

  if (!showFull && !showTooltip) return null;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
      <div className="flex items-start gap-3">
        <div className="bg-amber-100 rounded-full p-2 mt-1">
          <Info className="h-4 w-4 text-amber-700" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-800">Cancellation Policy</h3>
            {showTooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs p-4">
                    {policyContent}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          {showFull && policyContent}
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;
