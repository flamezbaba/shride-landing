"use client";

import { getPlaces } from "@/lib/requests";
import { useUserStore } from "@/store/user";
import { createContext, useContext, useEffect, useState } from "react";

type LocationState = {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
  address: any;
  requestLocation: () => void;
};

const LocationContext = createContext<LocationState | null>(null);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const { setStoreAddress, address: storeAddress } = useUserStore();

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        getAddress(position.coords.latitude, position.coords.longitude);
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  };

  const getAddress = async (latitude: any, longitude: any) => {
    // console.log("getAddress", latitude);
    const addr = await getPlaces(latitude, longitude);

    if (!!addr) {
      setAddress(addr);
      if (!!storeAddress) {
        const newx = { ...addr, latitude, longitude };
        setStoreAddress(newx);
      }
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        latitude,
        longitude,
        error,
        loading,
        address,
        requestLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export const useLocationContext = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error("useLocation must be used inside LocationProvider");
  }
  return ctx;
};
