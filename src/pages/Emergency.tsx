import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Phone, Navigation, AlertTriangle, MapPin } from "lucide-react";
import { emergencyService } from '../services/api';
import { useToast } from "@/components/ui/use-toast";

interface Location {
  lat: number;
  lng: number;
}

interface Ambulance {
  id: string;
  name: string;
  phone: string;
  distance: string;
  eta: string;
  location: Location;
}

const Emergency: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);
  const [selectedAmbulance, setSelectedAmbulance] = useState<Ambulance | null>(null);
  const { toast } = useToast();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  // Load Google Maps script
  useEffect(() => {
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCesPBARNYutMVUODlpz66FTHJ7f8DYRgY&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    loadGoogleMaps();

    return () => {
      // Clean up resources if needed
    };
  }, []);

  // Get current location
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const initializeMap = () => {
    if (location && !map) {
      const mapElement = document.getElementById('emergency-map');
      if (mapElement) {
        const newMap = new google.maps.Map(mapElement, {
          center: location,
          zoom: 15,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#263c3f" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6b9a76" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#1f2835" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#f3d19c" }],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#2f3948" }],
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#17263c" }],
            },
          ],
        });
        
        setMap(newMap);
        
        // Add user marker
        new google.maps.Marker({
          position: location,
          map: newMap,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#3b82f6",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#ffffff",
          },
          title: "Your Location",
        });
        
        // Reverse geocode to get address
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            setAddress(results[0].formatted_address);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (location && !map) {
      initializeMap();
    }
  }, [location, map]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);
          setLoading(false);
        },
        (error) => {
          setError("Error getting your location: " + error.message);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  };

  const findNearbyAmbulances = async () => {
    if (!location) {
      setError("Unable to determine your location");
      return;
    }

    setLoading(true);
    try {
      // In a real application, this would call your backend API
      // const response = await emergencyService.getNearby(location.lat, location.lng, 10);
      // setAmbulances(response.data);
      
      // For demo purposes, we'll create mock ambulance data
      const mockAmbulances: Ambulance[] = [
        {
          id: "amb-1",
          name: "City Medical Ambulance",
          phone: "+91-9876543210",
          distance: "2.3 km",
          eta: "5 minutes",
          location: {
            lat: location.lat + 0.01,
            lng: location.lng + 0.01
          }
        },
        {
          id: "amb-2",
          name: "Rapid Response Unit",
          phone: "+91-9876543211",
          distance: "3.5 km",
          eta: "7 minutes",
          location: {
            lat: location.lat - 0.01,
            lng: location.lng - 0.008
          }
        },
        {
          id: "amb-3",
          name: "Emergency Medical Services",
          phone: "+91-9876543212",
          distance: "4.8 km",
          eta: "10 minutes",
          location: {
            lat: location.lat + 0.008,
            lng: location.lng - 0.012
          }
        }
      ];
      
      setAmbulances(mockAmbulances);
      
      // Add ambulance markers to map
      if (map) {
        mockAmbulances.forEach(ambulance => {
          new google.maps.Marker({
            position: ambulance.location,
            map: map,
            icon: {
              url: '/img/ambulance-icon.png',
              scaledSize: new google.maps.Size(32, 32)
            },
            title: ambulance.name
          });
          
          // Draw route from ambulance to user
          const directionsService = new google.maps.DirectionsService();
          const directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: '#FF0000',
              strokeWeight: 4
            }
          });
          
          directionsService.route(
            {
              origin: ambulance.location,
              destination: location,
              travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
              }
            }
          );
        });
      }
      
    } catch (err) {
      setError("Failed to find nearby ambulances");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const requestAmbulance = async (ambulance: Ambulance) => {
    setLoading(true);
    try {
      // In a real application, call your backend API
      // await emergencyService.requestAmbulance({
      //   ambulanceId: ambulance.id,
      //   location: location,
      //   userAddress: address
      // });
      
      // For demo purposes
      setSelectedAmbulance(ambulance);
      setRequestSent(true);
      
      toast({
        title: "Emergency Request Sent",
        description: `${ambulance.name} has been notified and is on their way to your location.`,
        variant: "default",
      });
      
    } catch (err) {
      setError("Failed to request ambulance");
      console.error(err);
      
      toast({
        title: "Request Failed",
        description: "Unable to send emergency request. Please try again or call emergency services directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pure-black text-pure-white py-8 pt-24">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-pure-white">
            <AlertTriangle className="inline-block mr-2 text-red-500" />
            Emergency Assistance
          </h1>
          <p className="text-gray-400 mt-2">
            Get immediate medical help from the nearest ambulance service
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Your Location</CardTitle>
                <CardDescription>
                  {loading ? (
                    <div className="flex items-center text-gray-400">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Detecting your location...
                    </div>
                  ) : address ? (
                    <div className="flex items-center text-gray-400">
                      <MapPin className="mr-2 h-4 w-4" />
                      {address}
                    </div>
                  ) : (
                    <div className="text-gray-400">Location will be displayed here</div>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  id="emergency-map" 
                  className="w-full h-[400px] rounded-md overflow-hidden"
                  style={{ background: '#242f3e' }}
                >
                  {loading && (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <Loader2 className="h-8 w-8 animate-spin text-red-500" />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  onClick={getCurrentLocation}
                  disabled={loading}
                  variant="outline"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Navigation className="mr-2 h-4 w-4" />
                      Update Location
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={findNearbyAmbulances}
                  disabled={loading || !location}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Find Nearby Ambulances"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Emergency Request Section */}
          <div>
            <Card className="bg-gray-900 border-gray-800 mb-6">
              <CardHeader className="bg-red-900 text-white">
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Emergency Request
                </CardTitle>
                <CardDescription className="text-red-100">
                  Send an immediate request for ambulance assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {requestSent && selectedAmbulance ? (
                  <div className="space-y-4">
                    <div className="bg-gray-800 p-4 rounded-md">
                      <p className="text-green-400 font-semibold mb-2">Ambulance Dispatched</p>
                      <p className="text-sm text-gray-300">{selectedAmbulance.name} is on the way</p>
                      <p className="text-sm text-gray-300">ETA: {selectedAmbulance.eta}</p>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button 
                        className="w-full"
                        onClick={() => window.location.href = `tel:${selectedAmbulance.phone}`}
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Call Ambulance: {selectedAmbulance.phone}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-400">
                      Press the emergency button below to immediately alert nearby ambulance services to your location.
                    </p>
                    
                    <Button
                      onClick={() => {
                        if (ambulances.length > 0) {
                          requestAmbulance(ambulances[0]);
                        } else {
                          findNearbyAmbulances().then(() => {
                            if (ambulances.length > 0) {
                              requestAmbulance(ambulances[0]);
                            }
                          });
                        }
                      }}
                      disabled={loading || !location}
                      className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg font-semibold"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Requesting Help...
                        </>
                      ) : (
                        'REQUEST AMBULANCE NOW'
                      )}
                    </Button>
                    
                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Available Ambulances */}
            {ambulances.length > 0 && !requestSent && (
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Available Ambulances</CardTitle>
                  <CardDescription>
                    Select an ambulance service to request
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ambulances.map((ambulance) => (
                      <div 
                        key={ambulance.id} 
                        className="bg-gray-800 p-4 rounded-md hover:bg-gray-700 cursor-pointer transition-colors"
                        onClick={() => requestAmbulance(ambulance)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-white">{ambulance.name}</p>
                            <p className="text-sm text-gray-400">Distance: {ambulance.distance}</p>
                            <p className="text-sm text-gray-400">ETA: {ambulance.eta}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Request
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        {/* Emergency Information */}
        <div className="mt-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Emergency Information</CardTitle>
              <CardDescription>
                Important contacts and information for medical emergencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-md">
                  <h3 className="font-semibold text-white mb-2">National Emergency Number</h3>
                  <p className="text-xl font-bold text-red-500 mb-2">112</p>
                  <p className="text-sm text-gray-400">India's unified emergency response number</p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-md">
                  <h3 className="font-semibold text-white mb-2">Ambulance Helpline</h3>
                  <p className="text-xl font-bold text-red-500 mb-2">108</p>
                  <p className="text-sm text-gray-400">For medical emergencies across India</p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-md">
                  <h3 className="font-semibold text-white mb-2">Medical Helpline</h3>
                  <p className="text-xl font-bold text-red-500 mb-2">102</p>
                  <p className="text-sm text-gray-400">Pregnancy and child-related emergencies</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-400">
                In case of a medical emergency, it's always recommended to both use this application and call the emergency services directly to ensure the fastest response.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Emergency;