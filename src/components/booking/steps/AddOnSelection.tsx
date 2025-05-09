
import { useBooking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Euro, Plus, Minus, Bath, Dumbbell as Activity, Utensils, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import AddonDetailDialog from './AddonDetailDialog';

type AddOnSelectionProps = {
  isEditMode?: boolean;
  onEditComplete?: () => void;
};

const AddOnSelection = ({ isEditMode = false, onEditComplete }: AddOnSelectionProps) => {
  const { bookingData, toggleAddOn, updateAddOnQuantity, setCurrentStep } = useBooking();
  const { addOnCategories } = bookingData;
  
  const [selectedAddon, setSelectedAddon] = useState<{
    id: string;
    name: string;
    description: string;
    price: number;
    selected: boolean;
    quantity: number;
    categoryId: string;
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleContinue = () => {
    if (isEditMode && onEditComplete) {
      onEditComplete();
      toast.success("Add-ons updated successfully");
    } else {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (isEditMode && onEditComplete) {
      onEditComplete();
    } else {
      setCurrentStep(1);
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'wellness-treatments':
        return <Bath className="h-5 w-5 mr-2 text-amber-500" />;
      case 'fitness-activities':
        return <Activity className="h-5 w-5 mr-2 text-amber-500" />;
      case 'nutrition':
        return <Utensils className="h-5 w-5 mr-2 text-amber-500" />;
      default:
        return null;
    }
  };

  const openAddonDetail = (categoryId: string, item: any) => {
    setSelectedAddon({
      ...item,
      categoryId
    });
    setIsDialogOpen(true);
  };

  const handleToggleSelectedAddon = () => {
    if (!selectedAddon) return;
    
    toggleAddOn(selectedAddon.categoryId, selectedAddon.id);
    
    // Update local state to reflect the change
    setSelectedAddon(prev => {
      if (!prev) return null;
      return {
        ...prev,
        selected: !prev.selected,
        quantity: !prev.selected ? 1 : prev.quantity // Reset quantity to 1 if adding
      };
    });
  };

  const handleIncreaseQuantity = () => {
    if (!selectedAddon) return;
    
    updateAddOnQuantity(selectedAddon.categoryId, selectedAddon.id, selectedAddon.quantity + 1);
    
    // Update local state
    setSelectedAddon(prev => {
      if (!prev) return null;
      return {
        ...prev,
        quantity: prev.quantity + 1
      };
    });
  };

  const handleDecreaseQuantity = () => {
    if (!selectedAddon || selectedAddon.quantity <= 1) return;
    
    updateAddOnQuantity(selectedAddon.categoryId, selectedAddon.id, selectedAddon.quantity - 1);
    
    // Update local state
    setSelectedAddon(prev => {
      if (!prev) return null;
      return {
        ...prev,
        quantity: Math.max(1, prev.quantity - 1)
      };
    });
  };

  const incrementQuantity = (categoryId: string, itemId: string, currentQuantity: number) => {
    updateAddOnQuantity(categoryId, itemId, currentQuantity + 1);
  };

  const decrementQuantity = (categoryId: string, itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateAddOnQuantity(categoryId, itemId, currentQuantity - 1);
    }
  };

  return (
    <div className="space-y-8">
      {!isEditMode && (
        <>
          <h2 className="text-2xl font-bold mb-2">Customize Your Experience</h2>
          <p className="text-gray-600">Enhance your wellness retreat with our premium add-on services</p>
        </>
      )}

      <Tabs defaultValue={addOnCategories[0]?.id} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          {addOnCategories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex items-center"
            >
              {getCategoryIcon(category.id)}
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {addOnCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.items.map((item) => (
                <Card 
                  key={item.id} 
                  className={`overflow-hidden transition-shadow duration-300 ${
                    item.selected ? 'ring-2 ring-amber-500 shadow-lg' : 'hover:shadow-md'
                  }`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription className="mt-1">{item.description}</CardDescription>
                      </div>
                      <span className="text-lg font-bold text-amber-600 flex items-center whitespace-nowrap ml-4">
                        <Euro className="h-4 w-4 mr-1" />
                        {item.price}
                      </span>
                    </div>
                  </CardHeader>
                  <CardFooter className="bg-gray-50 flex justify-between items-center flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`addon-${item.id}`} 
                        checked={item.selected}
                        className={`${item.selected ? 'text-amber-500 border-amber-500' : ''}`}
                        onCheckedChange={() => toggleAddOn(category.id, item.id)}
                      />
                      <Label htmlFor={`addon-${item.id}`}>Add to package</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* New stylish "Learn More" button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openAddonDetail(category.id, item)}
                        className="inline-flex items-center gap-1.5 text-sm font-medium bg-white text-amber-700 border border-amber-300 hover:bg-amber-50 hover:border-amber-400 transition-all duration-200 rounded-full px-3 py-1.5 shadow-sm"
                      >
                        <Info className="h-4 w-4" />
                        Learn More
                      </motion.button>
                      
                      {item.selected && (
                        <motion.div 
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => decrementQuantity(category.id, item.id, item.quantity)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-amber-700 font-medium w-6 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => incrementQuantity(category.id, item.id, item.quantity)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-between pt-6">
        <Button 
          onClick={handleBack}
          variant="outline"
          size="lg"
        >
          {isEditMode ? "Cancel" : "Back"}
        </Button>
        <Button 
          onClick={handleContinue}
          className="bg-amber-500 hover:bg-amber-600"
          size="lg"
        >
          {isEditMode ? "Save Changes" : "Continue to Room Selection"}
        </Button>
      </div>

      {/* Enhanced Addon Detail Dialog */}
      <AddonDetailDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        addon={selectedAddon}
        onToggleAddon={handleToggleSelectedAddon}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
      />
    </div>
  );
};

export default AddOnSelection;
