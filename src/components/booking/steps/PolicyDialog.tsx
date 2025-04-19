
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Signature } from "lucide-react";

interface PolicyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  title: string;
  content: string;
}

const PolicyDialog = ({ isOpen, onClose, onAccept, title, content }: PolicyDialogProps) => {
  const [signature, setSignature] = useState('');
  
  const handleAccept = () => {
    if (!signature.trim()) {
      return;
    }
    onAccept();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="text-sm" dangerouslySetInnerHTML={{ __html: content }} />
        </ScrollArea>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="signature">Please type your full name to sign</Label>
            <div className="flex items-center gap-2">
              <Signature className="h-5 w-5 text-gray-500" />
              <Input
                id="signature"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Your full name"
                className="flex-1"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button 
              onClick={handleAccept}
              disabled={!signature.trim()}
              className="bg-amber-500 hover:bg-amber-600"
            >
              <Check className="mr-2 h-4 w-4" /> Accept & Sign
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyDialog;
