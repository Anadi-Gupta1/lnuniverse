import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

interface MedicalStore {
  id: number;
  name: string;
  location: string;
  services: string[];
  website?: string;
  phone?: string;
  notes?: string;
}

interface OnlinePharmacy {
  id: number;
  name: string;
  website: string;
  services: string[];
  notes?: string;
  logo?: string;
}

const localMedicalStores: MedicalStore[] = [
  {
    id: 1,
    name: "Shiv Medical Store",
    location: "Shop No. 7, 9, 11 No. Bus Stop, E-7, Arera Colony, Bhopal, Madhya Pradesh - 462016",
    services: [
      "Online ordering of prescription drugs, health kits, and supplements",
      "Home delivery of medicines and medical equipment",
      "Online payments",
      "Medical equipment and injections (with valid prescription)"
    ],
    notes: "Established in 1981, known for reliability and wide product range"
  },
  {
    id: 2,
    name: "Agrawal Medical Store",
    location: "Bhopal, Madhya Pradesh",
    services: [
      "Online ordering and home delivery of genuine medicines",
      "Health kits and supplements",
      "Online payment options",
      "Medical equipment and prescription injections"
    ],
    notes: "Serving customers since 1966, a trusted name in Bhopal for healthcare needs"
  },
  {
    id: 3,
    name: "Palak Medical Store",
    location: "Bhopal, Madhya Pradesh",
    services: [
      "Online ordering of medicines and health products",
      "Home delivery services",
      "Online payments",
      "Medical equipment and injections (prescription required)"
    ]
  },
  {
    id: 4,
    name: "Bhumika Medical Store",
    location: "Plot No. 284, Shop No. 2, Durgesh Vihar, J K Road, Bhopal, Madhya Pradesh - 462023",
    services: [
      "Online ordering of medical equipment",
      "Baby care products, health drinks, vitamins, and medicines",
      "Home delivery and easy replacement options",
      "Prescription injections and medical devices"
    ]
  },
  {
    id: 5,
    name: "Shankar Medical Store",
    location: "E 3/48, Shop No 6, Galaxy Apartment, 10 No Market, Arera Colony, Bhopal, Madhya Pradesh - 462016",
    services: [
      "Online ordering of prescription drugs, health kits, and supplements",
      "Home delivery services",
      "Online payments",
      "Medical equipment and injections"
    ],
    notes: "Known as a one-stop shop for healthcare products"
  }
];

const onlinePharmacies: OnlinePharmacy[] = [
  {
    id: 1,
    name: "Apollo Pharmacy",
    website: "https://www.apollopharmacy.in",
    logo: "/img/apollo pharmacy.jpg",
    services: [
      "Online ordering of medicines, health products, and medical equipment",
      "Fast home delivery, including super-fast options",
      "24-hour pharmacy services in some locations",
      "Prescription injections and medical devices"
    ],
    notes: "With over 5,600 stores across India, Apollo Pharmacy has a strong presence in Bhopal and is known for its reliability"
  },
  {
    id: 2,
    name: "emedicalwala",
    website: "https://www.emedicalwala.com",
    logo: "/img/emedicalwala.png",
    services: [
      "Online ordering of pharmaceutical and healthcare products",
      "Home delivery with a flat 5% discount on purchases",
      "Medical equipment and prescription injections",
      "User-friendly interface for all age groups"
    ]
  },
  {
    id: 3,
    name: "MedPlusMart",
    website: "https://www.medplusmart.com",
    logo: "/img/MedPlus.png",
    services: [
      "Online purchasing of prescription medicines and OTC products",
      "Household healthcare items",
      "Home delivery with cash-on-delivery options",
      "Medical equipment and injections (with valid prescription)"
    ],
    notes: "One of India's leading online pharmacy chains, accessible to Bhopal residents"
  },
  {
    id: 4,
    name: "PharmEasy",
    website: "https://pharmeasy.in",
    logo: "/img/PharmEasy.jpeg",
    services: [
      "Online medicine ordering with prescription upload",
      "Healthcare products and supplements",
      "Diagnostic tests booking",
      "Home delivery services"
    ]
  },
  {
    id: 5,
    name: "Netmeds",
    website: "https://www.netmeds.com",
    logo: "/img/netmeds.jpeg",
    services: [
      "Prescription and OTC medicines",
      "Health and wellness products",
      "Home delivery across Bhopal",
      "Subscription services for regular medications"
    ]
  }
];

const serviceCategories = [
  {
    title: "Online Medicine Ordering",
    description: "Order prescription medicines and OTC products through websites, apps, or direct store contact. Valid prescription required for controlled drugs like injections."
  },
  {
    title: "Home Delivery",
    description: "Get medicines, medical equipment, and injections delivered directly to your home. Delivery times vary, with some offering same-day or next-day options."
  },
  {
    title: "Medical Equipment",
    description: "Access to pulse oximeters, digital thermometers, nebulizers, wheelchairs, and oxygen cylinders. Some stores also offer rental services for equipment."
  },
  {
    title: "Injections",
    description: "Prescription injections provided by both local stores and online pharmacies, ensuring patients can access critical medications with a doctor's prescription."
  },
  {
    title: "24-Hour Services",
    description: "Select providers operate 24/7 in certain locations, ensuring round-the-clock access to medicines and healthcare products."
  },
  {
    title: "Online Payments and Discounts",
    description: "Make payments online via cards, UPI, or wallets, with some platforms offering discounts or cashback."
  }
];

const MedicalPharmacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-pure-black text-pure-white py-8 pt-24 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center glow-text-green animate-fade-in-up">Medical & Pharmacy Services in Bhopal</h1>
      <div className="container mx-auto">
      
      <Tabs defaultValue="local" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 bg-gray-900 text-gray-400">
          <TabsTrigger value="local">Local Medical Stores</TabsTrigger>
          <TabsTrigger value="online">Online Pharmacies</TabsTrigger>
          <TabsTrigger value="services">Available Services</TabsTrigger>
        </TabsList>
        
        <TabsContent value="local" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localMedicalStores.map((store) => (
              <Card key={store.id} className="h-full bg-gray-900 border-gray-800 animate-fade-in-up" style={{animationDelay: `${store.id * 100}ms`}}>
                <CardHeader>
                  <CardTitle className="text-pure-white glow-text-green">{store.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Location:</h3>
                    <p className="text-gray-400">{store.location}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Services:</h3>
                    <ul className="list-disc pl-5 text-gray-600">
                      {store.services.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  </div>
                  {store.notes && (
                    <div>
                      <h3 className="font-semibold text-healthcare-green">Notes:</h3>
                      <p className="text-gray-400">{store.notes}</p>
                    </div>
                  )}
                  {store.website && (
                    <Button 
                      variant="outline" 
                      className="w-full mt-2 border-healthcare-green text-healthcare-green hover:bg-healthcare-green hover:text-white transition-colors duration-300"
                      onClick={() => window.open(store.website, '_blank')}
                    >
                      Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="online" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {onlinePharmacies.map((pharmacy) => (
              <Card key={pharmacy.id} className="h-full bg-gray-900 border-gray-800 animate-fade-in-up" style={{animationDelay: `${pharmacy.id * 100}ms`}}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-pure-white glow-text-blue">{pharmacy.name}</CardTitle>
                    {pharmacy.logo && (
                      <img 
                        src={pharmacy.logo} 
                        alt={pharmacy.name} 
                        className="h-10 w-auto object-contain"
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Services:</h3>
                    <ul className="list-disc pl-5 text-gray-600">
                      {pharmacy.services.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  </div>
                  {pharmacy.notes && (
                    <div>
                      <h3 className="font-semibold text-healthcare-blue">Notes:</h3>
                      <p className="text-gray-400">{pharmacy.notes}</p>
                    </div>
                  )}
                  <Button 
                    className="w-full mt-2"
                    onClick={() => window.open(pharmacy.website, '_blank')}
                  >
                    Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="services" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category, index) => (
              <Card key={index} className="h-full bg-gray-900 border-gray-800 animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                <CardHeader>
                  <CardTitle className="text-pure-white glow-text-blue">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg mt-8 animate-fade-in-up" style={{animationDelay: '600ms'}}>
        <h2 className="text-xl font-bold mb-4 text-pure-white glow-text-green">Need Medical Supplies?</h2>
        <p className="mb-4">
          Most pharmacies and medical stores in Bhopal now offer online ordering and home delivery services. 
          You can order prescription medicines, medical equipment, and healthcare products from the comfort of your home.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-pure-white glow-text-blue">For Emergency Needs</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Several stores offer 24/7 services and emergency delivery. 
                Look for the 24-Hour Services tag or contact Apollo Pharmacy for urgent medical supplies.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-pure-white glow-text-blue">Prescription Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Remember that prescription medications, especially injections, require a valid doctor's prescription. 
                Most online platforms allow you to upload your prescription when placing an order.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MedicalPharmacy;