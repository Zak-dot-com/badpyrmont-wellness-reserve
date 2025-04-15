
import { useCallback } from "react";
import { AddOnCategory } from "../types/bookingTypes";

export function useAddOns() {
  const toggleAddOn = useCallback((categories: AddOnCategory[], categoryId: string, itemId: string, getDefaultQuantity: () => number): AddOnCategory[] => {
    return categories.map(category => {
      if (category.id === categoryId) {
        const updatedItems = category.items.map(item => {
          if (item.id === itemId) {
            const isSelected = !item.selected;
            return { 
              ...item, 
              selected: isSelected,
              quantity: isSelected ? getDefaultQuantity() : item.quantity 
            };
          }
          return item;
        });
        return { ...category, items: updatedItems };
      }
      return category;
    });
  }, []);

  const removeAddOn = useCallback((categories: AddOnCategory[], categoryId: string, itemId: string): AddOnCategory[] => {
    return categories.map(category => {
      if (category.id === categoryId) {
        const updatedItems = category.items.map(item => {
          if (item.id === itemId) {
            return { ...item, selected: false };
          }
          return item;
        });
        return { ...category, items: updatedItems };
      }
      return category;
    });
  }, []);

  const updateAddOnQuantity = useCallback((categories: AddOnCategory[], categoryId: string, itemId: string, quantity: number): AddOnCategory[] => {
    return categories.map(category => {
      if (category.id === categoryId) {
        const updatedItems = category.items.map(item => {
          if (item.id === itemId) {
            return { ...item, quantity: Math.max(1, quantity) };
          }
          return item;
        });
        return { ...category, items: updatedItems };
      }
      return category;
    });
  }, []);

  const getSelectedAddOns = useCallback((categories: AddOnCategory[], roomAddOns: any[]): string[] => {
    const addOns: string[] = [];
    
    categories.forEach(category => {
      category.items.forEach(item => {
        if (item.selected) {
          addOns.push(item.id);
        }
      });
    });
    
    roomAddOns.forEach(addon => {
      if (addon.selected) {
        addOns.push(addon.id);
      }
    });
    
    return addOns;
  }, []);

  return {
    toggleAddOn,
    removeAddOn,
    updateAddOnQuantity,
    getSelectedAddOns
  };
}
