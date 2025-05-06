import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface Hospital {
  id: number;
  name: string;
  image: string;
  address: string;
  contact: string;
  facilities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

const hospitals: Hospital[] = [
  {
    id: 1,
    name: "All India Institute of Medical Sciences (AIIMS) Bhopal",
    image: "/img/All India Institute of Medical Sciences (AIIMS) Bhopal.jpeg",
    address: "Saket Nagar, Bhopal, Madhya Pradesh 462020",
    contact: "+91-0755-298260",
    facilities: ["Cardiology", "Neurology", "Oncology", "Advanced Diagnostics", "Research Centers"],
    coordinates: { lat: 23.2125, lng: 77.4572 }
  },
  {
    id: 2,
    name: "Bhopal Memorial Hospital and Research Centre (BMHRC)",
    image: "/img/Bhopal Memorial Hospital and Research Centre (BMHRC).jpeg",
    address: "Bhopal ByPass, Raisen Road, Karond, Bhopal 462038",
    contact: "+91-755-2742212",
    facilities: ["Respiratory Diseases", "Eye Care", "Psychological Support"],
    coordinates: { lat: 23.2800, lng: 77.3486 }
  },
  {
    id: 3,
    name: "Government Jai Prakash District Hospital",
    image: "/img/Government Jai Prakash District Hospital.jpeg",
    address: "1250, Link Road No. 2, Tulsi Nagar, Shivaji Nagar, Bhopal 462001",
    contact: "0755-2556812",
    facilities: ["Gynecology", "Pediatrics", "Nephrology", "Blood Bank"],
    coordinates: { lat: 23.2350, lng: 77.4010 }
  },
  {
    id: 4,
    name: "Bansal Hospital",
    image: "/img/bansal hospital.jpeg",
    address: "Near Shahpura Lake, Bhopal",
    contact: "+91-0755-4086000",
    facilities: ["Advanced Diagnostics", "Eye Surgery", "Multi-specialty Treatments"],
    coordinates: { lat: 23.1815, lng: 77.4560 }
  },
  {
    id: 5,
    name: "ApolloSage Hospitals",
    image: "/img/Apollo Sage Hospital.jpeg",
    address: "Bawadiya Kalan, Salaiya, Bhopal 462026",
    contact: "093039 72510",
    facilities: ["Cardiology", "Organ Transplants", "Neurology", "Radiology"],
    coordinates: { lat: 23.1600, lng: 77.4670 }
  },
  {
    id: 6,
    name: "Hamidia Hospital",
    image: "/img/Hamidia hospital.png",
    address: "Near Fatehgarh, Bhopal 462001",
    contact: "0755-2540222",
    facilities: ["Central Pathology Lab", "Blood Bank", "Emergency Care"],
    coordinates: { lat: 23.2600, lng: 77.3900 }
  },
  {
    id: 7,
    name: "People's Hospital",
    image: "/img/People's Hospital.jpeg",
    address: "Karond Bypass Road, Bhanpur, Bhopal 462037",
    contact: "0755-4005000",
    facilities: ["Cardiology", "Orthopedics", "Multi-specialty Services"],
    coordinates: { lat: 23.3125, lng: 77.4086 }
  },
  {
    id: 8,
    name: "Chirayu Medical College & Hospital",
    image: "/img/Chirayu Medical College & Hospital.jpg",
    address: "Bhainsakhedi, Near Bairagarh, Bhopal-Indore Highway, Bhopal 462030",
    contact: "+91-755-6679000",
    facilities: ["Cardiology", "Neurology", "Modern Diagnostics", "Medical Education"],
    coordinates: { lat: 23.3150, lng: 77.3250 }
  },
  {
    id: 9,
    name: "Noble Multispeciality Hospital",
    image: "/img/Noble Multispeciality Hospital.jpeg",
    address: "Plot No. 269/1, Opp. Misrod Police Station, Misrod, Bhopal 462026",
    contact: "+91-755-4060000",
    facilities: ["Cardiology", "Orthopedics", "Patient-centric Care"],
    coordinates: { lat: 23.1600, lng: 77.4800 }
  },
  {
    id: 10,
    name: "Jawaharlal Nehru Cancer Hospital and Research Center",
    image: "/img/Jawaharlal Nehru Cancer Hospital and Research Center.jpeg",
    address: "Idgah Hills, PB No-32, Bhopal 462001",
    contact: "+91-755-540374",
    facilities: ["Chemotherapy", "Radiation", "Surgical Oncology", "Cancer Research"],
    coordinates: { lat: 23.2650, lng: 77.3950 }
  }
];

const HospitalList: React.FC = () => {
  const navigate = useNavigate();

  const handleHospitalClick = (hospitalId: number) => {
    navigate(`/hospital/${hospitalId}`);
  };

  return (
    <div className="min-h-screen bg-pure-black text-pure-white py-8 pt-24 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center glow-text-blue animate-fade-in-up">Hospitals in Bhopal</h1>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[80vh] overflow-y-auto p-4">
        {hospitals.map((hospital) => (
          <Card key={hospital.id} className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-gray-900 border-gray-800 animate-fade-in-up" style={{animationDelay: `${hospital.id * 100}ms`}}>
            <CardHeader>
              <img 
                src={hospital.image} 
                alt={hospital.name}
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                  target.onerror = null;
                }}
              />
              <CardTitle className="mt-4 text-pure-white">{hospital.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-2">{hospital.address}</p>
              <p className="text-gray-400 mb-4">Contact: {hospital.contact}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {hospital.facilities.map((facility, index) => (
                  <span 
                    key={index}
                    className="bg-healthcare-blue bg-opacity-20 text-healthcare-blue text-xs px-2 py-1 rounded"
                  >
                    {facility}
                  </span>
                ))}
              </div>
              <Button 
                onClick={() => handleHospitalClick(hospital.id)}
                className="w-full bg-healthcare-blue hover:bg-blue-700 transition-colors duration-300 animate-glow"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HospitalList;