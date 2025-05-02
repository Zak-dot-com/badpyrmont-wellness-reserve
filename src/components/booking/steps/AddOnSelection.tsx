
import React, { useState } from 'react';
import { useBooking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, Check, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import LearnMoreDialog from '@/components/dialogs/LearnMoreDialog';
import CancellationPolicy from '../CancellationPolicy';

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

type AddOnSelectionProps = {
  isEditMode?: boolean;
  onEditComplete?: () => void;
};

const AddOnSelection = ({ isEditMode = false, onEditComplete }: AddOnSelectionProps) => {
  const {
    bookingData,
    toggleAddOn,
    removeAddOn,
    updateAddOnQuantity,
    getDefaultAddOnQuantity,
    setCurrentStep,
    calculateEndDate
  } = useBooking();

  const { addOnCategories, selectedPackage, duration } = bookingData;
  const [addonDetails, setAddonDetails] = useState<{
    category: string;
    item: {
      id: string;
      name: string;
      description: string;
      price: number;
      selected: boolean;
      quantity: number;
    };
    isOpen: boolean;
  } | null>(null);

  const handleToggleAddOn = (categoryId: string, itemId: string) => {
    toggleAddOn(categoryId, itemId);
  };

  const handleRemoveAddOn = (categoryId: string, itemId: string) => {
    removeAddOn(categoryId, itemId);
  };

  const handleUpdateQuantity = (categoryId: string, itemId: string, action: 'increase' | 'decrease') => {
    const category = addOnCategories.find(cat => cat.id === categoryId);
    if (!category) return;

    const item = category.items.find(item => item.id === itemId);
    if (!item) return;
    
    const currentQuantity = item.quantity;
    
    if (action === 'decrease' && currentQuantity > 1) {
      updateAddOnQuantity(categoryId, itemId, currentQuantity - 1);
    } else if (action === 'increase') {
      updateAddOnQuantity(categoryId, itemId, currentQuantity + 1);
    }
  };

  const handleContinue = () => {
    if (isEditMode && onEditComplete) {
      onEditComplete();
      toast.success("Add-ons updated successfully");
      return;
    }
    setCurrentStep(3);
  };

  const handleBack = () => {
    if (isEditMode && onEditComplete) {
      onEditComplete();
      return;
    }
    setCurrentStep(1);
  };

  const defaultQuantity = getDefaultAddOnQuantity();
  
  const handleViewDetails = (categoryId: string, item: any) => {
    setAddonDetails({
      category: categoryId,
      item,
      isOpen: true
    });
  };
  
  const addonImages = {
    "massage": [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800"
    ],
    "wellness": [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
      "https://images.unsplash.com/photo-1531685250784-7569952593d2?w=800"
    ],
    "fitness": [
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800"
    ],
    "nutrition": [
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800"
    ]
  };
  
  const getAddonDetails = (categoryId: string, item: any) => {
    // Calculate addon details for the dialog
    const categoryName = addOnCategories.find(cat => cat.id === categoryId)?.name || '';
    
    let durationHours = 0;
    switch (categoryId) {
      case 'massage':
        durationHours = 1;
        break;
      case 'wellness':
        durationHours = 1.5;
        break;
      case 'fitness':
        durationHours = 2;
        break;
      case 'nutrition':
        durationHours = 1;
        break;
      default:
        durationHours = 1;
    }
    
    const details = [
      { label: 'Category', value: categoryName },
      { label: 'Duration', value: `${durationHours} hour${durationHours > 1 ? 's' : ''}` },
      { label: 'Price', value: `€${item.price}` },
      { label: 'Per Session', value: `€${(item.price / item.quantity).toFixed(2)}` }
    ];
    
    const benefits = [];
    if (categoryId === 'massage') {
      benefits.push('Relieves muscle tension');
      benefits.push('Improves circulation');
      benefits.push('Reduces stress and anxiety');
    } else if (categoryId === 'wellness') {
      benefits.push('Enhances mental clarity');
      benefits.push('Promotes deep relaxation');
      benefits.push('Balances energy levels');
    } else if (categoryId === 'fitness') {
      benefits.push('Improves physical strength');
      benefits.push('Increases energy and vitality');
      benefits.push('Personalizes workout routines');
    } else if (categoryId === 'nutrition') {
      benefits.push('Customized diet planning');
      benefits.push('Improved digestion');
      benefits.push('Weight management');
    }
    
    const additionalContent = (
      <>
        <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wide">
          Key Benefits
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          {benefits.map((benefit, idx) => (
            <li key={idx}>{benefit}</li>
          ))}
        </ul>
        
        <div className="mt-4">
          <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wide">
            What to Expect
          </h3>
          <p className="text-gray-700 mt-2">
            {categoryId === 'massage' && 
              'Professional therapists will use specialized techniques to relieve tension and promote healing.'}
            {categoryId === 'wellness' && 
              'Expert practitioners guide you through holistic treatments focused on mind-body balance.'}
            {categoryId === 'fitness' && 
              'Personal trainers work with you to create and implement fitness routines tailored to your needs.'}
            {categoryId === 'nutrition' && 
              'Nutritional experts help plan balanced, nourishing meals for your wellness journey.'}
          </p>
        </div>
      </>
    );
    
    return {
      details,
      additionalContent,
      images: addonImages[categoryId as keyof typeof addonImages] || []
    };
  };

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {!isEditMode && (
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-2 uppercase tracking-wide text-zinc-950">Add Treatments & Services</h2>
          <p className="text-gray-600">
            Enhance your wellness experience with our premium treatments and services.
            {selectedPackage && ` The ${selectedPackage.name} package includes ${defaultQuantity} treatments per category.`}
          </p>
        </motion.div>
      )}

      {addOnCategories.map((category) => (
        <motion.div key={category.id} variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div key={item.id} className="flex flex-wrap items-center gap-4 py-3 border-b last:border-0">
                    <div className="flex items-center gap-3 flex-grow">
                      <input
                        type="checkbox"
                        id={`addon-${item.id}`}
                        checked={item.selected}
                        onChange={() => handleToggleAddOn(category.id, item.id)}
                        className="w-5 h-5 accent-amber-500"
                      />
                      <label htmlFor={`addon-${item.id}`} className="flex-grow cursor-pointer">
                        <span className="font-medium">{item.name}</span>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {item.description}
                        </div>
                        <span className="text-amber-600 font-bold">
                          €{item.price}
                        </span>
                      </label>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-auto">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs border-amber-500 text-amber-700 hover:bg-amber-50"
                        onClick={() => handleViewDetails(category.id, item)}
                      >
                        <Info className="mr-1 h-3 w-3" />
                        Learn More
                      </Button>
                      
                      {item.selected && (
                        <div className="flex items-center border rounded-md">
                          <Button
                            type="button"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handleUpdateQuantity(category.id, item.id, 'decrease')}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handleUpdateQuantity(category.id, item.id, 'increase')}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      
      {!isEditMode && <CancellationPolicy showFull={true} />}
      
      <motion.div variants={itemVariants} className="flex justify-between pt-6">
        <Button
          onClick={handleBack}
          variant="outline"
          size="lg"
        >
          {isEditMode ? "Cancel" : "Back"}
        </Button>
        <Button
          onClick={handleContinue}
          className="bg-amber-800 hover:bg-amber-900"
          size="lg"
        >
          {isEditMode ? "Save Changes" : "Continue to Room Selection"}
        </Button>
      </motion.div>
      
      {/* Add-on Details Dialog */}
      {addonDetails && (
        <LearnMoreDialog
          open={addonDetails.isOpen}
          onOpenChange={(isOpen) => setAddonDetails(prev => prev ? {...prev, isOpen} : null)}
          title={addonDetails.item.name}
          description={addonDetails.item.description}
          {...getAddonDetails(addonDetails.category, addonDetails.item)}
          type="addon"
        />
      )}
    </motion.div>
  );
};

export default AddOnSelection;
