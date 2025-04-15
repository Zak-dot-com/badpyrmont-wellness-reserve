
import { useCallback, useMemo } from "react";
import { PackageType, RoomType } from "../types/bookingTypes";
import { availablePackages } from "../data/packagesData";

export function usePackages(selectedPackage: PackageType | null) {
  const getAvailablePackages = useMemo(() => availablePackages, []);
  
  const selectPackage = useCallback((packageId: string, getStandardRoom: () => RoomType | null, currentRoom: RoomType | null) => {
    const selected = availablePackages.find(p => p.id === packageId) || null;
    
    if (selected && selected.includesStandardRoom) {
      const standardRoom = getStandardRoom();
      
      return {
        selectedPackage: selected,
        selectedRoom: currentRoom?.isStandard ? standardRoom : currentRoom
      };
    }
    
    return {
      selectedPackage: selected,
      selectedRoom: currentRoom
    };
  }, []);

  return {
    availablePackages: getAvailablePackages,
    selectPackage
  };
}
