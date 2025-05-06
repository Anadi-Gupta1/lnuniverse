import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  hospitalId: number;
}

interface Hospital {
  id: number;
  name: string;
  image: string;
  address: string;
  contact: string;
  website?: string;
  facilities: string[];
  description?: string;
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
    website: "https://www.aiimsbhopal.edu.in",
    description: "A premier government hospital with super-specialty departments including cardiology, neurology, oncology, advanced diagnostics, and research centers. It integrates AYUSH for holistic care.",
    facilities: ["Cardiology", "Neurology", "Oncology", "Advanced Diagnostics", "Research Centers"],
    coordinates: { lat: 23.2125, lng: 77.4572 }
  },
  {
    id: 2,
    name: "Bhopal Memorial Hospital and Research Centre (BMHRC)",
    image: "/img/Bhopal Memorial Hospital and Research Centre (BMHRC).jpeg",
    address: "Bhopal ByPass, Raisen Road, Karond, Bhopal 462038",
    contact: "+91-755-2742212",
    website: "http://bmhrc.ac.in/",
    description: "A 350-bed multi-specialty hospital specializing in respiratory diseases, eye care, and psychological support, established for Bhopal Gas Tragedy victims, with modern facilities and a research wing.",
    facilities: ["Respiratory Diseases", "Eye Care", "Psychological Support"],
    coordinates: { lat: 23.2800, lng: 77.3486 }
  },
  {
    id: 3,
    name: "Government Jai Prakash District Hospital",
    image: "/img/Government Jai Prakash District Hospital.jpeg",
    address: "1250, Link Road No. 2, Tulsi Nagar, Shivaji Nagar, Bhopal 462001",
    contact: "0755-2556812",
    website: "http://www.jphospital.org",
    description: "A government hospital offering 24/7 services with specialties like Gynecology, Pediatrics, and Nephrology, equipped with a blood bank and upgraded infrastructure.",
    facilities: ["Gynecology", "Pediatrics", "Nephrology", "Blood Bank"],
    coordinates: { lat: 23.2350, lng: 77.4010 }
  },
  {
    id: 4,
    name: "Bansal Hospital",
    image: "/img/bansal hospital.jpeg",
    address: "Near Shahpura Lake, Bhopal",
    contact: "+91-0755-4086000",
    website: "https://bansalhospital.com/",
    description: "A 300-bed private super-specialty hospital with advanced diagnostics like Gamma Camera for cancer detection, eye surgery, and multi-specialty treatments.",
    facilities: ["Advanced Diagnostics", "Eye Surgery", "Multi-specialty Treatments"],
    coordinates: { lat: 23.1815, lng: 77.4560 }
  },
  {
    id: 5,
    name: "ApolloSage Hospitals",
    image: "/img/Apollo Sage Hospital.jpeg",
    address: "Bawadiya Kalan, Salaiya, Bhopal 462026",
    contact: "093039 72510",
    website: "https://apollosage.in",
    description: "A 350+ bed multi-specialty hospital offering cardiology, organ transplants, neurology, radiology, and 24/7 emergency care.",
    facilities: ["Cardiology", "Organ Transplants", "Neurology", "Radiology"],
    coordinates: { lat: 23.1600, lng: 77.4670 }
  },
  {
    id: 6,
    name: "Hamidia Hospital",
    image: "/img/Hamidia hospital.png",
    address: "Near Fatehgarh, Bhopal 462001",
    contact: "0755-2540222",
    description: "A major government hospital linked to Gandhi Medical College, with a central pathology lab, blood bank, and emergency care.",
    facilities: ["Central Pathology Lab", "Blood Bank", "Emergency Care"],
    coordinates: { lat: 23.2600, lng: 77.3900 }
  },
  {
    id: 7,
    name: "People's Hospital",
    image: "/img/People's Hospital.jpeg",
    address: "Karond Bypass Road, Bhanpur, Bhopal 462037",
    contact: "0755-4005000",
    website: "http://www.peoplesuniversity.edu.in/",
    description: "Under People's University, offering multi-specialty services like cardiology and orthopedics, focusing on affordability.",
    facilities: ["Cardiology", "Orthopedics", "Multi-specialty Services"],
    coordinates: { lat: 23.3125, lng: 77.4086 }
  },
  {
    id: 8,
    name: "Chirayu Medical College & Hospital",
    image: "/img/Chirayu Medical College & Hospital.jpg",
    address: "Bhainsakhedi, Near Bairagarh, Bhopal-Indore Highway, Bhopal 462030",
    contact: "+91-755-6679000",
    description: "A private hospital with medical education, offering cardiology, neurology, and modern diagnostics.",
    facilities: ["Cardiology", "Neurology", "Modern Diagnostics", "Medical Education"],
    coordinates: { lat: 23.3150, lng: 77.3250 }
  },
  {
    id: 9,
    name: "Noble Multispeciality Hospital",
    image: "/img/Noble Multispeciality Hospital.jpeg",
    address: "Plot No. 269/1, Opp. Misrod Police Station, Misrod, Bhopal 462026",
    contact: "+91-755-4060000",
    description: "A private multi-specialty hospital with services in cardiology, orthopedics, and patient-centric care.",
    facilities: ["Cardiology", "Orthopedics", "Patient-centric Care"],
    coordinates: { lat: 23.1600, lng: 77.4800 }
  },
  {
    id: 10,
    name: "Jawaharlal Nehru Cancer Hospital and Research Center",
    image: "/img/Jawaharlal Nehru Cancer Hospital and Research Center.jpeg",
    address: "Idgah Hills, PB No-32, Bhopal 462001",
    contact: "+91-755-540374",
    description: "A leading cancer care center with chemotherapy, radiation, and surgical oncology.",
    facilities: ["Chemotherapy", "Radiation", "Surgical Oncology", "Cancer Research"],
    coordinates: { lat: 23.2650, lng: 77.3950 }
  }
];

const doctors: Doctor[] = [
  { id: 1, name: "Dr. Atul Kumar Agrawal", specialization: "Cardiology", hospitalId: 4 },
  { id: 2, name: "Dr. Vinita", specialization: "Eye Surgeon", hospitalId: 4 },
  { id: 3, name: "Dr. Shraddha Agrawal", specialization: "General Medicine", hospitalId: 4 },
  { id: 4, name: "Dr. Manish Gupta", specialization: "Orthopedics", hospitalId: 4 },
  { id: 5, name: "Dr. Priya Bhave", specialization: "Gynecology", hospitalId: 4 },
  { id: 6, name: "Dr. O.P. Saxena", specialization: "Oncology", hospitalId: 10 },
  { id: 7, name: "Dr. Ritu Singhal", specialization: "Oncology", hospitalId: 10 },
  { id: 8, name: "Dr. Ravi Saxena", specialization: "Cardiology", hospitalId: 8 },
  { id: 9, name: "Dr. Anand Sharma", specialization: "Neurology", hospitalId: 1 },
  { id: 10, name: "Dr. Meera Patel", specialization: "Pediatrics", hospitalId: 3 },
  { id: 11, name: "Dr. Rajiv Kumar", specialization: "Respiratory Medicine", hospitalId: 2 },
  { id: 12, name: "Dr. Sanjay Mishra", specialization: "Cardiology", hospitalId: 5 },
  { id: 13, name: "Dr. Neha Singh", specialization: "General Surgery", hospitalId: 6 },
  { id: 14, name: "Dr. Vikram Joshi", specialization: "Orthopedics", hospitalId: 7 },
  { id: 15, name: "Dr. Priyanka Verma", specialization: "Dermatology", hospitalId: 9 }
];

const HospitalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  const hospitalId = parseInt(id || "1");
  const hospital = hospitals.find(h => h.id === hospitalId);
  const hospitalDoctors = doctors.filter(d => d.hospitalId === hospitalId);

  if (!hospital) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Hospital Not Found</h1>
        <p className="mb-4">The hospital you are looking for does not exist.</p>
        <Button onClick={() => navigate('/hospitals')}>Back to Hospitals</Button>
      </div>
    );
  }

  const handleAppointmentSubmit = () => {
    if (!selectedDoctor) {
      toast({
        title: "Error",
        description: "Please select a doctor",
        variant: "destructive",
      });
      return;
    }

    // In a real application, this would be an API call to book the appointment
    // For now, we'll just simulate a successful booking
    setTimeout(() => {
      setAppointmentBooked(true);
      toast({
        title: "Appointment Booked",
        description: `Your appointment has been booked successfully with ${selectedDoctor} at ${hospital.name}. You will receive the doctor's phone number, appointment timing, and email confirmation shortly.`,
      });
    }, 1000);
  };

  const renderMap = () => {
    return (
      <div className="w-full h-[400px] rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCesPBARNYutMVUODlpz66FTHJ7f8DYRgY&q=${hospital.coordinates.lat},${hospital.coordinates.lng}&zoom=15`}
          allowFullScreen
        ></iframe>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-pure-black text-pure-white py-8 px-4">
      <div className="container mx-auto">
      <Button 
        variant="outline" 
        className="mb-4 border-healthcare-blue text-healthcare-blue hover:bg-healthcare-blue hover:text-white animate-fade-in-up"
        onClick={() => navigate('/hospitals')}
      >
        ← Back to Hospitals
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <img 
                src={hospital.image} 
                alt={hospital.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <CardTitle className="mt-4 text-2xl text-pure-white glow-text-blue">{hospital.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Address:</h3>
                  <p>{hospital.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Contact:</h3>
                  <p>{hospital.contact}</p>
                </div>
                {hospital.website && (
                  <div>
                    <h3 className="font-semibold">Website:</h3>
                    <a 
                      href={hospital.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-healthcare-blue hover:underline hover:text-blue-400 transition-colors"
                    >
                      {hospital.website}
                    </a>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">Description:</h3>
                  <p>{hospital.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Facilities:</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {hospital.facilities.map((facility, index) => (
                      <span 
                        key={index}
                        className="bg-healthcare-blue bg-opacity-20 text-healthcare-blue text-xs px-2 py-1 rounded animate-pulse"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6 bg-gray-900 border-gray-800 animate-fade-in-up" style={{animationDelay: '200ms'}}>
            <CardHeader>
              <CardTitle className="text-pure-white glow-text-green">Book an Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="hospital">Hospital</Label>
                  <Input id="hospital" value={hospital.name} disabled />
                </div>
                <div>
                  <Label htmlFor="doctor">Select Doctor</Label>
                  <Select onValueChange={setSelectedDoctor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {hospitalDoctors.length > 0 ? (
                        hospitalDoctors.map(doctor => (
                          <SelectItem key={doctor.id} value={doctor.name}>
                            {doctor.name} - {doctor.specialization}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="not-available" disabled>
                          No doctors available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  className="w-full bg-healthcare-green hover:bg-green-700 transition-colors duration-300 animate-glow-green" 
                  onClick={handleAppointmentSubmit}
                  disabled={appointmentBooked}
                >
                  {appointmentBooked ? "Appointment Booked" : "Book Appointment"}
                </Button>
                <p className="text-sm text-gray-400">
                  After booking, you will receive the doctor's phone number, appointment timing, and email confirmation.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-pure-white glow-text-blue">Location</CardTitle>
            </CardHeader>
            <CardContent>
              {renderMap()}
              <div className="mt-4">
                <p className="text-sm">
                  <span className="font-semibold">Coordinates:</span> {hospital.coordinates.lat}° N, {hospital.coordinates.lng}° E
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-6 bg-gray-900 border-gray-800 animate-fade-in-up" style={{animationDelay: '400ms'}}>
        <CardHeader>
          <CardTitle className="text-pure-white glow-text-blue">Doctors</CardTitle>
        </CardHeader>
        <CardContent>
          {hospitalDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hospitalDoctors.map(doctor => (
                <Card key={doctor.id} className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${doctor.id * 100 + 500}ms`}}>
                  <CardHeader>
                    <CardTitle className="text-lg text-pure-white">{doctor.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><span className="font-semibold">Specialization:</span> {doctor.specialization}</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="mt-4 w-full bg-healthcare-green hover:bg-green-700 transition-colors duration-300 animate-glow-green">Book Appointment</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Book an Appointment with {doctor.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <Label htmlFor="hospital-name">Hospital</Label>
                            <Input id="hospital-name" value={hospital.name} disabled />
                          </div>
                          <div>
                            <Label htmlFor="doctor-name">Doctor</Label>
                            <Input id="doctor-name" value={doctor.name} disabled />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button onClick={() => {
                            setSelectedDoctor(doctor.name);
                            handleAppointmentSubmit();
                          }}>
                            Confirm Booking
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p>No doctors information available for this hospital.</p>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default HospitalDetail;