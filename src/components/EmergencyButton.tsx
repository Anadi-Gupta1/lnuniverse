import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface Location {
  lat: number;
  lng: number;
}

const EmergencyButton: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ambulanceInfo, setAmbulanceInfo] = useState<{
    distance: string;
    eta: string;
    phone: string;
  } | null>(null);

  useEffect(() => {
    // Initialize Google Maps
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCesPBARNYutMVUODlpz66FTHJ7f8DYRgY&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  };

  const findNearestAmbulance = async (location: Location) => {
    // In a real application, this would be an API call to your backend
    // which would then query the ambulance service's API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          distance: "2.5 km",
          eta: "5 minutes",
          phone: "+91-XXXXXXXXXX"
        });
      }, 2000);
    });
  };

  const handleEmergency = async () => {
    try {
      setLoading(true);
      setError(null);
      setAmbulanceInfo(null);

      // Get current location
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);

      // Find nearest ambulance
      const ambulance = await findNearestAmbulance(currentLocation);
      setAmbulanceInfo(ambulance as any);

      // In a real application, you would:
      // 1. Send the location to your backend
      // 2. Backend would notify the nearest ambulance service
      // 3. Ambulance service would dispatch the ambulance
      // 4. Real-time tracking would be implemented

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Card className="w-80">
        <CardContent className="p-4">
          <Button
            onClick={handleEmergency}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Finding Ambulance...
              </>
            ) : (
              'EMERGENCY'
            )}
          </Button>

          {error && (
            <p className="mt-2 text-red-600 text-sm">{error}</p>
          )}

          {ambulanceInfo && (
            <div className="mt-4 space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Nearest Ambulance:</span> {ambulanceInfo.distance} away
              </p>
              <p className="text-sm">
                <span className="font-semibold">ETA:</span> {ambulanceInfo.eta}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Contact:</span> {ambulanceInfo.phone}
              </p>
            </div>
          )}

          {location && (
            <div className="mt-4">
              <p className="text-xs text-gray-500">
                Your location: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyButton; 