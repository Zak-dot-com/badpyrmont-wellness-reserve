
import { BookingData, AddOnCategory } from "../../types/bookingTypes";

export function useBookingAddOns() {
  const handleToggleAddOn = (
    setState: React.Dispatch<React.SetStateAction<BookingData>>,
    categoryId: string, 
    itemId: string,
    toggleAddOn: (categories: AddOnCategory[], categoryId: string, itemId: string, getDefaultQuantity: () => number) => AddOnCategory[],
    getDefaultAddOnQuantity: (duration: string) => number
  ) => {
    setState(prev => {
      const updatedCategories = toggleAddOn(
        prev.addOnCategories, 
        categoryId, 
        itemId, 
        () => getDefaultAddOnQuantity(prev.duration)
      );
      return { ...prev, addOnCategories: updatedCategories };
    });
  };

  const handleRemoveAddOn = (
    setState: React.Dispatch<React.SetStateAction<BookingData>>,
    categoryId: string, 
    itemId: string,
    removeAddOn: (categories: AddOnCategory[], categoryId: string, itemId: string) => AddOnCategory[]
  ) => {
    setState(prev => {
      const updatedCategories = removeAddOn(prev.addOnCategories, categoryId, itemId);
      return { ...prev, addOnCategories: updatedCategories };
    });
  };

  const handleUpdateAddOnQuantity = (
    setState: React.Dispatch<React.SetStateAction<BookingData>>,
    categoryId: string, 
    itemId: string, 
    quantity: number,
    updateAddOnQuantity: (categories: AddOnCategory[], categoryId: string, itemId: string, quantity: number) => AddOnCategory[]
  ) => {
    setState(prev => {
      const updatedCategories = updateAddOnQuantity(prev.addOnCategories, categoryId, itemId, quantity);
      return { ...prev, addOnCategories: updatedCategories };
    });
  };

  return {
    handleToggleAddOn,
    handleRemoveAddOn,
    handleUpdateAddOnQuantity
  };
}
