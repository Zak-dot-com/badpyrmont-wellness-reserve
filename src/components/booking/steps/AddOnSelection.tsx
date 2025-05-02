
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
import { Euro, Plus, Minus, Bath, Dumbbell as Activity, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';

type AddOnSelectionProps = {
  isEditMode?: boolean;
  onEditComplete?: () => void;
};

const AddOnSelection = ({ isEditMode = false, onEditComplete }: AddOnSelectionProps) => {
  const { bookingData, toggleAddOn, updateAddOnQuantity, setCurrentStep, getDefaultAddOnQuantity } = useBooking();
  const { addOnCategories, duration } = bookingData;

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
                      <CardTitle>{item.name}</CardTitle>
                      <span className="text-lg font-bold text-amber-600 flex items-center">
                        <Euro className="h-4 w-4 mr-1" />
                        {item.price}
                      </span>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="bg-gray-50 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`addon-${item.id}`} 
                        checked={item.selected}
                        className={`${item.selected ? 'text-amber-500 border-amber-500' : ''}`}
                        onCheckedChange={() => toggleAddOn(category.id, item.id)}
                      />
                      <Label htmlFor={`addon-${item.id}`}>Add to package</Label>
                    </div>
                    
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
    </div>
  );
};

export default AddOnSelection;
