
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
import { Euro } from 'lucide-react';

const AddOnSelection = () => {
  const { bookingData, toggleAddOn, setCurrentStep } = useBooking();
  const { addOnCategories } = bookingData;

  const handleContinue = () => {
    setCurrentStep(3);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-2">Customize Your Experience</h2>
      <p className="text-gray-600">Enhance your wellness retreat with our premium add-on services</p>

      <Tabs defaultValue={addOnCategories[0]?.id} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          {addOnCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {addOnCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{item.name}</CardTitle>
                      <span className="text-lg font-bold text-hotel-primary flex items-center">
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
                        onCheckedChange={() => toggleAddOn(category.id, item.id)}
                      />
                      <Label htmlFor={`addon-${item.id}`}>Add to package</Label>
                    </div>
                    {item.selected && (
                      <span className="text-green-500 text-sm">Added</span>
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
          Back
        </Button>
        <Button 
          onClick={handleContinue}
          className="bg-hotel-primary hover:bg-hotel-primary/90"
          size="lg"
        >
          Continue to Room Selection
        </Button>
      </div>
    </div>
  );
};

export default AddOnSelection;
