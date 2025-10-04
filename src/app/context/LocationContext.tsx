"use client";

import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

// Define the shape of the location data
export interface Location {
  lat: number;
  lng: number;
}

// Define the shape of the context value
interface LocationContextType {
  selectedLocation: Location | null;
  setSelectedLocation: Dispatch<SetStateAction<Location | null>>;
}

// 1. Create the context with a default value.
// This will hold the location state and the function to update it.
const LocationContext = createContext<LocationContextType>({
  selectedLocation: null,
  setSelectedLocation: () => {},
});

// 2. Create a custom hook for easier access to the context.
export const useLocation = () => useContext(LocationContext);

// 3. Create the Provider component.
// This component will wrap your page and manage the state.
export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
