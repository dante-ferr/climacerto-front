"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Location {
  lat: number;
  lng: number;
}

export interface WeatherAnalysis {
  score: number;
  qualitative: string;
  color: string;
  pros: string[];
  cons: string[];
  trendAlert: string;
}

interface LocationContextType {
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
  weatherAnalysis: WeatherAnalysis | null;
  setWeatherAnalysis: (analysis: WeatherAnalysis | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [weatherAnalysis, setWeatherAnalysis] =
    useState<WeatherAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <LocationContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        weatherAnalysis,
        setWeatherAnalysis,
        error,
        setError,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
